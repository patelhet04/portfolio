// Generates web-sized copies of the source images in assets-src/. The sources
// live outside public/ so they are not copied into the static export.
// Run with: node scripts/optimize-images.mjs
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const SRC = "assets-src";
const OUT = "public/assets/opt";

const jobs = [
  // About portrait
  { src: "Profile1.jpg", out: "profile.webp", resize: { width: 1100 } },
  // Testimonial avatars and plates
  { src: "dash1.jpg", out: "dash1-thumb.webp", resize: { width: 160, height: 160, fit: "cover", position: "attention" } },
  { src: "dash1.jpg", out: "dash1.webp", resize: { width: 900 } },
  { src: "dash2.jpg", out: "dash2.webp", resize: { width: 900 } },
  { src: "dash3.jpg", out: "dash3.webp", resize: { width: 900 } },
  { src: "profchris.jpeg", out: "profchris-thumb.webp", resize: { width: 160, height: 160, fit: "cover", position: "attention" } },
  { src: "silver.png", out: "silver-thumb.webp", resize: { width: 160, height: 160, fit: "contain", background: "#ffffff" } },
  // Output previews
  ...[
    "vllm.png",
    "EncoreArticle.png",
    "Fullstack_Article.png",
    "JS_vs_TS.png",
    "Prodly.png",
    "AmazonSocial.png",
    "javaSwing.png",
    "flashcard.png",
    "node_passport.png",
    "portfolio.png",
    "node_frameworks.jpeg",
    "nextjs_daisyui.jpeg",
  ].map((src) => ({ src, out: src.replace(/\.(png|jpe?g)$/i, ".webp"), resize: { width: 720 } })),
];

await mkdir(OUT, { recursive: true });
for (const job of jobs) {
  const info = await sharp(path.join(SRC, job.src))
    .rotate()
    .resize({ withoutEnlargement: true, ...job.resize })
    .webp({ quality: 78 })
    .toFile(path.join(OUT, job.out));
  console.log(`${job.out.padEnd(28)} ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
}
