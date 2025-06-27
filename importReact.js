const fs = require('fs');
const path = require('path');

function processDir(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (/\.(js|jsx|ts|tsx)$/.test(file)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('React') || content.includes('from \'react\'')) return;
      content = `import React from 'react';\n` + content;
      fs.writeFileSync(fullPath, content);
      console.log(`✅ Added to ${fullPath}`);
    }
  });
}

processDir('./'); // Change this to your project source folder
