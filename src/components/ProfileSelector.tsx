import { useState, useEffect } from 'react';

type ProfileId = 'eleve' | 'parent' | 'enseignant';

const PROFILES = [
  {
    id: 'eleve' as ProfileId,
    emoji: '🎒',
    label: 'Élève',
    greeting: 'Bienvenue, élève ! Retrouve ici tous tes cours.',
    desc: 'Cours, séquences et révisions',
    color: '#3B82F6',
    colorLight: '#EFF6FF',
  },
  {
    id: 'parent' as ProfileId,
    emoji: '👨‍👩‍👧',
    label: 'Parent',
    greeting: 'Bienvenue ! Suivez les cours de votre enfant.',
    desc: 'Programme et ressources',
    color: '#10B981',
    colorLight: '#ECFDF5',
  },
  {
    id: 'enseignant' as ProfileId,
    emoji: '📚',
    label: 'Enseignant',
    greeting: 'Bienvenue ! Retrouvez toutes les ressources pédagogiques.',
    desc: 'Séquences et supports complets',
    color: '#7C3AED',
    colorLight: '#F5F3FF',
  },
];

export default function ProfileSelector() {
  const [profile, setProfile] = useState<ProfileId | null>(null);
  const [picking, setPicking] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('user-profile') as ProfileId | null;
    if (saved && PROFILES.find(p => p.id === saved)) {
      setProfile(saved);
    } else {
      setPicking(true);
    }
  }, []);

  // Avoid hydration mismatch
  if (!mounted) return null;

  const select = (id: ProfileId) => {
    setProfile(id);
    setPicking(false);
    localStorage.setItem('user-profile', id);
  };

  const current = PROFILES.find(p => p.id === profile);

  // Compact banner when profile is already selected
  if (profile && !picking && current) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        background: current.colorLight,
        border: `2px solid ${current.color}20`,
        borderLeft: `4px solid ${current.color}`,
        borderRadius: '0.75rem',
        padding: '0.75rem 1.25rem',
        marginBottom: '1.5rem',
        flexWrap: 'wrap',
      }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#1e293b', fontWeight: 500 }}>
          <span style={{ fontSize: '1.3rem' }}>{current.emoji}</span>
          <span>{current.greeting}</span>
        </span>
        <button
          onClick={() => setPicking(true)}
          style={{
            background: 'none', border: 'none',
            color: current.color, fontSize: '0.8rem',
            fontWeight: 600, cursor: 'pointer',
            padding: '0.2rem 0.6rem',
            borderRadius: '999px',
            border: `1px solid ${current.color}40`,
            whiteSpace: 'nowrap',
          }}
        >
          Changer ↩
        </button>
      </div>
    );
  }

  // Profile picker
  return (
    <div style={{
      background: 'white',
      borderRadius: '1rem',
      padding: '1.5rem',
      marginBottom: '1.5rem',
      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
    }}>
      <p style={{
        textAlign: 'center',
        color: '#475569',
        fontWeight: 600,
        fontSize: '1rem',
        marginBottom: '1.25rem',
      }}>
        👋 Qui êtes-vous ?
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '0.75rem',
      }}>
        {PROFILES.map(p => (
          <button
            key={p.id}
            onClick={() => select(p.id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '1.25rem 0.75rem',
              background: p.colorLight,
              border: `2px solid ${p.color}30`,
              borderRadius: '0.75rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = p.color;
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 4px 14px ${p.color}30`;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = `${p.color}30`;
              (e.currentTarget as HTMLButtonElement).style.transform = 'none';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
            }}
          >
            <span style={{ fontSize: '2rem' }}>{p.emoji}</span>
            <span style={{ color: p.color, fontWeight: 700, fontSize: '0.95rem' }}>{p.label}</span>
            <span style={{ color: '#64748b', fontSize: '0.72rem', textAlign: 'center', lineHeight: 1.3 }}>
              {p.desc}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
