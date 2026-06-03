const currentScript =
  document.currentScript instanceof HTMLScriptElement ? document.currentScript : null;

const liveReloadOrigin = currentScript?.src ? new URL(currentScript.src).origin : SERVE_ORIGIN;

new EventSource(`${liveReloadOrigin}/esbuild`).addEventListener('change', () => location.reload());
