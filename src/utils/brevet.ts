// Calculate points for a group of subjects
export function calculateGroupPoints(subjects: string[]): number {
  let total = 0;
  subjects.forEach(id => {
    const input = document.getElementById(id) as HTMLInputElement;
    if (input) {
      const value = parseFloat(input.value) || 0;
      const coefficient = parseInt(input.dataset.coefficient || "0");
      total += value * coefficient;
    }
  });
  return total;
}

// Convert points to a grade out of 20
export function pointsToGrade(points: number): number {
  return Math.round((points / 500) * 20 * 10) / 10;
}