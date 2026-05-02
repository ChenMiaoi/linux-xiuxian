import type { Plugin } from 'vite'

/**
 * Vite 插件：注入 playground 增强脚本到 HTML
 */
export default function playgroundPlugin(): Plugin {
  return {
    name: 'xiuxian-playground',
    transformIndexHtml(html) {
      const script = `
<script>
(function() {
  function enhance() {
    document.querySelectorAll('[class*="language-c:playground"]').forEach(function(el) {
      var wrapper = el.closest('div[class*="language-c:playground"]');
      if (!wrapper || wrapper.dataset.playgroundProcessed) return;
      wrapper.dataset.playgroundProcessed = 'true';

      var classMatch = wrapper.className.match(/language-c:playground(?::(.+?))?(?:\\s|$)/);
      var title = (classMatch && classMatch[1]) || 'C Playground';
      var codeEl = wrapper.querySelector('code');
      var code = codeEl ? codeEl.textContent : '';

      var header = document.createElement('div');
      header.className = 'playground-header';
      header.innerHTML = '<span class="playground-title">' + title.replace(/</g, '&lt;') + '</span><button class="playground-run">运行</button>';

      var iframeDiv = document.createElement('div');
      iframeDiv.className = 'playground-iframe-container';
      iframeDiv.style.display = 'none';

      wrapper.insertBefore(header, wrapper.firstChild);
      wrapper.appendChild(iframeDiv);
      wrapper.classList.add('playground-wrapper');

      header.querySelector('.playground-run').addEventListener('click', function() {
        if (iframeDiv.style.display === 'none') {
          iframeDiv.style.display = 'block';
          header.querySelector('.playground-run').textContent = '关闭';
          if (!iframeDiv.querySelector('iframe')) {
            var state = {
              version: 4,
              content: [
                { type: 'component', componentName: 'codeEditor', componentState: { source: code, lang: 'c', fontScale: 14 } },
                { type: 'component', componentName: 'compiler', componentState: { compiler: 'g142', source: 0, lang: 'c', options: '', filters: { commentOnly: true, directives: true, intel: true, labels: true, trim: false } } }
              ],
              layout: { contentType: 'row', children: [{ contentType: 'component', size: 50 }, { contentType: 'component', size: 50 }] }
            };
            try {
              var url = 'https://godbolt.org/clientstate/' + btoa(unescape(encodeURIComponent(JSON.stringify(state))));
              var iframe = document.createElement('iframe');
              iframe.className = 'playground-iframe';
              iframe.loading = 'lazy';
              iframe.src = url;
              iframeDiv.appendChild(iframe);
            } catch(e) { console.error('Playground error:', e); }
          }
        } else {
          iframeDiv.style.display = 'none';
          header.querySelector('.playground-run').textContent = '运行';
        }
      });
    });
  }

  enhance();
  var observer = new MutationObserver(enhance);
  observer.observe(document.body, { childList: true, subtree: true });
})();
</script>`
      return html.replace('</body>', script + '\n</body>')
    },
  }
}
