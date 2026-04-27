import type { UserConfig } from "vitepress";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

const config: UserConfig = {
  title: "@ldkj/web-ui",
  description: "shadcn-ui style component library based on React + VitePress",
  themeConfig: {
    nav: [
      { text: "指南", link: "/" },
      { text: "组件", link: "/components/layout/box" },
    ],
    sidebar: [
      {
        text: "通用",
        items: [{ text: "SX 样式系统", link: "/general/sx" }],
      },
      {
        text: "组件",
        items: [
          {
            text: "布局",
            items: [
              { text: "Box", link: "/components/layout/box" },
              { text: "Divider", link: "/components/layout/divider" },
              { text: "Flex", link: "/components/layout/flex" },
              { text: "Grid", link: "/components/layout/grid" },
              { text: "SafeArea", link: "/components/layout/safe-area" },
            ],
          },
          {
            text: "交互",
            items: [
              { text: "Button", link: "/components/interact/button" },
              { text: "GhostButton", link: "/components/interact/ghost-button" },
            ],
          },
          {
            text: "数据展示",
            items: [
              { text: "Card", link: "/components/data-display/card" },
              { text: "Chip", link: "/components/data-display/chip" },
              { text: "QRCode", link: "/components/data-display/qrcode" },
            ],
          },
        ],
      },
      {
        text: "工具",
        items: [
          // { text: "Utils", link: "/lib/utils" },
          // { text: "Theme", link: "/lib/theme" },
        ],
      },
      {
        text: "版本日志",
        items: [
          { text: "日志索引", link: "/devlog/" },
          { text: "Next", link: "/devlog/next" },
          { text: "v0.3.0", link: "/devlog/v0.3.0" },
          { text: "v0.2.2", link: "/devlog/v0.2.2" },
          { text: "v0.2.1", link: "/devlog/v0.2.1" },
          { text: "v0.2.0", link: "/devlog/v0.2.0" },
          { text: "v0.1.0", link: "/devlog/v0.1.0" },
        ],
      },
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/ldkj/web-ui" }],
  },
  vite: {
    plugins: [react() as any],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("../../src", import.meta.url)),
      },
    },
  },
};

export default config;
