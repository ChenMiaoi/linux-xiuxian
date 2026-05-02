#!/bin/bash
# build-playground.sh
# 编译所有 playground 代码块 → 运行结果 + 汇编 + WASM
# 用法: 由 VitePress 构建插件调用，不直接运行

set -e

SRC_FILE="$1"       # C 源文件路径 (Windows)
OUT_DIR="$2"        # WASM 输出目录 (Windows)
WANT_WASM="$3"      # "1" = 也编译 WASM

# 转为 Docker 可用的路径 (MSYS_NO_PATHCONV 防止 Git Bash 转换)
SRC_DIR=$(dirname "$SRC_FILE")
SRC_BASE=$(basename "$SRC_FILE")

echo "---COMPILE_START---"

# 1. 编译并运行 (x86 native)
OUTPUT=$(MSYS_NO_PATHCONV=1 docker run --rm \
  -v "$SRC_DIR:/src:ro" \
  emscripten/emsdk:3.1.51 \
  sh -c "gcc /src/$SRC_BASE -o /tmp/prog -lm 2>&1 && /tmp/prog 2>&1" 2>&1) || true
echo "---OUTPUT---"
echo "$OUTPUT"
echo "---OUTPUT_END---"

# 2. 生成汇编 (x86-64 Intel)
ASM=$(MSYS_NO_PATHCONV=1 docker run --rm \
  -v "$SRC_DIR:/src:ro" \
  emscripten/emsdk:3.1.51 \
  sh -c "gcc -S -masm=intel -O1 /src/$SRC_BASE -o /tmp/prog.s 2>/dev/null && cat /tmp/prog.s" 2>&1) || true
echo "---ASM---"
echo "$ASM"
echo "---ASM_END---"

# 3. 编译 WASM (可选)
if [ "$WANT_WASM" = "1" ]; then
  mkdir -p "$OUT_DIR"
  MSYS_NO_PATHCONV=1 docker run --rm \
    -v "$SRC_DIR:/src:ro" \
    -v "$OUT_DIR:/out" \
    emscripten/emsdk:3.1.51 \
    emcc "/src/$SRC_BASE" -o /out/prog.js \
      -s EXIT_RUNTIME=1 \
      -s EXPORTED_FUNCTIONS='["_main"]' \
      -s EXPORTED_RUNTIME_METHODS='["ccall","callMain","FS"]' \
      -O1 2>&1 || true
  echo "---WASM_OK---"
fi

echo "---DONE---"
