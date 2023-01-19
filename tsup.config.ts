import { defineConfig, Options } from "tsup";

export default defineConfig((options: Options) => {
  return {
    entry: ["src/index.ts"],
    outDir: "lib",
    format: ["esm"],
    dts: false,
    minify: !options.watch,
    watch: options.watch,
    clean: true,
    platform: "node",
  };
});
