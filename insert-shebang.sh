#!/bin/sh

# insert a node shebang at the top of build/cli.js
sed -i "" -e '1i\
#!/usr/bin/env node --experimental-modules=node --experimental-specifier-resolution=node --no-warnings
' build/cli.js