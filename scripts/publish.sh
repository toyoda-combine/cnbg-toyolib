#/bin/bash
set -eu

npm run test
npm run build
npm publish
