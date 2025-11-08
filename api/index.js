// Vercel API route for root path
const { iconNameList } = require('../lib/icons');

module.exports = (req, res) => {
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
  
  res.setHeader('Content-Type', 'text/html;charset=UTF-8');
  res.status(200).send(html);
};

