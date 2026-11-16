// Convert Ontario university grades to the OUAC 4.0 scale.
// Usage (Node): const { gpa } = require('./ouac'); gpa(3, [{ grade: 87, weight: 2 }, { grade: 74, weight: 1 }]);
const data = require('./data/ouac-conversion.json');

function toPoints(scale, grade) {
  if (scale === 3 || scale === 4) {
    const pct = Math.round(Number(grade));
    const bands = scale === 4 ? data.scale_4_percentage : data.scale_3_percentage;
    const band = bands.find((b) => pct >= b.min && pct <= b.max);
    return band ? band.gpa : null;
  }
  const table = scale === 9 ? data.scale_9_letter : data.scale_7_letter;
  return table[String(grade).trim()] ?? null;
}

function gpa(scale, courses) {
  let points = 0, weight = 0;
  for (const c of courses) {
    const p = toPoints(scale, c.grade);
    if (p === null || !(c.weight > 0)) continue;
    points += p * c.weight;
    weight += c.weight;
  }
  return { gpa: weight ? Math.round((points / weight) * 100) / 100 : 0, weight };
}

module.exports = { toPoints, gpa };
