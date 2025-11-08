// Vercel API route for /api/svgs endpoint
const { icons } = require('../../lib/icons');

module.exports = function handler(req, res) {
  try {
    res.setHeader('content-type', 'application/json;charset=UTF-8');
    res.status(200).json(icons);
  } catch (err) {
    res.status(500).send(err.stack);
  }
};

