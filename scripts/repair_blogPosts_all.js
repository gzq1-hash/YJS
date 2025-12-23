
const fs = require('fs');
const path = require('path');

const filePath = path.join('d:\\YJS\\YJS\\src\\data\\blogPosts.ts');

try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const lines = fileContent.split('\n');
    const fixedLines = lines.map((line, index) => {
        const trimmed = line.trim();
        // Check if line starts with "zh: '" and ends with "," but not "',"
        if (trimmed.startsWith("zh: '") && trimmed.endsWith(",") && !trimmed.endsWith("',")) {
            console.log(`Fixing line ${index + 1}: ${trimmed}`);
            // Replace the last comma with "',"
            // We use lastIndexOf to be safe
            const lastCommaIndex = line.lastIndexOf(',');
            if (lastCommaIndex !== -1) {
                return line.substring(0, lastCommaIndex) + "'," + line.substring(lastCommaIndex + 1);
            }
        }
        return line;
    });

    const newContent = fixedLines.join('\n');
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log('All syntax errors repaired.');

} catch (err) {
    console.error('Error repairing file:', err);
}
