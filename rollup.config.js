import typescript from "rollup-plugin-typescript2";
import commonjs from "rollup-plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import resolve from "rollup-plugin-node-resolve";
import url from "rollup-plugin-url";
import svgr from "@svgr/rollup";
import bundleSize from "rollup-plugin-bundle-size";
import { terser } from "rollup-plugin-terser";
import json from "@rollup/plugin-json";

import pkg from "./package.json";

export default {
	input: "src/index.ts",
	output: [
		{
			file: pkg.main,
			format: "cjs",
			exports: "named",
			sourcemap: true,
		},
		{
			file: pkg.module,
			format: "es",
			exports: "named",
			sourcemap: true,
		},
	],
	plugins: [
		terser(),
		json(),
		bundleSize(),
		external(),
		postcss({
			modules: false,
			sourcemap: false,
		}),
		url(),
		svgr(),
		resolve(),
		typescript({
			rollupCommonJSResolveHack: true,
			clean: true,
		}),
		commonjs({
			namedExports: {
				"react-table": ["useTable", "useResizeColumns", "useFlexLayout", "useSortBy"],
			},
		}),
	],
};
