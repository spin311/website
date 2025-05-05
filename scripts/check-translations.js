const fs = require('fs');
const path = require('path');

const en = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/assets/translations/en.json'), 'utf8'));
const sl = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/assets/translations/sl.json'), 'utf8'));

function getAllKeys(obj, prefix = '') {
    return Object.keys(obj).flatMap(key => {
        const value = obj[key];
        const fullPath = prefix ? `${prefix}.${key}` : key;
        if (typeof value === 'object' && value !== null) {
            return getAllKeys(value, fullPath);
        } else {
            return [fullPath];
        }
    });
}

const enKeys = getAllKeys(en);
const slKeys = getAllKeys(sl);

const missingInSl = enKeys.filter(key => !slKeys.includes(key));
const missingInEn = slKeys.filter(key => !enKeys.includes(key));

if (missingInSl.length > 0 || missingInEn.length > 0) {
    console.error('❌ Translation key mismatch detected!');
    if (missingInSl.length > 0) {
        console.error('Missing in `sl.json`:');
        missingInSl.forEach(key => console.error(`  - ${key}`));
    }
    if (missingInEn.length > 0) {
        console.error('Missing in `en.json`:');
        missingInEn.forEach(key => console.error(`  - ${key}`));
    }
    process.exit(1);
} else {
    console.log('✅ Translation files match.');
}