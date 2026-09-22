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

function jsonResponse(statusCode: number, body: Record<string, unknown>) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
}

export async function handler(event: NetlifyEvent) {
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

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

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

    if (queryError) {
      return jsonResponse(500, { success: false, error: 'Erreur interne.' });
    }

    if (!correction) {
      return jsonResponse(401, { success: false, error: GENERIC_ACCESS_ERROR });
    }

    const codeMatches = await bcrypt.compare(code, correction.access_code_hash);

    if (!codeMatches) {
      return jsonResponse(401, { success: false, error: GENERIC_ACCESS_ERROR });
    }

    const { data: signedUrlData, error: signedUrlError } = await supabase
      .storage
      .from(BUCKET_NAME)
      .createSignedUrl(correction.pdf_path, SIGNED_URL_EXPIRY_SECONDS);

    if (signedUrlError || !signedUrlData) {
      return jsonResponse(500, { success: false, error: 'Erreur interne.' });
    }

    return jsonResponse(200, { success: true, url: signedUrlData.signedUrl });
  } catch {
    return jsonResponse(500, { success: false, error: 'Erreur interne.' });
  }
}
