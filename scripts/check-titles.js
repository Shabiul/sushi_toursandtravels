const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = walk(path.join(__dirname, '../src'));
const missing = [];

const tagRegex = /<(a|Link|Image|img)\b([^>]*?)(\/?>)/gs;

files.forEach(filePath => {
  // Exclude dashboard / admin files if any
  const content = fs.readFileSync(filePath, 'utf8');
  let match;
  while ((match = tagRegex.exec(content)) !== null) {
    const tag = match[1];
    const attrs = match[2];
    if (!attrs.includes('title=')) {
      // get line number
      const line = content.substring(0, match.index).split('\n').length;
      missing.push({
        file: path.relative(path.join(__dirname, '..'), filePath),
        line,
        tag,
        snippet: match[0].replace(/\s+/g, ' ').substring(0, 100)
      });
    }
  }
});

console.log(`Scanned ${files.length} files. Found ${missing.length} tags missing title:`);
missing.forEach(m => console.log(`${m.file}:${m.line} <${m.tag}> -> ${m.snippet}`));
