export const metadata = {
  title: 'Skill Icons API',
  description: 'Generate dynamic SVG skill icons for your GitHub profile or resume!',
};

/**
 * Render the Skill Icons API documentation page.
 *
 * Displays a static, styled overview of the API including available endpoints
 * (GET /icons, GET /api/icons, GET /api/svgs), query parameter descriptions,
 * example requests, and a quick-test image demonstrating an icons request.
 * The component contains only presentational JSX and requires no props.
 *
 * @returns {JSX.Element} The rendered documentation page JSX.
 */
export default function Home() {
  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem',
      lineHeight: '1.6',
      color: '#333',
    }}>
      <h1 style={{ color: '#2563eb' }}>🎨 Skill Icons API</h1>
      <p>Generate dynamic SVG skill icons for your GitHub profile or resume!</p>
      
      <h2>Available Endpoints</h2>
      
      <div style={{
        background: '#f9fafb',
        padding: '1rem',
        margin: '1rem 0',
        borderLeft: '4px solid #2563eb',
        borderRadius: '4px',
      }}>
        <h3><code>GET /icons</code></h3>
        <p>Generate a combined SVG with multiple skill icons.</p>
        <p><strong>Query Parameters:</strong></p>
        <ul>
          <li><code>i</code> or <code>icons</code> - Comma-separated list of icon names (required)</li>
          <li><code>t</code> or <code>theme</code> - Theme: &quot;light&quot; or &quot;dark&quot; (optional, default: &quot;dark&quot;)</li>
          <li><code>perline</code> - Number of icons per line (optional, default: 15)</li>
        </ul>
        <div style={{ color: '#059669', marginTop: '0.5rem' }}>
          <strong>Example:</strong> <code>/icons?i=js,html,css,react&theme=dark&perline=4</code>
        </div>
      </div>
      
      <div style={{
        background: '#f9fafb',
        padding: '1rem',
        margin: '1rem 0',
        borderLeft: '4px solid #2563eb',
        borderRadius: '4px',
      }}>
        <h3><code>GET /api/icons</code></h3>
        <p>Get a JSON array of all available icon names.</p>
        <div style={{ color: '#059669', marginTop: '0.5rem' }}>
          <strong>Example:</strong> <code>/api/icons</code>
        </div>
      </div>
      
      <div style={{
        background: '#f9fafb',
        padding: '1rem',
        margin: '1rem 0',
        borderLeft: '4px solid #2563eb',
        borderRadius: '4px',
      }}>
        <h3><code>GET /api/svgs</code></h3>
        <p>Get all SVG data as JSON.</p>
        <div style={{ color: '#059669', marginTop: '0.5rem' }}>
          <strong>Example:</strong> <code>/api/svgs</code>
        </div>
      </div>
      
      <h2>Quick Test</h2>
      <p>Try it out:</p>
      <img 
        src="/icons?i=js,html,css,react,nodejs" 
        alt="Example icons" 
        style={{ maxWidth: '100%' }} 
      />
    </div>
  );
}
