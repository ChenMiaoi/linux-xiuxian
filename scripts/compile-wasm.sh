#!/bin/bash
# 在 Docker (Emscripten) 中编译 C → WASM
# 用法: compile-wasm.sh <input.c> <output_dir>
set -e

INPUT="$1"
OUTDIR="$2"
BASENAME=$(basename "$INPUT" .c)

emcc "$INPUT" \
  -o "$OUTDIR/$BASENAME.js" \
  -s EXIT_RUNTIME=1 \
  -s EXPORTED_FUNCTIONS='["_main"]' \
  -s EXPORTED_RUNTIME_METHODS='["ccall","cwrap","callMain","FS"]' \
  -O1 2>&1

echo "---COMPILE_OK---"

# 如果有 -run 标志，运行并输出
if [ "$3" = "-run" ]; then
  echo "---OUTPUT_START---"
  node "$OUTDIR/$BASENAME.js" 2>&1 || true
  echo "---OUTPUT_END---"
fi
