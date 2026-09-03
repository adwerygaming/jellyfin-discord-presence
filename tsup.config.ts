import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/**/*.ts', "!src/**/node_modules/**"],
    outDir: 'dist',
    format: ['esm'],
    target: 'es2020',
    sourcemap: false,
    dts: false,
    clean: true,
    bundle: false,
    splitting: false
});
