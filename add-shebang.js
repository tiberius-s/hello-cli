import { readFileSync, writeFileSync, chmodSync } from "node:fs";

const shebang = "#!/usr/bin/env node\n";
const files = ["build/esm/src/cli.js", "build/cjs/src/cli.js"];

for (const file of files) {
  try {
    const content = readFileSync(file, "utf-8");
    if (!content.startsWith("#!")) {
      writeFileSync(file, shebang + content);
      chmodSync(file, 0o755);
      console.log(`✓ Added shebang to ${file}`);
    }
  } catch (err) {
    console.error(`Error processing ${file}:`, err.message);
  }
}
