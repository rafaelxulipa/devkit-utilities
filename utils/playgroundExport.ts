import JSZip from 'jszip';

export interface PlaygroundFiles {
    html: string;
    css: string;
    js: string;
}

const buildIndexHtml = (html: string): string => `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Meu Projeto</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
${html}
<script src="script.js"></script>
</body>
</html>
`;

export const buildPreviewSrcDoc = ({ html, css, js }: PlaygroundFiles): string => `<!DOCTYPE html>
<html>
<head>
<style>${css}</style>
</head>
<body>
${html}
<script>
(function() {
  const post = (type, args) => {
    try {
      window.parent.postMessage({ source: 'devkit-playground', type, args: args.map(String) }, '*');
    } catch (e) {}
  };
  ['log', 'warn', 'error', 'info'].forEach((method) => {
    const original = console[method];
    console[method] = function(...args) {
      post(method, args);
      original.apply(console, args);
    };
  });
  window.addEventListener('error', (e) => post('error', [e.message]));
})();
try {
${js}
} catch (err) {
  window.parent.postMessage({ source: 'devkit-playground', type: 'error', args: [String(err && err.message ? err.message : err)] }, '*');
}
</script>
</body>
</html>
`;

export const downloadPlaygroundZip = async (files: PlaygroundFiles, filename = 'meu-projeto.zip'): Promise<void> => {
    const zip = new JSZip();
    zip.file('index.html', buildIndexHtml(files.html));
    zip.file('style.css', files.css);
    zip.file('script.js', files.js);

    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};
