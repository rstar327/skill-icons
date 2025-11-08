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
    return new NextResponse(err.stack, { status: 500 });
  }
}

/**
 * Responds to CORS preflight requests for the SVGs API.
 *
 * Sets headers allowing any origin, the GET method, and the `Content-Type` request header.
 * @returns {NextResponse} A response with no body and CORS headers permitting any origin, the GET method, and the `Content-Type` header.
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
