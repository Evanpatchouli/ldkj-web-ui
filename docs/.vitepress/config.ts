import type { UserConfig } from "vitepress";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

const config: UserConfig = {
  title: "@ldkj/web-ui",
  description: "shadcn-ui style component library based on React + VitePress",
  themeConfig: {
    nav: [
      { text: "Guide", link: "/" },
      { text: "Components", link: "/components/button" },
    ],
    sidebar: [
      {
        text: "Components",
        items: [
          { text: "Button", link: "/components/button" },
          { text: "Chip", link: "/components/chip" },
          { text: "Divider", link: "/components/divider" },
        ],
      },
      {
        text: "Lib",
        items: [],
      }
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
