
import path from 'node:path';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'rollup';
import filesize from 'rollup-plugin-filesize';

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

const packageJsonPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), './package.json');
const pkg = JSON.parse(readFileSync(packageJsonPath, { encoding: 'utf-8' }));
const plugins = [json(), resolve(), commonjs(), typescript()];

if (process.env.NODE_ENV === 'production') {
  plugins.push(filesize({ showMinifiedSize: false, showBrotliSize: true }), terser());
}

export default defineConfig({
  input: `src/main.ts`,
  output: [
    { file: pkg.main, name: pkg.name, format: 'umd' },
    { file: pkg.module, format: 'es' },
  ],
  external: [],
  watch: {
    include: 'src/**',
  },
  plugins,
});
