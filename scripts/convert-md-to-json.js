const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, '../public/content');
const outputDir = path.join(__dirname, '../public/content-json');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function parseFrontmatter(text) {
  const meta = {};
  const match = text.match(/---\n([\s\S]+?)\n---/);
  if (match) {
    const frontMatter = match[1];
    frontMatter.split('\n').forEach(line => {
      const parts = line.split(':');
      if (parts.length > 1) {
        const key = parts[0].trim();
        const value = parts.slice(1).join(':').trim();
        // Handle tags specially as they are an array
        if (key === 'tags') {
          try {
            meta[key] = JSON.parse(value);
          } catch (e) {
            console.error('Error parsing tags:', e);
            meta[key] = [];
          }
        } else {
          // Remove quotes from other string values
          meta[key] = value.replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1');
        }
      }
    });
  }
  
  // Extract content (everything after frontmatter)
  const contentMatch = text.match(/---\n[\s\S]+?\n---([\s\S]*)/);
  const content = contentMatch ? contentMatch[1].trim() : text;
  
  return { meta, content };
}

function processDirectory(dir, outputSubDir) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const itemPath = path.join(dir, item);
    const stat = fs.statSync(itemPath);
    
    if (stat.isDirectory()) {
      // Create corresponding output directory
      const newOutputDir = path.join(outputSubDir, item);
      if (!fs.existsSync(newOutputDir)) {
        fs.mkdirSync(newOutputDir, { recursive: true });
      }
      processDirectory(itemPath, newOutputDir);
    } else if (path.extname(item) === '.md') {
      // Process markdown file
      const content = fs.readFileSync(itemPath, 'utf8');
      const { meta, content: markdownContent } = parseFrontmatter(content);
      
      const jsonData = {
        ...meta,
        content: markdownContent
      };
      
      // Write JSON file
      const baseName = path.basename(item, '.md');
      const jsonPath = path.join(outputSubDir, `${baseName}.json`);
      fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2));
      
      console.log(`Converted: ${itemPath} -> ${jsonPath}`);
    }
  }
}

console.log('Converting markdown files to JSON...');
processDirectory(contentDir, outputDir);
console.log('Conversion complete!'); 