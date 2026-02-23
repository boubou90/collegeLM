import { useState, useEffect } from 'react';

const BREVET_QUESTIONS = [
  {
    q: "Dans une serre automatisée, le capteur de température est dans la chaîne :",
    a: ["D'énergie — fonction Convertir", "D'information — fonction Acquérir", "D'énergie — fonction Alimenter", "D'information — fonction Agir"],
    c: 1,
    explanation: "Un capteur de température acquiert une information sur l'environnement. Il appartient donc à la chaîne d'information, à la fonction 'Acquérir' (capter les données du milieu).",
  },
  {
    q: "Quelle est la fonction principale d'un logigramme (organigramme) en programmation ?",
    a: ["Représenter le schéma électrique d'un circuit", "Décrire graphiquement l'enchaînement des instructions d'un programme", "Modéliser l'aspect 3D d'une pièce", "Calculer la résistance d'un conducteur"],
    c: 1,
    explanation: "Un logigramme représente graphiquement, sous forme de blocs, l'enchaînement logique des instructions d'un algorithme ou d'un programme. Il est utilisé pour concevoir et communiquer un programme avant de le coder.",
  },
  {
    q: "Dans le système de freinage ABS, quel est le rôle du calculateur électronique ?",
    a: ["Alimenter les freins en énergie hydraulique", "Traiter les informations des capteurs et commander les actionneurs", "Convertir l'énergie mécanique en énergie électrique", "Stocker l'énergie de freinage"],
    c: 1,
    explanation: "Le calculateur (ou unité de contrôle) est dans la chaîne d'information : il traite les données des capteurs de vitesse de roue et envoie des ordres aux actionneurs (électrovannes) pour moduler la pression de freinage.",
  },
  {
    q: "Dans l'analyse fonctionnelle, la « Bête à Cornes » permet de :",
    a: ["Lister les matériaux nécessaires à la fabrication", "Identifier les fonctions de service d'un produit", "Calculer le coût de production d'un objet", "Représenter les pièces d'un assemblage"],
    c: 1,
    explanation: "La bête à cornes est un outil d'analyse du besoin. Elle identifie le bénéficiaire (à qui rend-il service ?), le produit (sur quoi agit-il ?) et la finalité (dans quel but ?) pour exprimer les fonctions de service.",
  },
  {
    q: "L'adresse IP 192.168.1.1 avec un masque 255.255.255.0 désigne :",
    a: ["Un équipement sur Internet accessible depuis le monde entier", "Un équipement sur un réseau local privé", "Un serveur DNS public", "Une adresse IPv6"],
    c: 1,
    explanation: "Les adresses commençant par 192.168.x.x sont des adresses privées (RFC 1918), utilisées uniquement dans les réseaux locaux (LAN). Elles ne sont pas routables sur Internet sans traduction d'adresse (NAT).",
  },
];

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

