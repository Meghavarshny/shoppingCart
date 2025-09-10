import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync } from "fs";
import { join } from "path";

// Create dist directory if it doesn't exist
const distDir = join(process.cwd(), "dist");
if (!existsSync(distDir)) {
  mkdirSync(distDir, { recursive: true });
}

// Copy all files from build/client to dist
const buildClientDir = join(process.cwd(), "build", "client");

function copyDir(src, dest) {
  const entries = readdirSync(src, { withFileTypes: true });
  if (!existsSync(dest)) {
    mkdirSync(dest, { recursive: true });
  }
  for (let entry of entries) {
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}

// Copy files
copyDir(buildClientDir, distDir);

console.log("Build files copied from build/client to dist successfully!");
