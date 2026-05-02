/**
 * Playground WASM 运行时
 * 点击"运行"按钮，在浏览器中执行编译好的 WASM
 */
(function () {
  // 已加载的 WASM 目录缓存
  var loaded = {};

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.playground-run');
    if (!btn) return;

    var wasmDir = btn.getAttribute('data-wasm');
    if (!wasmDir) return;

    var outputDiv = btn.parentElement.querySelector('.playground-run-output');
    if (!outputDiv) return;

    // 切换显示
    if (outputDiv.style.display !== 'none') {
      outputDiv.style.display = 'none';
      btn.textContent = '运行';
      return;
    }

    outputDiv.style.display = 'block';
    outputDiv.textContent = '执行中...\n';
    btn.textContent = '停止';

    var stdout = '';

    // Emscripten Module 配置 — 必须在加载 glue JS 之前设置
    window.Module = {
      print: function (text) {
        stdout += text + '\n';
        outputDiv.textContent = stdout;
      },
      printErr: function (text) {
        stdout += text + '\n';
        outputDiv.textContent = stdout;
      },
      onRuntimeInitialized: function () {
        try {
          window.Module.callMain();
        } catch (err) {
          // EXIT_RUNTIME=1 时 exit() 会抛 ExitStatus，忽略
        }
        if (!stdout) {
          outputDiv.textContent = '(无输出)';
        }
        btn.textContent = '运行';
      }
    };

    // 加载 Emscripten glue JS（它会自动 fetch 同目录的 .wasm）
    var script = document.createElement('script');
    script.src = '/' + wasmDir + '/prog.js';
    script.onerror = function () {
      outputDiv.textContent = '加载失败: ' + wasmDir;
      btn.textContent = '运行';
    };
    document.head.appendChild(script);
  });
})();
