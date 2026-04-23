import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const repoRoot = process.cwd();
const imagesRoot = path.join(repoRoot, "public", "images");

const INPUT_EXTS = new Set([".png", ".jpg", ".jpeg", ".JPG", ".JPEG", ".PNG"]);

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

function rel(p) {
  return path.relative(repoRoot, p).replaceAll("\\", "/");
}

async function main() {
  if (!fs.existsSync(imagesRoot)) {
    console.error(`Missing folder: ${imagesRoot}`);
    process.exit(1);
  }

  const files = walk(imagesRoot).filter((f) => INPUT_EXTS.has(path.extname(f)));
  if (files.length === 0) {
    console.log("No images found to convert.");
    return;
  }

  let converted = 0;
  for (const file of files) {
    const outFile = file.replace(/\.[^.]+$/, ".webp");
    const inStat = fs.statSync(file);
    const outExists = fs.existsSync(outFile);
    const outStat = outExists ? fs.statSync(outFile) : null;

    // Skip if .webp exists and is newer than source
    if (outStat && outStat.mtimeMs >= inStat.mtimeMs) continue;

    await sharp(file)
      // keep transparency when present; sharp handles that automatically for webp
      .webp({ quality: 82, effort: 5 })
      .toFile(outFile);

    converted += 1;
    console.log(`✓ ${rel(file)} -> ${rel(outFile)}`);
  }

  console.log(`Done. Converted ${converted} image(s) to .webp.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

