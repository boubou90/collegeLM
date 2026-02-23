import React, { useState } from 'react';
import { calculateFinalGrade, getMention } from '../../utils/brevetCalculations';

interface Grade {
  french: number;
  maths: number;
  history: number;
  sciences: number;
  oral: number;
}

export default function BrevetCalculator() {
  const [grades, setGrades] = useState<Grade>({
    french: 0,
    maths: 0,
    history: 0,
    sciences: 0,
    oral: 0
  });

  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (subject: keyof Grade, value: string) => {
    const numValue = Math.min(100, Math.max(0, Number(value) || 0));
    setGrades(prev => ({
      ...prev,
      [subject]: numValue
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };

  const finalGrade = calculateFinalGrade(grades);
  const mention = getMention(finalGrade);

  return (
    <div className="brevet-calculator">
      <form onSubmit={handleSubmit} className="grade-form">
        <div className="grade-inputs">
          <div className="input-group">
            <label htmlFor="french">Français</label>
            <input
              type="number"
              id="french"
              min="0"
              max="100"
              value={grades.french}
              onChange={(e) => handleInputChange('french', e.target.value)}
              placeholder="Note sur 100"
            />
          </div>
          <div className="input-group">
            <label htmlFor="maths">Mathématiques</label>
            <input
              type="number"
              id="maths"
              min="0"
              max="100"
              value={grades.maths}
              onChange={(e) => handleInputChange('maths', e.target.value)}
              placeholder="Note sur 100"
            />
          </div>
          <div className="input-group">
            <label htmlFor="history">Histoire-Géographie-EMC</label>
            <input
              type="number"
              id="history"
              min="0"
              max="100"
              value={grades.history}
              onChange={(e) => handleInputChange('history', e.target.value)}
              placeholder="Note sur 100"
            />
          </div>
          <div className="input-group">
            <label htmlFor="sciences">Sciences</label>
            <input
              type="number"
              id="sciences"
              min="0"
              max="100"
              value={grades.sciences}
              onChange={(e) => handleInputChange('sciences', e.target.value)}
              placeholder="Note sur 100"
            />
          </div>
          <div className="input-group">
            <label htmlFor="oral">Épreuve orale</label>
            <input
              type="number"
              id="oral"
              min="0"
              max="100"
              value={grades.oral}
              onChange={(e) => handleInputChange('oral', e.target.value)}
              placeholder="Note sur 100"
            />
          </div>
        </div>

        <button type="submit" className="calculate-button">
          Calculer ma moyenne
        </button>
      </form>

      {showResults && (
        <div className="results">
          <h3>Résultats</h3>
          <p className="final-grade">Moyenne finale: <strong>{finalGrade.toFixed(2)}/20</strong></p>
          <p className="mention">Mention: <strong>{mention}</strong></p>
        </div>
      )}
    </div>
  );
}