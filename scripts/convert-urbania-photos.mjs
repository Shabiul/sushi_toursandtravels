// One-off: converts the owner's WhatsApp photo exports (public/fleet/{9,12,16}-seater)
// into optimised, descriptively named WebP files in public/fleet, then moves the
// raw exports out of public/ so they are not deployed.
// Run: node scripts/convert-urbania-photos.mjs <archiveDir>
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const fleet = path.join(process.cwd(), 'public', 'fleet');
const archive = process.argv[2];
if (!archive) throw new Error('usage: node scripts/convert-urbania-photos.mjs <archiveDir>');

// index = position in the alphabetically sorted source folder (verified on a contact sheet)
const plan = {
  '9-seater': {
    prefix: 'force-urbania-9-seater',
    names: { 1: 'front-01', 2: 'interior-01', 5: 'interior-02', 8: 'interior-03', 7: 'interior-04', 3: 'interior-05', 6: 'interior-06', 0: 'interior-07', 4: 'interior-08' },
  },
  '12-seater': {
    prefix: 'force-urbania-maharaja-12-seater',
    names: { 6: 'front-01', 4: 'side-01', 7: 'interior-01', 2: 'interior-02', 0: 'interior-03', 3: 'interior-04', 5: 'interior-05', 1: 'interior-06' },
  },
  '16-seater': {
    prefix: 'force-urbania-16-seater',
    names: { 4: 'front-01', 1: 'side-01', 2: 'rear-01', 3: 'rear-02', 0: 'interior-01', 5: 'interior-02' },
  },
};

for (const [dir, { prefix, names }] of Object.entries(plan)) {
  const src = path.join(fleet, dir);
  const files = fs.readdirSync(src).sort();
  for (const [idx, label] of Object.entries(names)) {
    const out = path.join(fleet, `${prefix}-${label}.webp`);
    await sharp(path.join(src, files[Number(idx)]))
      .rotate()
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(out);
    console.log(`${dir}[${idx}] -> ${path.basename(out)} (${Math.round(fs.statSync(out).size / 1024)} KB)`);
  }
  fs.mkdirSync(path.join(archive, dir), { recursive: true });
  for (const f of files) { fs.copyFileSync(path.join(src, f), path.join(archive, dir, f)); fs.unlinkSync(path.join(src, f)); }
  fs.rmdirSync(src);
}
