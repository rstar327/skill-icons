// Shared logic for Next.js
const icons = require('../dist/icons.json');
const iconNameList = [...new Set(Object.keys(icons).map(i => i.split('-')[0]))];
const shortNames = {
  js: 'javascript',
  ts: 'typescript',
  py: 'python',
  tailwind: 'tailwindcss',
  vue: 'vuejs',
  nuxt: 'nuxtjs',
  go: 'golang',
  cf: 'cloudflare',
  wasm: 'webassembly',
  postgres: 'postgresql',
  k8s: 'kubernetes',
  next: 'nextjs',
  mongo: 'mongodb',
  md: 'markdown',
  ps: 'photoshop',
  ai: 'illustrator',
  pr: 'premiere',
  ae: 'aftereffects',
  scss: 'sass',
  sc: 'scala',
  net: 'dotnet',
  gatsbyjs: 'gatsby',
  gql: 'graphql',
  vlang: 'v',
  amazonwebservices: 'aws',
  bots: 'discordbots',
  express: 'expressjs',
  googlecloud: 'gcp',
  mui: 'materialui',
  windi: 'windicss',
  unreal: 'unrealengine',
  nest: 'nestjs',
  ktorio: 'ktor',
  pwsh: 'powershell',
  au: 'audition',
  rollup: 'rollupjs',
  rxjs: 'reactivex',
  rxjava: 'reactivex',
  ghactions: 'githubactions',
  sklearn: 'scikitlearn',
  claude: 'claude_ai',
  gpt: 'chatgpt',
};
const themedIcons = [
  ...Object.keys(icons)
    .filter(i => i.includes('-light') || i.includes('-dark'))
    .map(i => i.split('-')[0]),
];

const ICONS_PER_LINE = 15;
const ONE_ICON = 48;
const SCALE = ONE_ICON / (300 - 44);

/**
 * Produce an SVG string that arranges a list of icons into a grid.
 *
 * Maps each name in `iconNames` to its SVG markup, ignores unknown names, and lays out the remaining icons in rows of `perLine`.
 *
 * @param {string[]} iconNames - Array of icon keys to include (unknown keys are ignored).
 * @param {number} perLine - Number of icons per row in the resulting grid.
 * @returns {string} An SVG markup string containing the requested icons arranged in a grid. If no icons are found, returns a minimal empty 48×48 SVG.
 */
function generateSvg(iconNames, perLine) {
  const iconSvgList = iconNames
    .map(i => icons[i])
    .filter(Boolean); // Remove undefined values

  if (iconSvgList.length === 0) {
    return '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>';
  }

  const length = Math.min(perLine * 300, iconNames.length * 300) - 44;
  const height = Math.ceil(iconSvgList.length / perLine) * 300 - 44;
  const scaledHeight = height * SCALE;
  const scaledWidth = length * SCALE;

  return `
  <svg width="${scaledWidth}" height="${scaledHeight}" viewBox="0 0 ${length} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
    ${iconSvgList
      .map(
        (i, index) =>
          `
        <g transform="translate(${(index % perLine) * 300}, ${
            Math.floor(index / perLine) * 300
          })">
          ${i}
        </g>
        `
      )
      .join(' ')}
  </svg>
  `;
}

/**
 * Convert a list of requested icon identifiers into canonical icon names, adding a theme suffix when applicable.
 *
 * @param {string[]} names - Array of icon identifiers; each item may be a canonical base name or a short alias.
 * @param {('dark'|'light')} [theme='dark'] - Theme to append for icons that have themed variants.
 * @returns {string[]} Array of valid canonical icon names. Each name is the resolved base name, suffixed with `-dark` or `-light` when that icon has themed variants. Invalid or unknown identifiers are omitted.
 */
function parseShortNames(names, theme = 'dark') {
  return names
    .map(name => {
      if (iconNameList.includes(name))
        return name + (themedIcons.includes(name) ? `-${theme}` : '');
      else if (name in shortNames)
        return (
          shortNames[name] +
          (themedIcons.includes(shortNames[name]) ? `-${theme}` : '')
        );
      return null; // Explicitly return null for invalid names
    })
    .filter(Boolean); // Remove null/undefined values
}

module.exports = {
  icons,
  iconNameList,
  generateSvg,
  parseShortNames,
  ICONS_PER_LINE,
};


