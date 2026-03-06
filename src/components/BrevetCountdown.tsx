import { useState, useEffect } from 'react';

const BREVET_DATE = new Date('2026-06-26T08:00:00');

export default function BrevetCountdown() {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    const calculate = () => {
      const now = new Date();
      const diff = BREVET_DATE.getTime() - now.getTime();
      setDays(Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24))));
    };
    calculate();
    const timer = setInterval(calculate, 60000);
    return () => clearInterval(timer);
  }, []);

  if (days === null) return null;

  return (
    <div style={{
      background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
      color: 'white',
      padding: '1rem 1.5rem',
      textAlign: 'center',
      borderRadius: '0.75rem',
      marginBottom: '2rem',
      boxShadow: '0 4px 14px rgba(249,115,22,0.35)',
    }}>
      <p style={{ fontSize: '1.2rem', fontWeight: '800', margin: 0 }}>
        ⏳ Brevet dans{' '}
        <span style={{ fontSize: '1.8rem' }}>
          {days > 0 ? days : "0 — C'est aujourd'hui !"}
        </span>
        {days > 0 ? ' jours' : ''}
      </p>
      <p style={{ fontSize: '0.85rem', marginTop: '0.35rem', opacity: 0.9 }}>
        Commence à réviser maintenant — chaque jour compte !
      </p>
      <a
        href="/3eme/brevet/"
        style={{
          display: 'inline-block',
          marginTop: '0.75rem',
          background: 'white',
          color: '#ea580c',
          padding: '0.4rem 1rem',
          borderRadius: '0.5rem',
          textDecoration: 'none',
          fontSize: '0.9rem',
          fontWeight: '700',
        }}
      >
        📚 Accéder aux sujets corrigés →
      </a>
    </div>
  );
}
