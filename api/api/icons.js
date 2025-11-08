// Vercel API route for /api/icons endpoint
const { iconNameList } = require('../../lib/icons');

module.exports = (req, res) => {
  try {
    res.setHeader('content-type', 'application/json;charset=UTF-8');
    res.status(200).json(iconNameList);
  } catch (err) {
    res.status(500).send(err.stack);
  }
};

