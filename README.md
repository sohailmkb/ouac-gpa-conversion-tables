# OUAC GPA conversion tables (machine-readable)

The Ontario Universities' Application Centre (OUAC) grade conversion scales in JSON and CSV, plus a small JavaScript function that converts course grades to a weighted 4.0 GPA.

Useful if you are building a GPA calculator, an admissions tool, or analysing Ontario transcripts for OMSAS, OLSAS or other OUAC applications.

## What is included

| File | Contents |
|---|---|
| `data/ouac-conversion.json` | All four scales, the university-to-scale mapping and rounding notes |
| `data/percentage-scales.csv` | Scale 3 and Scale 4 percentage bands |
| `data/letter-scales.csv` | Scale 7 and Scale 9 letter grades |
| `data/ontario-universities.csv` | Which OUAC scale each Ontario university uses |
| `ouac.js` | `toPoints(scale, grade)` and `gpa(scale, courses)` |

## The scales

- **Scale 3 (percentage):** most Ontario universities that report percentages. 90–100% = 4.0, 85–89% = 3.9, 80–84% = 3.7, and so on.
- **Scale 4 (percentage):** Royal Military College. 93–100% = 4.0, 84–92% = 3.9, 75–83% = 3.7, and so on.
- **Scale 7 (letter):** A+ = 4.0, A = 3.9, A- = 3.7, B+ = 3.3 ... F = 0.0.
- **Scale 9 (letter):** York University. A+ = 4.0, A = 3.8, B+ = 3.3 ... F = 0.0.

Some universities (Queen's, Toronto, Waterloo, Windsor, RMC) can appear on two scales, depending on whether the transcript reports a percentage or a letter grade.

## Example

```js
const { gpa } = require('./ouac');

// Scale 3: an 87% full-year course and a 74% half-year course
gpa(3, [{ grade: 87, weight: 2 }, { grade: 74, weight: 1 }]);
// => { gpa: 3.6, weight: 3 }   ((3.9 * 2) + (3.0 * 1)) / 3
```

Weights follow OMSAS-style course weighting: a full-year course counts 2 and a half-year course counts 1. Percentages are rounded to the nearest whole number before conversion (0.5 rounds up).

## Try it in a browser

An interactive version, with every Ontario university and a worked example, is at **[OUAC GPA calculator](https://northessayhelp.com/tools/ouac-gpa-calculator)**. For a plain 4.0 GPA, see the **[GPA calculator](https://northessayhelp.com/tools/gpa-calculator)**.

## Accuracy

The numbers follow the published OUAC undergraduate grade conversion table. Always confirm against the current table on [ouac.on.ca](https://www.ouac.on.ca/) before relying on a result for an application. Corrections are welcome as issues or pull requests.

## License

Data: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Code: MIT. Maintained by [North Essay Help](https://northessayhelp.com/).
