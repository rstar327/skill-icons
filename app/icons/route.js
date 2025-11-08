import { NextResponse } from 'next/server';
const { generateSvg, parseShortNames, iconNameList, ICONS_PER_LINE } = require('../../lib/icons');

/**
 * Generate an SVG containing the requested icons based on URL query parameters.
 *
 * Parses query parameters from `request.url` to determine which icons to include (`i` or `icons`),
 * the theme (`t` or `theme`, must be "light" or "dark" if provided), and how many icons per line
 * (`perline`, integer between 1 and 50). Validates inputs, resolves short names to icon identifiers,
 * generates the combined SVG, and returns it with appropriate CORS and caching headers.
 *
 * @param {Request} request - Incoming request whose URL query parameters specify icons and options.
 *   Recognized query parameters:
 *     - `i` or `icons`: comma-separated icon short names or `all`.
 *     - `t` or `theme`: optional; either `"light"` or `"dark"`.
 *     - `perline`: optional; integer between 1 and 50 controlling icons per row.
 * @returns {NextResponse} An HTTP response:
 *   - On success: a response with `Content-Type: image/svg+xml` containing the generated SVG.
 *   - On client error: a 400 response with a short message describing the validation failure.
 *   - On server error: a 500 response containing the error stack.
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const iconParam = searchParams.get('i') || searchParams.get('icons');
    
    if (!iconParam) {
      return new NextResponse("You didn't specify any icons!", { status: 400 });
    }
    
    const theme = searchParams.get('t') || searchParams.get('theme');
    if (theme && theme !== 'dark' && theme !== 'light') {
      return new NextResponse('Theme must be either "light" or "dark"', { status: 400 });
    }
    
    const perLine = parseInt(searchParams.get('perline')) || ICONS_PER_LINE;
    if (isNaN(perLine) || perLine < 1 || perLine > 50) {
      return new NextResponse('Icons per line must be a number between 1 and 50', { status: 400 });
    }

    let iconShortNames = [];
    if (iconParam === 'all') iconShortNames = iconNameList;
    else iconShortNames = iconParam.split(',');

    const iconNames = parseShortNames(iconShortNames, theme || undefined);
    if (!iconNames || iconNames.some(name => !name)) {
      return new NextResponse("You didn't format the icons param correctly!", { status: 400 });
    }

    const svg = generateSvg(iconNames.filter(Boolean), perLine);

    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (err) {
    console.error('Error in GET /icons:', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