export default function BrevetQuiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [bestScore, setBestScore] = useState<number | null>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('brevet-quiz-best');
    if (saved !== null) setBestScore(parseInt(saved));
  }, []);

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (BREVET_QUESTIONS[current].c === idx) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (current + 1 >= BREVET_QUESTIONS.length) {
      setFinished(true);
      setTimeout(() => {
        setScore(s => {
          const newBest = Math.max(bestScore ?? 0, s);
          setBestScore(newBest);
          localStorage.setItem('brevet-quiz-best', newBest.toString());
          return s;
        });
      }, 0);
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
    }
  };

  const handleReset = () => {
    setCurrent(0); setSelected(null);
    setScore(0); setFinished(false); setStarted(true);
  };

  const accentColor = '#F97316';

  const container: React.CSSProperties = {
    background: 'white', borderRadius: '1rem',
    padding: '2rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
    maxWidth: '700px', margin: '2rem auto',
  };

  if (!started) {
    return (
      <section style={container}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📝</div>
          <h2 style={{ color: '#1e3a8a', fontSize: '1.4rem', marginBottom: '0.4rem' }}>
            Quiz type Brevet
          </h2>
          <p style={{ color: '#64748b', marginBottom: '0.4rem', fontSize: '0.9rem' }}>
            Chaînes d'énergie · Logigrammes · Analyse fonctionnelle · Réseaux
          </p>
          {bestScore !== null && (
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1rem' }}>
              🏆 Meilleur score : <strong>{bestScore}/{BREVET_QUESTIONS.length}</strong>
            </p>
          )}
          <button
            onClick={() => setStarted(true)}
            style={{
              padding: '0.75rem 2rem', background: `linear-gradient(135deg, ${accentColor} 0%, #ef4444 100%)`,
              color: 'white', border: 'none', borderRadius: '2rem',
              fontSize: '1rem', fontWeight: 700, cursor: 'pointer',
              boxShadow: `0 4px 14px ${accentColor}55`,
            }}
          >
            Commencer →
          </button>
        </div>
      </section>
    );
  }

  if (finished) {
    const msg = score >= 5 ? 'Parfait ! Tu es prêt(e) pour le Brevet 🌟' :
                score >= 3 ? 'Bien joué ! Revois les notions manquantes 📚' :
                'Courage ! Relis tes cours et réessaie 💪';
    return (
      <section style={container}>
        <div style={{ textAlign: 'center' }}>
          <Stars score={score} total={BREVET_QUESTIONS.length} />
          <h2 style={{ color: '#1e3a8a', fontSize: '1.8rem', margin: '0.75rem 0 0.25rem' }}>
            {score} / {BREVET_QUESTIONS.length}
          </h2>
          <p style={{ color: '#4b5563', marginBottom: '0.5rem', lineHeight: 1.6 }}>{msg}</p>
          {bestScore !== null && bestScore >= score && bestScore > 0 && (
            <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '1rem' }}>
              🏆 Meilleur score : {bestScore}/{BREVET_QUESTIONS.length}
            </p>
          )}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1.5rem' }}>
            <button onClick={handleReset} style={{
              padding: '0.65rem 1.5rem',
              background: `linear-gradient(135deg, ${accentColor} 0%, #ef4444 100%)`,
              color: 'white', border: 'none', borderRadius: '2rem',
              fontSize: '0.95rem', fontWeight: 700, cursor: 'pointer',
            }}>
              🔄 Recommencer
            </button>
            <a href="/3eme/revisions" style={{
              padding: '0.65rem 1.5rem', background: '#f1f5f9',
              color: '#1e293b', borderRadius: '2rem', textDecoration: 'none',
              fontSize: '0.95rem', fontWeight: 600, border: '2px solid #e2e8f0',
            }}>
              📚 Fiches de révision
            </a>
          </div>
        </div>
      </section>
    );
  }

  const q = BREVET_QUESTIONS[current];
  const progress = (current / BREVET_QUESTIONS.length) * 100;
  const isCorrect = selected !== null && selected === q.c;

  return (
    <section style={container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <span style={{
          background: accentColor, color: 'white', fontSize: '0.72rem',
          fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '999px',
        }}>3ème — Type Brevet</span>
        <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
          {current + 1} / {BREVET_QUESTIONS.length}
        </span>
      </div>

      <div style={{ background: '#e2e8f0', borderRadius: '999px', height: '6px', marginBottom: '1.5rem', overflow: 'hidden' }}>
        <div style={{
          width: `${progress}%`, height: '100%',
          background: `linear-gradient(90deg, ${accentColor}, #ef4444)`,
          borderRadius: '999px', transition: 'width 0.4s ease',
        }} />
      </div>

      <p style={{ color: '#1e293b', fontSize: '1.05rem', fontWeight: 600, lineHeight: 1.5, marginBottom: '1.5rem' }}>
        {q.q}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {q.a.map((answer, idx) => {
          let bg = 'white', color = '#1e293b', border = '2px solid #e2e8f0';
          let cursor: React.CSSProperties['cursor'] = 'pointer';
          if (selected !== null) {
            cursor = 'default';
            if (idx === q.c) { bg = '#10b981'; color = 'white'; border = '2px solid #059669'; }
            else if (idx === selected) { bg = '#ef4444'; color = 'white'; border = '2px solid #dc2626'; }
            else { bg = '#f8fafc'; color = '#94a3b8'; border = '2px solid #e2e8f0'; }
          }
          return (
            <button key={idx} onClick={() => handleAnswer(idx)}
              style={{ background: bg, color, border, borderRadius: '0.75rem', padding: '0.9rem 1.2rem', textAlign: 'left', fontSize: '0.92rem', fontWeight: 500, cursor, transition: 'all 0.2s ease' }}
              onMouseEnter={e => { if (selected === null) (e.currentTarget as HTMLButtonElement).style.borderColor = accentColor; }}
              onMouseLeave={e => { if (selected === null) (e.currentTarget as HTMLButtonElement).style.borderColor = '#e2e8f0'; }}
            >
              <span style={{ display: 'inline-block', width: '1.5rem', height: '1.5rem', borderRadius: '50%', background: selected !== null ? 'rgba(255,255,255,0.2)' : '#f1f5f9', color: selected !== null && (idx === q.c || idx === selected) ? 'inherit' : '#64748b', textAlign: 'center', lineHeight: '1.5rem', fontSize: '0.8rem', fontWeight: 700, marginRight: '0.75rem' }}>
                {String.fromCharCode(65 + idx)}
              </span>
              {answer}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <div style={{ marginTop: '1rem', padding: '0.85rem 1rem', background: isCorrect ? '#f0fdf4' : '#fef2f2', border: `1px solid ${isCorrect ? '#bbf7d0' : '#fecaca'}`, borderRadius: '0.625rem', fontSize: '0.88rem', color: isCorrect ? '#166534' : '#991b1b', lineHeight: 1.5 }}>
          <strong>{isCorrect ? '✅ Bonne réponse !' : '❌ Pas tout à fait…'}</strong>
          {' '}{q.explanation}
        </div>
      )}

      {selected !== null && (
        <div style={{ marginTop: '1rem', textAlign: 'right' }}>
          <button onClick={handleNext} style={{ padding: '0.65rem 1.5rem', background: `linear-gradient(135deg, ${accentColor} 0%, #ef4444 100%)`, color: 'white', border: 'none', borderRadius: '2rem', fontSize: '0.95rem', fontWeight: 700, cursor: 'pointer' }}>
            {current + 1 >= BREVET_QUESTIONS.length ? 'Voir mon score →' : 'Suivant →'}
          </button>
        </div>
      )}
    </section>
  );
}
