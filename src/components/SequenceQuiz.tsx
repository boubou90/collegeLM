import { useState, useEffect } from 'react';
import type { Q } from '../data/quizData';

interface Props {
  questions: Q[];
  sequenceTitle: string;
  level: string;
  sequenceNumber: number;
}

function Stars({ score, total }: { score: number; total: number }) {
  const pct = score / total;
  const filled = pct >= 0.8 ? 3 : pct >= 0.5 ? 2 : pct >= 0.2 ? 1 : 0;
  return (
    <div style={{ fontSize: '2rem', letterSpacing: '0.2rem' }}>
      {Array.from({ length: 3 }, (_, i) => (
        <span key={i} style={{ opacity: i < filled ? 1 : 0.2 }}>⭐</span>
      ))}
    </div>
  );
}

const LEVEL_COLORS: Record<string, string> = {
  '5eme': '#3B82F6',
  '4eme': '#10B981',
  '3eme': '#F97316',
};

const LEVEL_LABELS: Record<string, string> = {
  '5eme': '5ème',
  '4eme': '4ème',
  '3eme': '3ème',
};

export default function SequenceQuiz({ questions, sequenceTitle, level, sequenceNumber }: Props) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [bestScore, setBestScore] = useState<number | null>(null);
  const [started, setStarted] = useState(false);
  const [mounted, setMounted] = useState(false);

  const storageKey = `quiz-${level}-seq${sequenceNumber}`;
  const accentColor = LEVEL_COLORS[level] ?? '#6366f1';

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(storageKey);
    if (saved !== null) setBestScore(parseInt(saved));
  }, [storageKey]);

  if (!mounted) return null;

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (questions[current].c === idx) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setFinished(true);
      setTimeout(() => {
        setScore(s => {
          const newBest = Math.max(bestScore ?? 0, s);
          setBestScore(newBest);
          localStorage.setItem(storageKey, newBest.toString());
          return s;
        });
      }, 0);
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
    }
  };

  const handleReset = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setStarted(true);
  };

  const container: React.CSSProperties = {
    background: 'white',
    borderRadius: '1rem',
    padding: '2rem',
    marginTop: '2rem',
    marginBottom: '2rem',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
    maxWidth: '700px',
    margin: '2rem auto',
  };

  // Intro screen
  if (!started) {
    return (
      <section style={container}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🎯</div>
          <span style={{
            background: accentColor,
            color: 'white',
            fontSize: '0.75rem',
            fontWeight: 700,
            padding: '0.25rem 0.75rem',
            borderRadius: '999px',
            display: 'inline-block',
            marginBottom: '0.75rem',
          }}>
            {LEVEL_LABELS[level]} — Séquence {sequenceNumber}
          </span>
          <h2 style={{ color: '#1e3a8a', fontSize: '1.4rem', margin: '0.5rem 0' }}>
            Teste tes connaissances !
          </h2>
          <p style={{ color: '#475569', fontSize: '0.95rem', marginBottom: '0.5rem', fontWeight: 600 }}>
            {sequenceTitle}
          </p>
          <p style={{ color: '#64748b', marginBottom: '1.5rem', lineHeight: 1.6, fontSize: '0.9rem' }}>
            {questions.length} questions pour vérifier ce que tu as retenu sur cette séquence.
          </p>
          {bestScore !== null && (
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1rem' }}>
              🏆 Meilleur score : <strong>{bestScore}/{questions.length}</strong>
            </p>
          )}
          <button
            onClick={() => setStarted(true)}
            style={{
              padding: '0.75rem 2rem',
              background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}cc 100%)`,
              color: 'white',
              border: 'none',
              borderRadius: '2rem',
              fontSize: '1rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: `0 4px 14px ${accentColor}44`,
            }}
          >
            Commencer le quiz →
          </button>
        </div>
      </section>
    );
  }

  // Finished screen
  if (finished) {
    const msg = score >= Math.round(questions.length * 0.8) ? 'Excellent ! Tu maîtrises bien cette séquence 🎉' :
                score >= Math.round(questions.length * 0.6) ? 'Bien joué ! Continue comme ça 👍' :
                score >= Math.round(questions.length * 0.4) ? 'Pas mal, encore un peu de révisions 📖' :
                'Courage ! Retourne voir tes cours 💪';
    return (
      <section style={container}>
        <div style={{ textAlign: 'center' }}>
          <Stars score={score} total={questions.length} />
          <h2 style={{ color: '#1e3a8a', fontSize: '1.8rem', margin: '0.75rem 0 0.25rem' }}>
            {score} / {questions.length}
          </h2>
          <p style={{ color: '#4b5563', marginBottom: '0.5rem', lineHeight: 1.6 }}>{msg}</p>
          {bestScore !== null && bestScore >= score && bestScore > 0 && (
            <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '1rem' }}>
              🏆 Meilleur score : {bestScore}/{questions.length}
            </p>
          )}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1.5rem' }}>
            <button
              onClick={handleReset}
              style={{
                padding: '0.65rem 1.5rem',
                background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}cc 100%)`,
                color: 'white', border: 'none', borderRadius: '2rem',
                fontSize: '0.95rem', fontWeight: 700, cursor: 'pointer',
              }}
            >
              🔄 Recommencer
            </button>
            <a
              href={`/${level}/sequence-${sequenceNumber}`}
              style={{
                padding: '0.65rem 1.5rem',
                background: '#f1f5f9',
                color: '#1e293b', borderRadius: '2rem',
                fontSize: '0.95rem', fontWeight: 600, textDecoration: 'none',
                border: '2px solid #e2e8f0',
              }}
            >
              ← Retour à la séquence
            </a>
          </div>
        </div>
      </section>
    );
  }

  const q = questions[current];
  const progress = (current / questions.length) * 100;

  return (
    <section style={container}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <span style={{
          background: accentColor,
          color: 'white', fontSize: '0.72rem', fontWeight: 700,
          padding: '0.2rem 0.6rem', borderRadius: '999px',
        }}>
          {LEVEL_LABELS[level]} — Séq. {sequenceNumber}
        </span>
        <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
          {current + 1} / {questions.length}
        </span>
      </div>

      {/* Progress bar */}
      <div style={{ background: '#e2e8f0', borderRadius: '999px', height: '6px', marginBottom: '1.5rem', overflow: 'hidden' }}>
        <div style={{
          width: `${progress}%`,
          height: '100%',
          background: `linear-gradient(90deg, ${accentColor}, ${accentColor}99)`,
          borderRadius: '999px',
          transition: 'width 0.4s ease',
        }} />
      </div>

      {/* Question */}
      <p style={{ color: '#1e293b', fontSize: '1.1rem', fontWeight: 600, lineHeight: 1.5, marginBottom: '1.5rem' }}>
        {q.q}
      </p>

      {/* Answers */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {q.a.map((answer, idx) => {
          let bg = 'white';
          let color = '#1e293b';
          let border = '2px solid #e2e8f0';
          let cursor: React.CSSProperties['cursor'] = 'pointer';

          if (selected !== null) {
            cursor = 'default';
            if (idx === q.c) {
              bg = '#10b981'; color = 'white'; border = '2px solid #059669';
            } else if (idx === selected && selected !== q.c) {
              bg = '#ef4444'; color = 'white'; border = '2px solid #dc2626';
            } else {
              bg = '#f8fafc'; color = '#94a3b8'; border = '2px solid #e2e8f0';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              style={{
                background: bg, color, border, borderRadius: '0.75rem',
                padding: '0.9rem 1.2rem', textAlign: 'left',
                fontSize: '0.95rem', fontWeight: 500,
                cursor, transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { if (selected === null) (e.currentTarget as HTMLButtonElement).style.borderColor = accentColor; }}
              onMouseLeave={e => { if (selected === null) (e.currentTarget as HTMLButtonElement).style.borderColor = '#e2e8f0'; }}
            >
              <span style={{
                display: 'inline-block', width: '1.5rem', height: '1.5rem',
                borderRadius: '50%', background: selected !== null ? 'rgba(255,255,255,0.2)' : '#f1f5f9',
                color: selected !== null && (idx === q.c || idx === selected) ? 'inherit' : '#64748b',
                textAlign: 'center', lineHeight: '1.5rem', fontSize: '0.8rem',
                fontWeight: 700, marginRight: '0.75rem',
              }}>
                {String.fromCharCode(65 + idx)}
              </span>
              {answer}
            </button>
          );
        })}
      </div>

      {/* Next button */}
      {selected !== null && (
        <div style={{ marginTop: '1.25rem', textAlign: 'right' }}>
          <button
            onClick={handleNext}
            style={{
              padding: '0.65rem 1.5rem',
              background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}cc 100%)`,
              color: 'white', border: 'none', borderRadius: '2rem',
              fontSize: '0.95rem', fontWeight: 700, cursor: 'pointer',
            }}
          >
            {current + 1 >= questions.length ? 'Voir mon score →' : 'Suivant →'}
          </button>
        </div>
      )}
    </section>
  );
}
