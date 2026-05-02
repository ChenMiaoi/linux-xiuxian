/**
 * Playground WASM runtime.
 * Runs each sample in a fresh iframe so Emscripten globals do not collide.
 */
(function () {
  var currentScript = document.currentScript;
  var baseUrl = currentScript ? new URL('.', currentScript.src) : new URL('/', window.location.href);
  var runSeq = 0;

  function resolveAsset(path) {
    return new URL(String(path || '').replace(/^\/+/, ''), baseUrl).href;
  }

  function setOutput(output, text) {
    var code = output.querySelector('code') || output;
    code.textContent = text;
  }

  function buildRunnerHtml(token, scriptUrl, wasmUrl) {
    var safeScriptUrl = JSON.stringify(scriptUrl);
    var safeWasmUrl = JSON.stringify(wasmUrl);
    return [
      '<!doctype html><meta charset="utf-8">',
      '<script>',
      'var stdout = "";',
      'var finished = false;',
      'function send(kind, text) { parent.postMessage({ type: "xiuxian-playground", token: "' + token + '", kind: kind, text: text || "" }, "*"); }',
      'function done(text) { if (finished) return; finished = true; send("done", text || stdout || "(无输出)\\n"); }',
      'window.onerror = function(message) { done(String(message || "运行失败")); };',
      'var Module = {',
      '  locateFile: function(path) { return path.endsWith(".wasm") ? ' + safeWasmUrl + ' : path; },',
      '  print: function(text) { stdout += text + "\\n"; send("output", stdout); },',
      '  printErr: function(text) { stdout += text + "\\n"; send("output", stdout); },',
      '  postRun: [function() { done(); }],',
      '  onAbort: function(reason) { done("运行中止: " + reason); },',
      '  onExit: function() { done(); }',
      '};',
      '<\/script>',
      '<script src=' + safeScriptUrl + ' onerror="send(\'error\', \'加载失败\')"><\/script>'
    ].join('');
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.playground-run');
    if (!btn) return;

    var wasmDir = btn.getAttribute('data-wasm');
    if (!wasmDir) return;

    var panel = btn.closest('.playground-panel');
    var output = panel && panel.querySelector('.playground-run-output');
    if (!output) return;

    var token = 'run-' + (++runSeq);
    var scriptUrl = resolveAsset(wasmDir + '/prog.js');
    var wasmUrl = resolveAsset(wasmDir + '/prog.wasm');
    var previousFrame = panel.querySelector('iframe[data-playground-runner]');
    if (previousFrame) previousFrame.remove();

    output.hidden = false;
    setOutput(output, '执行中...\n');
    btn.disabled = true;
    btn.textContent = '运行中';

    var frame = document.createElement('iframe');
    frame.setAttribute('sandbox', 'allow-scripts allow-same-origin');
    frame.setAttribute('data-playground-runner', token);
    frame.setAttribute('aria-hidden', 'true');
    frame.tabIndex = -1;
    frame.hidden = true;
    panel.appendChild(frame);

    function onMessage(event) {
      var data = event.data || {};
      if (data.type !== 'xiuxian-playground' || data.token !== token) return;

      if (data.kind === 'output') {
        setOutput(output, data.text);
        return;
      }

      if (data.kind === 'error') {
        setOutput(output, data.text);
      } else {
        setOutput(output, data.text || '(无输出)\n');
      }
      btn.disabled = false;
      btn.textContent = '再次运行';
      window.removeEventListener('message', onMessage);
    }

    window.addEventListener('message', onMessage);
    frame.srcdoc = buildRunnerHtml(token, scriptUrl, wasmUrl);
  });
})();
