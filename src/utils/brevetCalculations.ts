interface Grades {
  french: number;
  maths: number;
  history: number;
  sciences: number;
  oral: number;
}

export function calculateFinalGrade(grades: Grades): number {
  // Convert each grade from /100 to /20
  const gradesOn20 = {
    french: grades.french / 5,
    maths: grades.maths / 5,
    history: grades.history / 5,
    sciences: grades.sciences / 5,
    oral: grades.oral / 5
  };

  // Calculate total (all coefficients are 1)
  const total = Object.values(gradesOn20).reduce((sum, grade) => sum + grade, 0);
  
  // Divide by number of subjects (5)
  return total / 5;
}

export function getMention(grade: number): string {
  if (grade >= 16) return "Très Bien";
  if (grade >= 14) return "Bien";
  if (grade >= 12) return "Assez Bien";
  if (grade >= 10) return "Admis";
  return "Non Admis";
}