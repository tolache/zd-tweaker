const fs = require('fs');

// Read package.json and get the 'version'
let packageData = fs.readFileSync('package.json');
let version = JSON.parse(packageData)['version'];

let manifestData = fs.readFileSync('public/manifest.json');
let manifestJson = JSON.parse(manifestData);
manifestJson['version'] = version;

// Write updated JSON object back to manifest.json
fs.writeFileSync('public/manifest.json', JSON.stringify(manifestJson, null, 2));