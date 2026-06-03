import * as esbuild from 'esbuild';
import { createReadStream, existsSync, readdirSync, statSync, watch } from 'fs';
import { createServer } from 'http';
import { extname, join, normalize, resolve, sep } from 'path';

// Config output
const BUILD_DIRECTORY = 'dist';
const PRODUCTION = process.env.NODE_ENV === 'production';

// Config entrypoint files
const ENTRY_POINTS = ['src/index.ts'];

// Config dev serving
const LIVE_RELOAD = !PRODUCTION;
const DEFAULT_SERVE_PORT = 3000;
const REQUESTED_SERVE_PORT = Number.parseInt(
  process.env.SERVE_PORT || String(DEFAULT_SERVE_PORT),
  10
);
const SERVE_PORT = Number.isFinite(REQUESTED_SERVE_PORT)
  ? REQUESTED_SERVE_PORT
  : DEFAULT_SERVE_PORT;
const SERVE_HOST = process.env.SERVE_HOST || '0.0.0.0';
const SERVE_ORIGIN = process.env.SERVE_ORIGIN || `http://localhost:${SERVE_PORT}`;
const DEFAULT_ALLOWED_ORIGINS = [
  'https://tsa-law.webflow.io',
  'https://tsa.law',
  'https://www.tsa.law',
];
const DEV_ALLOWED_ORIGINS = new Set(
  (process.env.TSA_DEV_ALLOWED_ORIGINS || DEFAULT_ALLOWED_ORIGINS.join(','))
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)
);

// Create context
const context = await esbuild.context({
  bundle: true,
  entryPoints: ENTRY_POINTS,
  outdir: BUILD_DIRECTORY,
  minify: PRODUCTION,
  sourcemap: !PRODUCTION,
  target: PRODUCTION ? 'es2020' : 'esnext',
  inject: LIVE_RELOAD ? ['./bin/live-reload.js'] : undefined,
  define: {
    SERVE_ORIGIN: JSON.stringify(SERVE_ORIGIN),
  },
});

// Build files in prod
if (PRODUCTION) {
  await context.rebuild();
  context.dispose();
}

// Watch and serve files in dev
else {
  await context.watch();
  startDevServer();
}

/**
 * Starts a small static server with CORS and Private Network Access headers.
 * esbuild's built-in serve API does not expose response header hooks.
 */
function startDevServer() {
  const reloadClients = new Set();
  let reloadTimer;

  const server = createServer((request, response) => {
    if (request.method === 'OPTIONS') {
      handleOptionsRequest(request, response);
      return;
    }

    if (getRequestPath(request.url) === '/esbuild') {
      handleLiveReloadRequest(request, response, reloadClients);
      return;
    }

    if (request.method !== 'GET' && request.method !== 'HEAD') {
      response.writeHead(405, getDevResponseHeaders(request));
      response.end('Method Not Allowed');
      return;
    }

    const filePath = getServedFilePath(request.url);

    if (!filePath) {
      response.writeHead(403, getDevResponseHeaders(request));
      response.end('Forbidden');
      return;
    }

    if (!existsSync(filePath) || !statSync(filePath).isFile()) {
      response.writeHead(404, getDevResponseHeaders(request));
      response.end('Not Found');
      return;
    }

    response.writeHead(200, {
      ...getDevResponseHeaders(request),
      'Content-Type': getContentType(filePath),
    });

    if (request.method === 'HEAD') {
      response.end();
      return;
    }

    createReadStream(filePath).pipe(response);
  });

  const watcher = watch(BUILD_DIRECTORY, (_eventType, fileName) => {
    if (!fileName || String(fileName).endsWith('.map')) return;

    clearTimeout(reloadTimer);

    reloadTimer = setTimeout(() => {
      reloadClients.forEach((client) => {
        client.write('event: change\ndata: update\n\n');
      });
    }, 60);
  });

  server.on('close', () => {
    watcher.close();
  });

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      // eslint-disable-next-line no-console
      console.error(
        `Port ${SERVE_PORT} is already in use. Stop the existing server or run with SERVE_PORT=3010.`
      );
    } else {
      // eslint-disable-next-line no-console
      console.error(error);
    }

    process.exitCode = 1;
  });

  server.listen(SERVE_PORT, SERVE_HOST, () => {
    logServedFiles();

    // eslint-disable-next-line no-console
    console.log(
      `Serving ${BUILD_DIRECTORY} from ${SERVE_ORIGIN} with CORS/PNA headers for Webflow local development.`
    );
  });
}

/**
 * Handles Private Network Access preflight requests from the published Webflow site.
 * @param {import('http').IncomingMessage} request
 * @param {import('http').ServerResponse} response
 */
