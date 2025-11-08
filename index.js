const icons = require('./dist/icons.json');
const iconNameList = [...new Set(Object.keys(icons).map(i => i.split('-')[0]))];
const shortNames = {
  js: 'javascript',
  ts: 'typescript',
  py: 'python',
  tailwind: 'tailwindcss',
  vue: 'vuejs',
  nuxt: 'nuxtjs',
  go: 'golang',
  cf: 'cloudflare',
  wasm: 'webassembly',
  postgres: 'postgresql',
  k8s: 'kubernetes',
  next: 'nextjs',
  mongo: 'mongodb',
  md: 'markdown',
  ps: 'photoshop',
  ai: 'illustrator',
  pr: 'premiere',
  ae: 'aftereffects',
  scss: 'sass',
  sc: 'scala',
  net: 'dotnet',
  gatsbyjs: 'gatsby',
  gql: 'graphql',
  vlang: 'v',
  amazonwebservices: 'aws',
  bots: 'discordbots',
  express: 'expressjs',
  googlecloud: 'gcp',
  mui: 'materialui',
  windi: 'windicss',
  unreal: 'unrealengine',
  nest: 'nestjs',
  ktorio: 'ktor',
  pwsh: 'powershell',
  au: 'audition',
  rollup: 'rollupjs',
  rxjs: 'reactivex',
  rxjava: 'reactivex',
  ghactions: 'githubactions',
  sklearn: 'scikitlearn',
};
const themedIcons = [
  ...Object.keys(icons)
    .filter(i => i.includes('-light') || i.includes('-dark'))
    .map(i => i.split('-')[0]),
];

const ICONS_PER_LINE = 15;
const ONE_ICON = 48;
const SCALE = ONE_ICON / (300 - 44);

function generateSvg(iconNames, perLine) {
  const iconSvgList = iconNames.map(i => icons[i]);

  const length = Math.min(perLine * 300, iconNames.length * 300) - 44;
  const height = Math.ceil(iconSvgList.length / perLine) * 300 - 44;
  const scaledHeight = height * SCALE;
  const scaledWidth = length * SCALE;

  return `
  <svg width="${scaledWidth}" height="${scaledHeight}" viewBox="0 0 ${length} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
    ${iconSvgList
      .map(
        (i, index) =>
          `
        <g transform="translate(${(index % perLine) * 300}, ${
            Math.floor(index / perLine) * 300
          })">
          ${i}
        </g>
        `
      )
      .join(' ')}
  </svg>
  `;
}

function parseShortNames(names, theme = 'dark') {
  return names.map(name => {
    if (iconNameList.includes(name))
      return name + (themedIcons.includes(name) ? `-${theme}` : '');
    else if (name in shortNames)
      return (
        shortNames[name] +
        (themedIcons.includes(shortNames[name]) ? `-${theme}` : '')
      );
  });
}

async function handleRequest(request) {
  const { pathname, searchParams } = new URL(request.url);

  const path = pathname.replace(/^\/|\/$/g, '');

  if (path === 'icons') {
    const iconParam = searchParams.get('i') || searchParams.get('icons');
    if (!iconParam)
      return new Response("You didn't specify any icons!", { status: 400 });
    const theme = searchParams.get('t') || searchParams.get('theme');
    if (theme && theme !== 'dark' && theme !== 'light')
      return new Response('Theme must be either "light" or "dark"', {
        status: 400,
      });
    const perLine = searchParams.get('perline') || ICONS_PER_LINE;
    if (isNaN(perLine) || perLine < -1 || perLine > 50)
      return new Response('Icons per line must be a number between 1 and 50', {
        status: 400,
      });

    let iconShortNames = [];
    if (iconParam === 'all') iconShortNames = iconNameList;
    else iconShortNames = iconParam.split(',');

    const iconNames = parseShortNames(iconShortNames, theme || undefined);
    if (!iconNames)
      return new Response("You didn't format the icons param correctly!", {
        status: 400,
      });

    const svg = generateSvg(iconNames, perLine);

    return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml' } });
  } else if (path === 'api/icons') {
    return new Response(JSON.stringify(iconNameList), {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    });
  } else if (path === 'api/svgs') {
    return new Response(JSON.stringify(icons), {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    });
  } else if (path === '') {
    // Root path - show a simple HTML landing page
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Skill Icons API</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
      line-height: 1.6;
      color: #333;
    }
    h1 { color: #2563eb; }
    code {
      background: #f3f4f6;
      padding: 0.2em 0.4em;
      border-radius: 3px;
      font-family: 'Courier New', monospace;
    }
    .endpoint {
      background: #f9fafb;
      padding: 1rem;
      margin: 1rem 0;
      border-left: 4px solid #2563eb;
      border-radius: 4px;
    }
    .example {
      color: #059669;
      margin-top: 0.5rem;
    }
  </style>
</head>
<body>
  <h1>🎨 Skill Icons API</h1>
  <p>Generate dynamic SVG skill icons for your GitHub profile or resume!</p>
  
  <h2>Available Endpoints</h2>
  
  <div class="endpoint">
    <h3><code>GET /icons</code></h3>
    <p>Generate a combined SVG with multiple skill icons.</p>
    <p><strong>Query Parameters:</strong></p>
    <ul>
      <li><code>i</code> or <code>icons</code> - Comma-separated list of icon names (required)</li>
      <li><code>t</code> or <code>theme</code> - Theme: "light" or "dark" (optional, default: "dark")</li>
      <li><code>perline</code> - Number of icons per line (optional, default: 15)</li>
    </ul>
    <div class="example">
      <strong>Example:</strong> <code>/icons?i=js,html,css,react&theme=dark&perline=4</code>
    </div>
  </div>
  
  <div class="endpoint">
    <h3><code>GET /api/icons</code></h3>
    <p>Get a JSON array of all available icon names.</p>
    <div class="example">
      <strong>Example:</strong> <code>/api/icons</code>
    </div>
  </div>
  
  <div class="endpoint">
    <h3><code>GET /api/svgs</code></h3>
    <p>Get all SVG data as JSON.</p>
    <div class="example">
      <strong>Example:</strong> <code>/api/svgs</code>
    </div>
  </div>
  
  <h2>Quick Test</h2>
  <p>Try it out:</p>
  <img src="/icons?i=js,html,css,react,nodejs" alt="Example icons" style="max-width: 100%;" />
</body>
</html>`;
    return new Response(html, {
      headers: {
        'content-type': 'text/html;charset=UTF-8',
      },
    });
  } else {
    // Return 404 for unmatched paths instead of calling fetch(request) which causes infinite recursion
    return new Response('Not Found. Available endpoints: /icons, /api/icons, /api/svgs', {
      status: 404,
      headers: {
        'content-type': 'text/plain',
      },
    });
  }
}

addEventListener('fetch', event => {
  event.respondWith(
    handleRequest(event.request).catch(
      err => new Response(err.stack, { status: 500 })
    )
  );
});
