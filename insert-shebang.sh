#!/bin/sh
set -eu

create_wrapper() {
  local src="$1"
  local out="$2"
  local loader="$3"

  [ -f "$src" ] || return 0

  mkdir -p "$(dirname "$out")"
  cat > "$out" <<EOF
#!/usr/bin/env node
$loader
EOF
  chmod +x "$out"
  echo "Created $out"
}

# ESM wrapper
create_wrapper "build/esm/src/cli.js" "build/esm/cli.js" \
"import('./src/cli.js').catch(err => {
  console.error(err);
  process.exit(1);
});"

# CJS wrapper with package.json
if [ -f "build/cjs/src/cli.js" ]; then
  cat > "build/cjs/package.json" <<'EOF'
{"type":"commonjs"}
EOF
  create_wrapper "build/cjs/src/cli.js" "build/cjs/cli.js" \
"try {
  require('./src/cli.js');
} catch (err) {
  console.error(err);
  process.exit(1);
}"
fi