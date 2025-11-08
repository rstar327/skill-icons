import { NextResponse } from 'next/server';
import { generateSvg, parseShortNames, iconNameList, ICONS_PER_LINE } from '../../lib/icons';
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

