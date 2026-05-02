#!/bin/bash
# compile-all.sh — 在 Docker 容器内批量编译所有 playground 代码块
# 输入: /src/<chapter>/<block>/prog.c
# 输出: /out/<chapter>/<block>/output.txt, prog.s, prog.wasm, prog.js

set -e

SRC_DIR="/src"
OUT_DIR="/out"

find "$SRC_DIR" -name "prog.c" | sort | while read -r src; do
  # 提取相对路径: novel_vol0-prologue_ch001/block1/prog.c → novel_vol0-prologue_ch001/block1
  rel=$(echo "$src" | sed "s|$SRC_DIR/||; s|/prog.c$||")
  out="$OUT_DIR/$rel"
  mkdir -p "$out"

  echo "=== Compiling: $rel ==="

  # 1. RISC-V 64 — 交叉编译 + QEMU 运行，捕获参考输出
  if riscv64-linux-gnu-gcc "$src" -static -O1 -o /tmp/prog_run_rv64 -lm 2>/tmp/rv64_gcc_err.txt; then
    qemu-riscv64 /tmp/prog_run_rv64 > "$out/output.txt" 2>&1 || true
  else
    cp /tmp/rv64_gcc_err.txt "$out/output.txt"
  fi

  # 2. RISC-V 64 汇编
  riscv64-linux-gnu-gcc -S -O1 -march=rv64gc -mabi=lp64d "$src" -o "$out/prog.s" 2>/tmp/rv64_asm_err.txt || {
    cp /tmp/rv64_asm_err.txt "$out/prog.s"
  }

  # 3. WASM (Emscripten)
  if emcc "$src" -o "$out/prog.js" \
    -s EXIT_RUNTIME=1 \
    -s EXPORTED_FUNCTIONS='["_main"]' \
    -s EXPORTED_RUNTIME_METHODS='["ccall","callMain","FS"]' \
    -O1 2>/dev/null; then
    echo "  WASM OK"
  else
    echo "  WASM FAILED"
  fi

done

echo "=== ALL DONE ==="
