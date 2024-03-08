const fs = require('fs');

fs.readFile('.lighthouseci/assertion-results.json', 'utf8', (error, data) => {
  if (error) {
    console.error("Error reading file:", error);
    return;
  }
  const results = JSON.parse(data);

  let markdown = "# Lighthouse Assertion Results\n\n";
  markdown += "| Audit Item | Required Score | Expected (%) | Actual (%) | Outcome |\n";
  markdown += "|------------|----------------|--------------|------------|---------|\n";

  results.forEach(item => {
    const expected = (parseFloat(item.expected) * 100).toFixed(2);
    const actual = (item.actual * 100).toFixed(2);
    const outcomeSymbol = item.passed ? '✅' : '❌';
    markdown += `| ${item.auditProperty} | ${item.name} | ${expected} | ${actual} | ${outcomeSymbol} |\n`;
  });

  console.log(markdown);
});
