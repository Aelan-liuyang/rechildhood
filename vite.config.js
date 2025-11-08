import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default defineConfig(({ command, mode }) => {
  // 判断是否是生产环境
  const isProduction = command === "build";

  // 判断是否部署到 GitHub Pages
  const isGithub = process.env.DEPLOY_TARGET === "github";

  // ✅ 自动选择 base
  // 开发环境 -> "/"
  // 生产环境 + GitHub -> "/rechildhood/"
  // 生产环境 + Cloudflare/OSS -> "./"
  const base = !isProduction ? "/" : isGithub ? "/rechildhood/" : "./";

  return {
    plugins: [vue()],

    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
        "~": resolve(__dirname, "src"),
      },
    },

    // ✅ 基础路径
    base,

    server: {
      host: "0.0.0.0",
      port: 3000,
      open: true,
      cors: true,
      hmr: {
        overlay: true,
      },
    },

    build: {
      outDir: "dist",
      assetsDir: "assets",
      sourcemap: !isProduction,
      minify: isProduction ? "terser" : false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["vue"],
            charts: ["chart.js"],
          },
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split(".");
            const ext = info[info.length - 1];
            if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)$/i.test(assetInfo.name))
              return `media/[name]-[hash][extname]`;
            if (/\.(png|jpe?g|gif|svg)$/i.test(assetInfo.name))
              return `images/[name]-[hash][extname]`;
            if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name))
              return `fonts/[name]-[hash][extname]`;
            return `assets/[name]-[hash][extname]`;
          },
          chunkFileNames: "js/[name]-[hash].js",
          entryFileNames: "js/[name]-[hash].js",
        },
      },
      chunkSizeWarningLimit: 1000,
    },

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/assets/styles/variables.scss";`,
        },
      },
    },

    define: {
      __VUE_OPTIONS_API__: false,
      __VUE_PROD_DEVTOOLS__: false,
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    },

    optimizeDeps: {
      include: ["vue", "chart.js", "chart.js/auto"],
    },

    preview: {
      host: "0.0.0.0",
      port: 4173,
      open: true,
    },
  };
});
