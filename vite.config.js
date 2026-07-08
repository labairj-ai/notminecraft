import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

const buildTime = new Date().toISOString();

export default defineConfig({
  base: '/notminecraft/',
  define: {
    __BUILD_TIME__: JSON.stringify(buildTime),
  },
  plugins: [
    {
      name: 'stamp-sw',
      // After the build writes all files, overwrite sw.js with the build
      // timestamp baked into the cache name. When users load a new deploy,
      // the browser detects the changed SW file, installs it, and the activate
      // handler deletes every cache whose name doesn't match — giving them a
      // clean slate automatically.
      writeBundle() {
        const src = fs.readFileSync(path.resolve('public/sw.js'), 'utf8');
        const stamped = src.replace(
          "'notminecraft-v1'",
          `'notminecraft-${buildTime}'`
        );
        fs.writeFileSync(path.resolve('dist/sw.js'), stamped);
      },
    },
  ],
});
