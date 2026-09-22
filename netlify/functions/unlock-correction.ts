import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

interface NetlifyEvent {
  httpMethod: string;
  body: string | null;
}

interface UnlockRequestBody {
  activityId?: unknown;
  code?: unknown;
}

const GENERIC_ACCESS_ERROR = 'Accès au corrigé impossible.';
const SIGNED_URL_EXPIRY_SECONDS = 5 * 60;
const BUCKET_NAME = 'corrections';

function diagnoseServiceRoleKey(key: string | undefined) {
  const present = !!key;
  console.log(`[CORRECTION-DIAG] SUPABASE_SERVICE_ROLE_KEY présente : ${present}`);
  if (!present || !key) return;

  const segments = key.split('.');
  const isJwt = segments.length === 3;
  console.log(`[CORRECTION-DIAG] Format JWT détecté : ${isJwt}`);
  console.log(`[CORRECTION-DIAG] Longueur de la clé : ${key.length}`);

  if (isJwt) {
    try {
      const payloadJson = Buffer.from(segments[1], 'base64url').toString('utf8');
      const payload = JSON.parse(payloadJson);
      const role = typeof payload.role === 'string' ? payload.role : 'inconnu';
      const iss = typeof payload.iss === 'string' ? payload.iss : 'inconnu';
      console.log(`[CORRECTION-DIAG] Claim role : ${role}`);
      console.log(`[CORRECTION-DIAG] Claim iss : ${iss}`);
    } catch {
      console.log('[CORRECTION-DIAG] Échec du décodage du payload JWT.');
    }
  } else {
    let prefixType = 'inconnu';
    if (key.startsWith('sb_publishable_')) prefixType = 'sb_publishable_';
    else if (key.startsWith('sb_secret_')) prefixType = 'sb_secret_';
    console.log(`[CORRECTION-DIAG] Préfixe de type : ${prefixType}`);
  }
}

function diagnoseProjectConsistency(url: string | undefined, key: string | undefined) {
  let hostname: string | null = null;
  if (url) {
    try {
      hostname = new URL(url).hostname;
      console.log(`[CORRECTION-DIAG] SUPABASE_URL hostname : ${hostname}`);
    } catch {
      console.log('[CORRECTION-DIAG] SUPABASE_URL présente mais invalide (hostname illisible).');
    }
  } else {
    console.log('[CORRECTION-DIAG] SUPABASE_URL absente.');
  }

  let ref: string | null = null;
  if (key) {
    const segments = key.split('.');
    if (segments.length === 3) {
      try {
        const payload = JSON.parse(Buffer.from(segments[1], 'base64url').toString('utf8'));
        ref = typeof payload.ref === 'string' ? payload.ref : null;
        const aud = typeof payload.aud === 'string' ? payload.aud : null;
        console.log(`[CORRECTION-DIAG] Claim ref : ${ref ?? 'absent'}`);
        console.log(`[CORRECTION-DIAG] Claim aud : ${aud ?? 'absent'}`);
      } catch {
        console.log('[CORRECTION-DIAG] Échec du décodage du payload JWT pour ref/aud.');
      }
    }
  }

  let coherence: string;
  if (hostname && ref) {
    coherence = hostname.startsWith(`${ref}.supabase.co`) ? 'true' : 'false';
  } else {
    coherence = 'inconnue';
  }
  console.log(`[CORRECTION-DIAG] Cohérence projet : ${coherence}`);
}

function jsonResponse(statusCode: number, body: Record<string, unknown>) {
  console.log(`[CORRECTION-DIAG] Réponse HTTP renvoyée : ${statusCode}`);
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
}

export async function handler(event: NetlifyEvent) {
  console.log(`[CORRECTION-DIAG] Entrée dans la Function — méthode HTTP : ${event.httpMethod}`);

  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { success: false, error: 'Méthode non autorisée.' });
  }

  let parsedBody: UnlockRequestBody;
  try {
    parsedBody = event.body ? JSON.parse(event.body) : {};
  } catch {
    return jsonResponse(400, { success: false, error: 'Requête invalide.' });
  }

  const { activityId, code } = parsedBody;

  if (typeof activityId !== 'string' || activityId.trim().length === 0) {
    return jsonResponse(400, { success: false, error: 'Requête invalide.' });
  }
  if (typeof code !== 'string' || code.trim().length === 0) {
    return jsonResponse(400, { success: false, error: 'Requête invalide.' });
  }

  console.log(`[CORRECTION-DIAG] activityId reçu : ${activityId}`);

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  diagnoseServiceRoleKey(supabaseServiceRoleKey);
  diagnoseProjectConsistency(supabaseUrl, supabaseServiceRoleKey);

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return jsonResponse(500, { success: false, error: 'Erreur interne.' });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

    const { data: correction, error: queryError } = await supabase
      .from('corrections')
      .select('access_code_hash, pdf_path')
      .eq('activity_id', activityId)
      .eq('active', true)
      .maybeSingle();

    console.log(`[CORRECTION-DIAG] Requête Supabase — queryError présent : ${!!queryError} | correction trouvée : ${!!correction}`);

    if (queryError) {
      return jsonResponse(500, { success: false, error: 'Erreur interne.' });
    }

    if (!correction) {
      return jsonResponse(401, { success: false, error: GENERIC_ACCESS_ERROR });
    }

    console.log(`[CORRECTION-DIAG] Hash présent, longueur : ${correction.access_code_hash?.length ?? 0}`);

    const codeMatches = await bcrypt.compare(code, correction.access_code_hash);

    console.log(`[CORRECTION-DIAG] Résultat bcrypt.compare : ${codeMatches}`);

    if (!codeMatches) {
      return jsonResponse(401, { success: false, error: GENERIC_ACCESS_ERROR });
    }

    const { data: signedUrlData, error: signedUrlError } = await supabase
      .storage
      .from(BUCKET_NAME)
      .createSignedUrl(correction.pdf_path, SIGNED_URL_EXPIRY_SECONDS);

    console.log(`[CORRECTION-DIAG] createSignedUrl — succès : ${!signedUrlError && !!signedUrlData}`);

    if (signedUrlError || !signedUrlData) {
      return jsonResponse(500, { success: false, error: 'Erreur interne.' });
    }

    return jsonResponse(200, { success: true, url: signedUrlData.signedUrl });
  } catch {
    return jsonResponse(500, { success: false, error: 'Erreur interne.' });
  }
}
