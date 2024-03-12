const fs = require('fs');

fs.readFile('.lighthouseci/assertion-results.json', 'utf8', (error, data) => {
  if (error) {
    console.error("Error reading file:", error);
    return;
  }
  const results = JSON.parse(data);

  let markdown = "## Lighthouse Audit Results\n\n";
  markdown += "| Audit Item | Expected (%) | Current (%) | Outcome |\n";
  markdown += "|------------|--------------|------------|---------|\n";

  let actualPercentTotal = 0;

  results.forEach(item => {
    const expected = (parseFloat(item.expected) * 100).toFixed(0);
    const actual = (item.actual * 100).toFixed(0);
    actualPercentTotal += parseFloat(actual);
    const outcomeSymbol = item.passed ? '✅' : '❌';
    markdown += `| ${item.auditProperty} | ${expected} | ${actual} | ${outcomeSymbol} |\n`;
  });

  const averageActualPercent = (actualPercentTotal / results.length).toFixed(2);
  markdown += `####Average Current Percentage: ${averageActualPercent}%\n`;

  console.log(markdown);
});
