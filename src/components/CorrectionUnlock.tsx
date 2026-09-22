import { useState } from 'react';

interface CorrectionUnlockProps {
  activityId: string;
}

type UnlockState = 'idle' | 'loading' | 'success' | 'error';

export default function CorrectionUnlock({ activityId }: CorrectionUnlockProps) {
  const [code, setCode] = useState('');
  const [state, setState] = useState<UnlockState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setState('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/.netlify/functions/unlock-correction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ activityId, code }),
      });

      const data = await response.json();

      if (response.ok && data.success && data.url) {
        setPdfUrl(data.url);
        setState('success');
      } else {
        setErrorMessage(data.error || 'Une erreur est survenue.');
        setState('error');
      }
    } catch {
      setErrorMessage('Une erreur est survenue.');
      setState('error');
    }
  };

  return (
    <div className="correction-unlock">
      {state === 'success' ? (
        <>
          <h3 className="correction-unlock-title">✅ Corrigé disponible</h3>
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="correction-unlock-link"
          >
            👁️ Voir le corrigé
          </a>
        </>
      ) : (
        <>
          <h3 className="correction-unlock-title">🔒 Corrigé de l'activité</h3>
          <p className="correction-unlock-text">
            Le corrigé est disponible avec le code donné par votre enseignant.
          </p>
          <form onSubmit={handleSubmit} className="correction-unlock-form">
            <label htmlFor="correction-code" className="correction-unlock-label">
              Code d'accès
            </label>
            <input
              id="correction-code"
              type="text"
              className="correction-unlock-input"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              disabled={state === 'loading'}
              autoComplete="off"
            />
            <button
              type="submit"
              className="correction-unlock-button"
              disabled={state === 'loading' || !code.trim()}
            >
              {state === 'loading' ? 'Vérification...' : 'Déverrouiller le corrigé'}
            </button>
          </form>
          {state === 'error' && (
            <p className="correction-unlock-error">{errorMessage}</p>
          )}
        </>
      )}

      <style>{`
        .correction-unlock {
          margin-top: 2rem;
          padding: 1.5rem;
          background: var(--card-bg, #ffffff);
          border: 1px solid var(--border-color, #e2e8f0);
          border-radius: 1rem;
        }

        .correction-unlock-title {
          margin: 0 0 0.5rem;
          font-size: 1.1rem;
          color: var(--primary-dark, #1e3a8a);
        }

        .correction-unlock-text {
          margin: 0 0 1rem;
          font-size: 0.9rem;
          color: var(--text, #1e293b);
          line-height: 1.5;
        }

        .correction-unlock-form {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          align-items: flex-end;
        }

        .correction-unlock-label {
          display: block;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text, #1e293b);
          margin-bottom: 0.35rem;
        }

        .correction-unlock-input {
          padding: 0.6rem 0.85rem;
          border: 1px solid var(--border-color, #e2e8f0);
          border-radius: 0.5rem;
          font-size: 0.9rem;
          background: var(--card-bg, #ffffff);
          color: var(--text, #1e293b);
          min-width: 180px;
        }

        .correction-unlock-button {
          padding: 0.6rem 1.1rem;
          background: var(--primary, #2563eb);
          color: white;
          border: none;
          border-radius: 0.5rem;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: background 0.2s;
        }

        .correction-unlock-button:hover:not(:disabled) {
          background: var(--primary-dark, #1e3a8a);
        }

        .correction-unlock-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .correction-unlock-error {
          margin: 0.75rem 0 0;
          font-size: 0.85rem;
          color: #dc2626;
        }

        .correction-unlock-link {
          display: inline-block;
          padding: 0.6rem 1.1rem;
          background: var(--primary, #2563eb);
          color: white;
          text-decoration: none;
          border-radius: 0.5rem;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .correction-unlock-link:hover {
          background: var(--primary-dark, #1e3a8a);
        }

        @media (max-width: 480px) {
          .correction-unlock-form {
            flex-direction: column;
            align-items: stretch;
          }
        }
      `}</style>
    </div>
  );
}
