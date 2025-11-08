import { NextResponse } from 'next/server';
const { iconNameList } = require('../../../lib/icons');

/**
 * Serve the list of available icon names as JSON for GET requests.
 *
 * Responds with the icon name array and CORS + caching headers. If an error occurs,
 * responds with status 500 and the error stack as the body.
 * @returns {NextResponse} A response containing the JSON array of icon names; on error a 500 response with the error stack.
 */
export async function GET() {
  try {
    return NextResponse.json(iconNameList, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (err) {
    console.error('Error in GET /api/icons:', err);
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
