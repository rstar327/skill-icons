import { NextResponse } from 'next/server';
const { icons } = require('../../../lib/icons');

/**
 * Serve the icons dataset as a JSON HTTP response for GET requests.
 *
 * @returns {Response} A response containing the icons data serialized as JSON with CORS and Cache-Control headers. On failure, returns a 500 response whose body contains the error stack.
 */
export async function GET() {
  try {
    return NextResponse.json(icons, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (err) {
    console.error('Error in /api/svgs:', err);
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

