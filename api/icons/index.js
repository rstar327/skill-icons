// Vercel API route for /icons endpoint
const { generateSvg, parseShortNames, iconNameList, ICONS_PER_LINE } = require('../../lib/icons');

module.exports = function handler(req, res) {
  try {
    const { query } = req;
    const iconParam = query.i || query.icons;
    
    if (!iconParam) {
      res.status(400).send("You didn't specify any icons!");
      return;
    }
    
    const theme = query.t || query.theme;
    if (theme && theme !== 'dark' && theme !== 'light') {
      res.status(400).send('Theme must be either "light" or "dark"');
      return;
    }
    
    const perLine = parseInt(query.perline) || ICONS_PER_LINE;
    if (isNaN(perLine) || perLine < 1 || perLine > 50) {
      res.status(400).send('Icons per line must be a number between 1 and 50');
      return;
    }

    let iconShortNames = [];
    if (iconParam === 'all') iconShortNames = iconNameList;
    else iconShortNames = iconParam.split(',');

    const iconNames = parseShortNames(iconShortNames, theme || undefined);
    if (!iconNames) {
      res.status(400).send("You didn't format the icons param correctly!");
      return;
    }

    const svg = generateSvg(iconNames, perLine);

    res.setHeader('Content-Type', 'image/svg+xml');
    res.status(200).send(svg);
  } catch (err) {
    res.status(500).send(err.stack);
  }
};

