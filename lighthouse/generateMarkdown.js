const fs = require('fs');

fs.readFile('.lighthouseci/assertion-results.json', 'utf8', (error, data) => {
  if (error) {
    console.error("Error reading file:", error);
    return;
  }
  const results = JSON.parse(data);

  let markdown = "### Lighthouse Audit Results\n\n";
  markdown += "| Audit Item | Target (%) | Current (%) | Outcome |\n";
  markdown += "|------------|--------------|------------|---------|\n";

  results.forEach(item => {
    const expected = (parseFloat(item.expected) * 100).toFixed(0);
    const actual = (item.actual * 100).toFixed(0);
    const outcomeSymbol = item.passed ? '✅' : '❌';
    markdown += `| ${item.auditProperty} | ${expected} | ${actual} | ${outcomeSymbol} |\n`;
  });

  console.log(markdown);
});
