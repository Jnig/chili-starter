#!/usr/bin/env node
const { build } = require('estrella');
build({
  entry: 'src/main.ts',
  outfile: 'dist/main.js',
  bundle: true,
  platform: 'node',
  sourcemap: true,
  minify: false,
  external: ['fastify-swagger']
  // pass any options to esbuild here...
});