function handleOptionsRequest(request, response) {
  if (request.headers.origin && !getAllowedOrigin(request.headers.origin)) {
    response.writeHead(403);
    response.end();
    return;
  }

  response.writeHead(204, {
    ...getDevResponseHeaders(request),
    'Access-Control-Max-Age': '600',
  });
  response.end();
}

/**
 * Keeps the existing injected EventSource live reload contract.
 * @param {import('http').IncomingMessage} request
 * @param {import('http').ServerResponse} response
 * @param {Set<import('http').ServerResponse>} reloadClients
 */
function handleLiveReloadRequest(request, response, reloadClients) {
  response.writeHead(200, {
    ...getDevResponseHeaders(request),
    'Content-Type': 'text/event-stream',
    Connection: 'keep-alive',
  });
  response.write('retry: 1000\n\n');

  reloadClients.add(response);

  request.on('close', () => {
    reloadClients.delete(response);
  });
}

/**
 * @param {import('http').IncomingMessage} request
 * @returns {Record<string, string>}
 */
function getDevResponseHeaders(request) {
  const headers = {
    'Cache-Control': 'no-store',
    Vary: 'Origin, Access-Control-Request-Private-Network',
  };

  const allowedOrigin = getAllowedOrigin(request.headers.origin);

  if (allowedOrigin) {
    headers['Access-Control-Allow-Origin'] = allowedOrigin;
    headers['Access-Control-Allow-Methods'] = 'GET, HEAD, OPTIONS';
    headers['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Accept';
    headers['Access-Control-Allow-Private-Network'] = 'true';
  }

  return headers;
}

/**
 * @param {string | string[] | undefined} origin
 * @returns {string | null}
 */
function getAllowedOrigin(origin) {
  if (Array.isArray(origin)) return null;
  if (!origin) return '*';
  if (process.env.TSA_DEV_ALLOW_ALL_ORIGINS === 'true') return origin;
  if (isWebflowPreviewOrigin(origin)) return origin;

  return DEV_ALLOWED_ORIGINS.has(origin) ? origin : null;
}

/**
 * @param {string} origin
 * @returns {boolean}
 */
function isWebflowPreviewOrigin(origin) {
  try {
    const url = new URL(origin);

    return url.protocol === 'https:' && url.hostname.endsWith('.webflow.io');
  } catch {
    return false;
  }
}

/**
 * @param {string | undefined} rawUrl
 * @returns {string | null}
 */
function getServedFilePath(rawUrl) {
  const requestPath = getRequestPath(rawUrl);

  if (!requestPath || requestPath === '/') return null;

  const root = resolve(BUILD_DIRECTORY);
  const relativePath = normalize(requestPath).replace(/^[/\\]+/, '');
  const filePath = resolve(root, relativePath);

  if (!filePath.startsWith(root + sep)) return null;

  return filePath;
}

/**
 * @param {string | undefined} rawUrl
 * @returns {string | null}
 */
function getRequestPath(rawUrl) {
  try {
    return decodeURIComponent(new URL(rawUrl || '/', SERVE_ORIGIN).pathname);
  } catch {
    return null;
  }
}

/**
 * @param {string} filePath
 * @returns {string}
 */
function getContentType(filePath) {
  switch (extname(filePath)) {
    case '.css':
      return 'text/css; charset=utf-8';
    case '.js':
      return 'text/javascript; charset=utf-8';
    case '.map':
      return 'application/json; charset=utf-8';
    default:
      return 'application/octet-stream';
  }
}

/**
 * Logs information about the files that are being served during local development.
 */
function logServedFiles() {
  /**
   * Recursively gets all files in a directory.
   * @param {string} dirPath
   * @returns {string[]} An array of file paths.
   */
  const getFiles = (dirPath) => {
    const files = readdirSync(dirPath, { withFileTypes: true }).map((dirent) => {
      const path = join(dirPath, dirent.name);
      return dirent.isDirectory() ? getFiles(path) : path;
    });

    return files.flat();
  };

  const files = getFiles(BUILD_DIRECTORY);

  const filesInfo = files
    .map((file) => {
      if (file.endsWith('.map')) return;

      // Normalize path and create file location
      const paths = file.split(sep);
      paths[0] = SERVE_ORIGIN;

      const location = paths.join('/');

      // Create import suggestion
      const tag = location.endsWith('.css')
        ? `<link href="${location}" rel="stylesheet" type="text/css"/>`
        : `<script defer src="${location}"></script>`;

      return {
        'File Location': location,
        'Import Suggestion': tag,
      };
    })
    .filter(Boolean);

  // eslint-disable-next-line no-console
  console.table(filesInfo);
}
