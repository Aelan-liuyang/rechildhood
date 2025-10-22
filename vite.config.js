import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const isProduction = command === "build";

  return {
    plugins: [vue()],

    // 路径别名
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
        "~": resolve(__dirname, "src"),
      },
    },

    // 基础路径配置
    base: isProduction ? "/rechildhood/" : "/",

    // 开发服务器配置
    server: {
      host: "0.0.0.0",
      port: 3000,
      open: true, // 自动打开浏览器
      cors: true, // 启用CORS
      hmr: {
        overlay: true, // 显示错误覆盖层
      },
    },

    // 构建配置
    build: {
      outDir: "dist",
      assetsDir: "assets",
      sourcemap: !isProduction, // 生产环境不生成sourcemap
      minify: isProduction ? "terser" : false,
      rollupOptions: {
        output: {
          // 代码分割
          manualChunks: {
            vendor: ["vue"],
            charts: ["chart.js"],
          },
          // 资源文件命名
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split(".");
            const ext = info[info.length - 1];
            if (
              /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(assetInfo.name)
            ) {
              return `media/[name]-[hash][extname]`;
            }
            if (/\.(png|jpe?g|gif|svg)(\?.*)?$/i.test(assetInfo.name)) {
              return `images/[name]-[hash][extname]`;
            }
            if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(assetInfo.name)) {
              return `fonts/[name]-[hash][extname]`;
            }
            return `assets/[name]-[hash][extname]`;
          },
          chunkFileNames: "js/[name]-[hash].js",
          entryFileNames: "js/[name]-[hash].js",
        },
      },
      // 构建大小警告阈值
      chunkSizeWarningLimit: 1000,
    },

    // 预处理器配置
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/assets/styles/variables.scss";`,
        },
      },
    },

    // 环境变量定义
    define: {
      __VUE_OPTIONS_API__: false,
      __VUE_PROD_DEVTOOLS__: false,
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    },

    // 优化依赖
    optimizeDeps: {
      include: ["vue", "chart.js", "chart.js/auto"],
      exclude: [],
    },

    // 预览服务器配置
    preview: {
      host: "0.0.0.0",
      port: 4173,
      open: true,
    },
  };
});
