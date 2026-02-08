const fs = require('fs');
const path = require('path');

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['node_modules', '.next', 'dist', '.git'].includes(entry.name)) continue;
      walk(full);
    } else if (entry.isFile()) {
      if (!full.endsWith('.jsx') && !full.endsWith('.js') && !full.endsWith('.tsx') && !full.endsWith('.ts')) continue;
      const content = fs.readFileSync(full, 'utf8');
      const regex = /import\s+\"\.\/style\.scss\"\s*;?/g;
      if (regex.test(content)) {
        const dirName = path.dirname(full);
        const stylePath = path.join(dirName, 'style.scss');
        if (!fs.existsSync(stylePath)) {
          console.log('MISSING_STYLE:', full, '->', stylePath);
        }
      }
    }
  }
}

walk(process.cwd());
console.log('done');
