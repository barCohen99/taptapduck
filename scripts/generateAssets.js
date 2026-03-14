const fs = require('fs');
const path = require('path');

const backgroundsDir = path.join(__dirname, '../utils/backgrounds');
const ducksDir = path.join(__dirname, '../utils/formatters');
const heroDir = path.join(__dirname, '../utils/hero');
const friendDir = path.join(__dirname, '../utils/friend');

const outPath = path.join(__dirname, '../utils/assetMap.js');

let outContent = `// Auto-generated asset map for React Native\n\nexport const ASSETS = {\n`;

// Helper to add files
const addDir = (dir, prefix) => {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    files.forEach(f => {
        if (f.endsWith('.png') || f.endsWith('.webp') || f.endsWith('.svg') || f.endsWith('.jpg')) {
            const name = f.replace(/\.[^/.]+$/, ""); // strip extension
            const relPath = path.relative(path.dirname(outPath), path.join(dir, f)).replace(/\\/g, '/');
            outContent += `  '${prefix}${name}': require('./${relPath}'),\n`;
        }
    });
};

addDir(backgroundsDir, 'bg_');
addDir(ducksDir, 'duck_');
addDir(heroDir, 'hero_');
addDir(friendDir, 'friend_');

outContent += `};\n\nexport const getAsset = (key) => ASSETS[key];\n`;

fs.writeFileSync(outPath, outContent);
console.log('Asset map generated successfully at', outPath);
