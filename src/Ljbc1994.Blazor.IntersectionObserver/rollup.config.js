import typescript from '@rollup/plugin-typescript';
import { terser } from "rollup-plugin-terser";

export default [
  {
    input: 'src/index.ts',
    output: {
      file: 'wwwroot/blazor-intersection-observer.min.js',
      format: 'es',
      sourcemap: false,
    },
    plugins: [typescript({
      sourceMap: false,
    }), terser()],
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'wwwroot/blazor-intersection-observer.js',
      format: 'es',
      sourcemap: false,
    },
    plugins: [typescript({
      sourceMap: false,
    })],
  }
];
