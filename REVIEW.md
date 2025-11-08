# Project Review: skill-icons

## 📋 Project Overview

This is a **Cloudflare Workers** project that generates dynamic SVG skill icons. It:
- Reads SVG icon files from the `icons/` directory
- Bundles them into a JSON file during build
- Serves them via a Cloudflare Worker that generates combined SVG images
- Supports theming (light/dark), custom icon lists, and per-line configuration

## 🏗️ Project Structure

```
skill-icons/
├── icons/          # 399 SVG icon files
├── worker/         # Worker script (bundled by Wrangler)
├── dist/           # Build output (icons.json + worker.js)
├── index.js        # Main worker code (Cloudflare Workers API)
├── build.js        # Build script that creates icons.json
├── wrangler.toml   # Cloudflare Workers configuration
└── package.json    # Dependencies and scripts
```

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v16+ recommended based on GitHub Actions)
- npm or yarn

### Steps

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Build the icons JSON file:**
   ```bash
   npm run build
   ```
   This runs `build.js` which:
   - Reads all SVG files from `./icons/`
   - Creates `dist/icons.json` with icon name → SVG content mapping

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   This will:
   - Run `build.js` to generate `dist/icons.json`
   - Start Miniflare (local Cloudflare Workers runtime) with watch mode
   - The worker will be available at `http://localhost:8787` (default Miniflare port)

4. **Test the endpoints:**
   - **Generate icons:** `http://localhost:8787/icons?i=js,html,css`
   - **List all icons:** `http://localhost:8787/api/icons`
   - **Get all SVGs:** `http://localhost:8787/api/svgs`

### Available Scripts

- `npm run dev` - Build and start local dev server with watch mode
- `npm run build` - Build icons.json (required before deployment)
- `npm run deploy` - Build and deploy to Cloudflare Workers

## 🚢 Deploying to Vercel

**Yes, you can deploy to Vercel!** However, the project needs adaptation since it's currently designed for Cloudflare Workers.

### Current Architecture (Cloudflare Workers)
- Uses Cloudflare Workers API (`addEventListener('fetch', ...)`)
- Bundled by Wrangler (webpack)
- Runs on Cloudflare's edge network

### Vercel Adaptation Required

Vercel uses **serverless functions** with a different API. Here's what needs to change:

#### Option 1: Convert to Vercel Serverless Functions (Recommended)

1. **Create API routes structure:**
   ```
   api/
   ├── icons/
   │   └── [index].js    # Handle /icons endpoint
   ├── api/
   │   ├── icons.js      # Handle /api/icons
   │   └── svgs.js       # Handle /api/svgs
   ```

2. **Convert the handler:**
   - Replace `addEventListener('fetch', ...)` with standard Node.js/Express-like handler
   - Use Vercel's `req` and `res` objects instead of Cloudflare's `Request`/`Response`

3. **Example conversion:**

   **Current (Cloudflare Workers):**
   ```javascript
   addEventListener('fetch', event => {
     event.respondWith(handleRequest(event.request));
   });
   ```

   **Vercel Serverless Function:**
   ```javascript
   // api/icons/index.js
   const icons = require('../../dist/icons.json');
   // ... rest of the logic from index.js ...
   
   export default function handler(req, res) {
     const { query } = req;
     const iconParam = query.i || query.icons;
     // ... handle request ...
     res.setHeader('Content-Type', 'image/svg+xml');
     res.status(200).send(svg);
   }
   ```

#### Option 2: Keep Cloudflare Workers (Current Setup)

If you want to keep using Cloudflare Workers:
- Continue using `npm run deploy` with Wrangler
- Configure Cloudflare Workers for your domain
- No Vercel deployment needed

### Steps to Deploy to Vercel

**✅ I've already created the Vercel-adapted version for you!**

The project now includes:
- `vercel.json` - Vercel configuration
- `api/icons/index.js` - Main icons endpoint
- `api/api/icons.js` - Icons list endpoint  
- `api/api/svgs.js` - All SVGs endpoint
- `lib/icons.js` - Shared logic (used by both Cloudflare Workers and Vercel)

**To deploy:**

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Build the icons JSON** (required before deployment):
   ```bash
   npm run build
   ```

3. **Deploy to Vercel:**
   ```bash
   vercel
   ```
   Follow the prompts to link your project or create a new one.

4. **For production deployment:**
   ```bash
   vercel --prod
   ```

**Test locally with Vercel:**
```bash
vercel dev
```
This will start a local server that mimics Vercel's serverless functions.

**Endpoints after deployment:**
- `https://your-domain.vercel.app/icons?i=js,html,css` - Generate icons
- `https://your-domain.vercel.app/api/icons` - List all icon names
- `https://your-domain.vercel.app/api/svgs` - Get all SVG data

### Considerations

- **Build step:** Ensure `dist/icons.json` is generated before deployment (add to `vercel.json` build command)
- **File size:** `dist/icons.json` is large (~679KB), ensure it's included in deployment
- **Cold starts:** Vercel serverless functions may have cold starts, but should be minimal for this use case
- **Edge functions:** Vercel also supports Edge Functions (similar to Cloudflare Workers), but requires different API

Would you like me to create the Vercel-adapted version of the code?

