const fs = require('fs');

fs.readFile('.lighthouseci/assertion-results.json', 'utf8', (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }
  const results = JSON.parse(data);

  let markdown = "# Lighthouse Assertion Results\n\n";
  results.forEach(item => {
    markdown += `## ${item.auditProperty.toUpperCase()}\n`;
    markdown += `- Name: ${item.name}\n`;
    markdown += `- Expected: ${item.expected}\n`;
    markdown += `- Actual: ${item.actual}\n`;
    markdown += `- Passed: ${item.passed}\n\n`;
  });

  // Print the Markdown content to stdout
  console.log(markdown);

  // Optionally, write to a file as well
  fs.writeFile('assertion-results.md', markdown, (err) => {
    if (err) {
      console.error("Error writing file:", err);
    } else {
      console.log("Markdown file created successfully.");
    }
  });
});
