const fs = require('fs');
const path = require('path');

if (process.argv.length <= 2) {
  console.log(`Usage: ${__filename} path/to/directory`);
  process.exit(-1);
}
const folder = process.argv[2];

const uid = (chars = 16) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';
  for (let i = 0; i < chars; i++) {
    id += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return id;
};

const replaceAdobeIDs = (data) => {
  const exp = /SVGID_\d+_/g, uids = [];
  // Replaces all occurrences with a simple uid, linking previously found matches to same uid
  return data.replace(exp, (match) => uids[match] ? uids[match] : (uids[match] = uid()));
};

fs.readdirSync(folder).forEach(file => {
  const fullPath = path.resolve(folder, file);
  const ext = path.extname(fullPath).toLowerCase();
  if (ext === '.svg') {
    console.log(`Processing ${fullPath}`);
    const data = fs.readFileSync(fullPath, 'utf8');
    fs.writeFileSync(fullPath, replaceAdobeIDs(data));
  }
});
