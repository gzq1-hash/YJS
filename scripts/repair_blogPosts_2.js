
const fs = require('fs');
const path = require('path');

const filePath = path.join('d:\\YJS\\YJS\\src\\data\\blogPosts.ts');

try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix Entry 2 Excerpt
    // Pattern: zh: '外汇市场...第一步?,
    // We use a flexible regex to catch the corruption
    content = content.replace(/zh: '外汇市场是全球最大的金融市场，日交易量超.万亿美元。本文将系统地带你了解外汇交易的基础知识，帮助你迈出交易生涯的第一步.,/, "zh: '外汇市场是全球最大的金融市场，日交易量超6万亿美元。本文将系统地带你了解外汇交易的基础知识，帮助你迈出交易生涯的第一步。',");

    // Fix Entry 2 Content Paragraph
    // Pattern: ...第一步?/p>
    content = content.replace(/是成为职业交易员的第一步.\/p>/, '是成为职业交易员的第一步。</p>');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log('File repaired successfully.');

} catch (err) {
    console.error('Error repairing file:', err);
}
