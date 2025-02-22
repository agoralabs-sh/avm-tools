import { resolve } from 'node:path';

// configs
// import packageJSON from './package.json';

export default (() => {
  const packageName = 'uuid';

  return {
    '**/*.{cjs,js,json,mjs,ts}': (filenames) => [
      `sh -c 'pnpm -F @agoralabs-sh/${packageName} run generate:index && git add ${resolve(__dirname, 'src', 'index.ts')}'`,
      `prettier --write ${filenames.join(' ')}`,
    ],
  };
})();
