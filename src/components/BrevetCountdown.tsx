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

  if (days === null || days <= 0) return null;

  return (
    <div style={{
      background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
      color: 'white',
      padding: '0.9rem 1.5rem',
      textAlign: 'center',
      fontSize: '1.05rem',
      borderRadius: '0.75rem',
      marginBottom: '1.5rem',
      fontWeight: '500',
      boxShadow: '0 4px 14px rgba(249,115,22,0.35)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
    }}>
      <span style={{ fontSize: '1.3rem' }}>⏳</span>
      <span>
        Brevet dans{' '}
        <strong style={{ fontSize: '1.3rem', fontWeight: '800' }}>{days}</strong>
        {' '}jours — Commence à réviser !
      </span>
      <a
        href="/3eme/brevet"
        style={{
          marginLeft: '0.75rem',
          background: 'rgba(255,255,255,0.2)',
          color: 'white',
          padding: '0.3rem 0.9rem',
          borderRadius: '999px',
          textDecoration: 'none',
          fontSize: '0.9rem',
          fontWeight: '600',
          whiteSpace: 'nowrap',
        }}
      >
        Réviser →
      </a>
    </div>
  );
}
