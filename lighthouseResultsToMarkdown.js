const fs = require('fs');

fs.readFile('.lighthouseci/assertion-results.json', 'utf8', (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }
  const results = JSON.parse(data);

  let markdown = "# Lighthouse Assertion Results\n\n";
  markdown += "| Audit Item | Required Score | Expected | Actual | Outcome |\n";
  markdown += "|------------|----------------|----------|--------|---------|\n";

  results.forEach(item => {
    const outcome = item.passed ? 'Passed' : 'Failed';
    markdown += `| ${item.auditProperty} | ${item.name} | ${item.expected} | ${item.actual} | ${outcome} |\n`;
  });

  console.log(markdown);
  
  // This is for the artifacts.
  fs.writeFile('assertion-results.md', markdown, (err) => {
    if (err) {
      console.error("Error writing file:", err);
    } else {
      console.log("Markdown file created successfully.");
    }
  });
});
