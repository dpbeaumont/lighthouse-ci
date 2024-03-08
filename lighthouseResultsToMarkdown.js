const fs = require('fs');

const jsonToMarkdown = (data) => {
  let markdown = "# Lighthouse Assertion Results\n\n";

  data.forEach(item => {
    markdown += `## ${item.auditProperty.toUpperCase()}\n`;
    markdown += `- Name: ${item.name}\n`;
    markdown += `- Expected: ${item.expected}\n`;
    markdown += `- Actual: ${item.actual}\n`;
    markdown += `- Values: ${item.values.join(', ')}\n`;
    markdown += `- Operator: ${item.operator}\n`;
    markdown += `- Passed: ${item.passed}\n`;
    markdown += `- Audit ID: ${item.auditId}\n`;
    markdown += `- Level: ${item.level}\n`;
    markdown += `- URL: ${item.url}\n\n`;
  });

  return markdown;
};

fs.readFile('.lighthouseci/assertion-results.json', 'utf8', (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }
  const jsonData = JSON.parse(data);
  const markdown = jsonToMarkdown(jsonData);
  fs.writeFile('assertion-results.md', markdown, (err) => {
    if (err) {
      console.error("Error writing file:", err);
    } else {
      console.log("Markdown file created successfully.");
    }
  });
});
