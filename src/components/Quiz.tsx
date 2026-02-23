import { useState, useEffect } from 'react';

const QUESTIONS = [
  {
    q: "Quel est le rôle d'un routeur dans un réseau informatique ?",
    a: ["Afficher des images", "Relier des réseaux et diriger les données", "Stocker des fichiers", "Imprimer des documents"],
    c: 1,
    level: '5ème',
    explanation: "Un routeur lit l'adresse IP des paquets de données et les envoie vers le bon réseau destinataire. C'est lui qui relie le réseau du collège à Internet.",
  },
  {
    q: "Qu'est-ce qu'un diagramme « Bête à Cornes » en technologie ?",
    a: ["Un schéma électrique", "Un plan architectural en 3D", "Un outil d'analyse fonctionnelle du besoin", "Un diagramme de circuits"],
    c: 2,
    level: '3ème',
    explanation: "La bête à cornes répond à 3 questions : À qui rend-il service ? Sur quoi agit-il ? Dans quel but ? C'est un outil d'analyse du besoin.",
  },
  {
    q: "Que signifie l'acronyme CAO ?",
    a: ["Calcul Automatique d'Objets", "Conception Assistée par Ordinateur", "Commande d'Accès Ouvert", "Création d'Applications Originales"],
    c: 1,
    level: '5ème',
    explanation: "La CAO (Conception Assistée par Ordinateur) désigne les logiciels de modélisation 3D comme SketchUp ou SolidWorks, utilisés pour concevoir des objets techniques.",
  },
  {
    q: "Dans une chaîne d'énergie, quelle est la fonction qui fournit l'énergie au système ?",
    a: ["Transmettre", "Stocker", "Convertir", "Alimenter"],
    c: 3,
    level: '3ème',
    explanation: "La chaîne d'énergie suit l'ordre : Alimenter → Distribuer → Convertir → Transmettre. La fonction 'Alimenter' est la source d'énergie du système (pile, secteur, panneau solaire…).",
  },
  {
    q: "Quel langage de programmation est principalement enseigné en 4ème ?",
    a: ["JavaScript", "Java", "Python", "C++"],
    c: 2,
    level: '4ème',
    explanation: "Python est utilisé en 4ème car il est lisible et simple à apprendre. Il est idéal pour contrôler des systèmes automatiques et est très utilisé dans la domotique et la robotique.",
  },
];

