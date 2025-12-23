
const fs = require('fs');
const path = require('path');

const filePath = path.join('d:\\YJS\\YJS\\src\\data\\blogPosts.ts');

try {
    let content = fs.readFileSync(filePath, 'utf8');

    // Fix Title
    // We use a regex to match the corrupted title line because the exact characters are uncertain
    content = content.replace(/zh: '关于元金.*\(AurumFoundry\) - 军事化外汇交易员训练.*,/, "zh: '关于元金石(AurumFoundry) - 军事化外汇交易员训练营',");

    // Fix Excerpt
    content = content.replace(/zh: '元金.*\(AurumFoundry\) 是一个专注于筛选和培养外汇交易员的训练营。我们的理念：培养真正适合的人，留下极少数，劝返大多数。通过.*0%-15%.*0个工作日完整培训，盈利分.*0%-90%.*,/, "zh: '元金石(AurumFoundry) 是一个专注于筛选和培养外汇交易员的训练营。我们的理念：培养真正适合的人，留下极少数，劝返大多数。通过率10%-15%，30个工作日完整培训，盈利分成60%-90%。',");

    // Fix Content Header
    content = content.replace(/<h1 class="text-4xl font-bold text-center mb-8 text-foreground">关于元金.*\(AurumFoundry\)<\/h1>/, '<h1 class="text-4xl font-bold text-center mb-8 text-foreground">关于元金石(AurumFoundry)</h1>');

    // Fix Content Paragraph 1
    content = content.replace(/这是一个严格、高强度、高淘汰率的专业训练项目.*\/p>/, '这是一个严格、高强度、高淘汰率的专业训练项目。</p>');

    // Fix Content Paragraph 2
    content = content.replace(/而是找到那些真正具有交易天赋和心理素质的.*\/p>/, '而是找到那些真正具有交易天赋和心理素质的人。</p>');

    // Fix Data Grid
    content = content.replace(/<p class="text-xl font-bold mb-2 text-foreground">工作.*\/p>/, '<p class="text-xl font-bold mb-2 text-foreground">工作日</p>');
    content = content.replace(/<p class="text-xl font-bold mb-2 text-foreground">通过.*\/p>/, '<p class="text-xl font-bold mb-2 text-foreground">通过率</p>');
    content = content.replace(/<p class="text-xl font-bold mb-2 text-foreground">最高分.*\/p>/, '<p class="text-xl font-bold mb-2 text-foreground">最高分成</p>');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log('File repaired successfully.');

} catch (err) {
    console.error('Error repairing file:', err);
}
