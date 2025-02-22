import { resolve } from 'node:path';

export default (() => {
  const packageName = 'bytes';

  return {
    '**/*.{cjs,js,json,mjs,ts}': (filenames) => [
      `sh -c 'pnpm -F @agoralabs-sh/${packageName} run generate:index && git add ${resolve(process.cwd(), 'packages', packageName, 'src', 'index.ts')}'`,
      `prettier --write ${filenames.join(' ')}`, // exclude this file
    ],
  };
})();