const BADGE_COLORS: Record<string, string> = {
  '5ème': '#3B82F6',
  '4ème': '#10B981',
  '3ème': '#F97316',
};

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

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [bestScore, setBestScore] = useState<number | null>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('quiz-best-score');
    if (saved !== null) setBestScore(parseInt(saved));
  }, []);

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (QUESTIONS[current].c === idx) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (current + 1 >= QUESTIONS.length) {
      setFinished(true);
      setTimeout(() => {
        setScore(s => {
          const newBest = Math.max(bestScore ?? 0, s);
          setBestScore(newBest);
          localStorage.setItem('quiz-best-score', newBest.toString());
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

  if (!started) {
    return (
      <section style={container}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🧠</div>
          <h2 style={{ color: '#1e3a8a', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
            Teste tes connaissances !
          </h2>
          <p style={{ color: '#4b5563', marginBottom: '1.5rem', lineHeight: 1.6 }}>
            5 questions pour vérifier ce que tu as retenu en cours de technologie.
          </p>
          {bestScore !== null && (
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1rem' }}>
              🏆 Meilleur score : <strong>{bestScore}/{QUESTIONS.length}</strong>
            </p>
          )}
          <button
            onClick={() => setStarted(true)}
            style={{
              padding: '0.75rem 2rem',
              background: 'linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)',
              color: 'white', border: 'none', borderRadius: '2rem',
              fontSize: '1rem', fontWeight: 700, cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(99,102,241,0.4)',
            }}
          >
            Commencer le quiz →
          </button>
        </div>
      </section>
    );
  }

  if (finished) {
    const msg = score >= 5 ? 'Parfait ! Tu maîtrises le programme 🌟' :
                score >= 3 ? 'Très bien ! Relis les parties manquées 📚' :
                'Courage ! Reprends le cours et réessaie 💪';
    return (
      <section style={container}>
        <div style={{ textAlign: 'center' }}>
          <Stars score={score} total={QUESTIONS.length} />
          <h2 style={{ color: '#1e3a8a', fontSize: '1.8rem', margin: '0.75rem 0 0.25rem' }}>
            {score} / {QUESTIONS.length}
          </h2>
          <p style={{ color: '#4b5563', marginBottom: '0.5rem', lineHeight: 1.6 }}>{msg}</p>
          {bestScore !== null && bestScore >= score && bestScore > 0 && (
            <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '1rem' }}>
              🏆 Meilleur score : {bestScore}/{QUESTIONS.length}
            </p>
          )}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1.5rem' }}>
            <button
              onClick={handleReset}
              style={{
                padding: '0.65rem 1.5rem',
                background: 'linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)',
                color: 'white', border: 'none', borderRadius: '2rem',
                fontSize: '0.95rem', fontWeight: 700, cursor: 'pointer',
              }}
            >
              🔄 Recommencer
            </button>
            <a
              href="/3eme/revisions"
              style={{
                padding: '0.65rem 1.5rem', background: '#f1f5f9',
                color: '#1e3a8a', borderRadius: '2rem',
                fontSize: '0.95rem', fontWeight: 600, textDecoration: 'none',
                border: '2px solid #e2e8f0',
              }}
            >
              📚 Fiches de révision
            </a>
          </div>
        </div>
      </section>
    );
  }

  const q = QUESTIONS[current];
  const progress = (current / QUESTIONS.length) * 100;
  const isCorrect = selected !== null && selected === q.c;

  return (
    <section style={container}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <span style={{
          background: BADGE_COLORS[q.level] ?? '#6366f1',
          color: 'white', fontSize: '0.72rem', fontWeight: 700,
          padding: '0.2rem 0.6rem', borderRadius: '999px',
        }}>{q.level}</span>
        <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
          {current + 1} / {QUESTIONS.length}
        </span>
      </div>

      {/* Progress bar */}
      <div style={{ background: '#e2e8f0', borderRadius: '999px', height: '6px', marginBottom: '1.5rem', overflow: 'hidden' }}>
        <div style={{
          width: `${progress}%`, height: '100%',
          background: 'linear-gradient(90deg, #1e40af, #7c3aed)',
          borderRadius: '999px', transition: 'width 0.4s ease',
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
              onMouseEnter={e => { if (selected === null) (e.currentTarget as HTMLButtonElement).style.borderColor = '#6366f1'; }}
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

      {/* Explanation */}
      {selected !== null && q.explanation && (
        <div style={{
          marginTop: '1rem', padding: '0.85rem 1rem',
          background: isCorrect ? '#f0fdf4' : '#fef2f2',
          border: `1px solid ${isCorrect ? '#bbf7d0' : '#fecaca'}`,
          borderRadius: '0.625rem', fontSize: '0.88rem',
          color: isCorrect ? '#166534' : '#991b1b', lineHeight: 1.5,
        }}>
          <strong>{isCorrect ? '✅ Bonne réponse !' : '❌ Pas tout à fait…'}</strong>
          {' '}{q.explanation}
        </div>
      )}

      {/* Next button */}
      {selected !== null && (
        <div style={{ marginTop: '1rem', textAlign: 'right' }}>
          <button
            onClick={handleNext}
            style={{
              padding: '0.65rem 1.5rem',
              background: 'linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)',
              color: 'white', border: 'none', borderRadius: '2rem',
              fontSize: '0.95rem', fontWeight: 700, cursor: 'pointer',
            }}
          >
            {current + 1 >= QUESTIONS.length ? 'Voir mon score →' : 'Suivant →'}
          </button>
        </div>
      )}
    </section>
  );
}
