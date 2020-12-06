import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: {
    file: 'wwwroot/blazor-intersection-observer.js',
    format: 'es',
    sourcemap: false,
  },
  plugins: [typescript({
    sourceMap: false,
  })],
};
