const { execSync } = require('child_process');

try {
    const output = execSync('npx typeorm schema:log -d dist/data-source.js').toString().trim();
    if (output && !output.includes("Your schema is up to date")) {
        console.error('❌ Schema differences detected:');
        console.error(output);
        process.exit(1);
    } else {
        console.log('✅ Schema is in sync');
    }
} catch (err) {
    console.error(err.message);
    process.exit(1);
}