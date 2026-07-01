import type { UserConfig } from "vitepress";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { OramaPlugin } from "@orama/plugin-vitepress";
import { fileURLToPath } from "node:url";
import packageJson from "../../package.json";

const base = process.env.VITEPRESS_BASE ?? "/";
const isProd = process.env.NODE_ENV === "production";

const config: UserConfig = {
  base: base,
  title: "@ldkj/web-ui",
  description: "shadcn-ui style component library based on React + VitePress",
  appearance: false,
  themeConfig: {
    nav: [
      { text: "指南", link: "/" },
      { text: "组件", link: "/components/layout/box" },
      {
        text: `v${packageJson.version}`,
        items: [
          // { text: "v1", link: "/docs/v1" },
          { text: "版本日志", link: "/devlog" },
        ],
      },
    ],
    sidebar: [
      {
        text: "通用",
        items: [
          { text: "主题定制", link: "/general/theme" },
          { text: "SX 样式系统", link: "/general/sx" },
        ],
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
              { text: "Header", link: "/components/layout/header" },
              { text: "Space", link: "/components/layout/space" },
              { text: "Row / Col", link: "/components/layout/row-col" },
              { text: "SafeArea", link: "/components/layout/safe-area" },
              { text: "Splitter", link: "/components/layout/splitter" },
              { text: "Typography", link: "/components/layout/typography" },
            ],
          },
          {
            text: "交互",
            items: [
              { text: "Button", link: "/components/interact/button" },
              {
                text: "GhostButton",
                link: "/components/interact/ghost-button",
              },
              {
                text: "GhostButtonGroup",
                link: "/components/interact/ghost-button-group",
              },
              { text: "Dialog", link: "/components/interact/dialog" },
              { text: "Modal", link: "/components/interact/modal" },
              { text: "Popover", link: "/components/interact/popover" },
              { text: "Tooltip", link: "/components/interact/tooltip" },
              { text: "Toast", link: "/components/interact/toast" },
              {
                text: "Notification",
                link: "/components/interact/notification",
              },
              { text: "Spin", link: "/components/interact/spin" },
              { text: "Loading", link: "/components/interact/loading" },
              { text: "Drawer", link: "/components/interact/drawer" },
              { text: "Alert", link: "/components/interact/alert" },
              { text: "Progress", link: "/components/interact/progress" },
            ],
          },
          {
            text: "表单与输入",
            items: [
              { text: "Checkbox", link: "/components/form/checkbox" },
              {
                text: "CheckboxGroup",
                link: "/components/form/checkbox-group",
              },
              { text: "Input", link: "/components/form/input" },
              { text: "InputNumber", link: "/components/form/input-number" },
              { text: "InputOPT", link: "/components/form/input-opt" },
              { text: "AutoComplete", link: "/components/form/auto-complete" },
              { text: "Label", link: "/components/form/label" },
              { text: "Radio", link: "/components/form/radio" },
              { text: "Rate", link: "/components/form/rate" },
              { text: "Cascader", link: "/components/form/cascader" },
              { text: "Slider", link: "/components/form/slider" },
              { text: "Required", link: "/components/form/required" },
              { text: "Form", link: "/components/form/form" },
              { text: "Uploader", link: "/components/form/uploader" },
              { text: "Select", link: "/components/form/select" },
              { text: "Switch", link: "/components/form/switch" },
            ],
          },
          {
            text: "移动端",
            items: [
              {
                text: "MobileSelect",
                link: "/components/mobile/mobile-select",
              },
              {
                text: "MobileCascader",
                link: "/components/mobile/mobile-cascader",
              },
              {
                text: "MobileStepper",
                link: "/components/mobile/mobile-stepper",
              },
              {
                text: "MobilePage",
                link: "/components/mobile/mobile-page",
              },
            ],
          },
          {
            text: "场景组件",
            items: [
              {
                text: "RacingChips",
                link: "/components/scenario/racing-chips",
              },
            ],
          },
          {
            text: "数据展示",
            items: [
              { text: "Avatar", link: "/components/data-display/avatar" },
              { text: "Card", link: "/components/data-display/card" },
              { text: "Chip", link: "/components/data-display/chip" },
              { text: "Icon", link: "/components/data-display/icon" },
              { text: "Badge", link: "/components/data-display/badge" },
              { text: "List", link: "/components/data-display/list" },
              { text: "Collapse", link: "/components/data-display/collapse" },
              { text: "Empty", link: "/components/data-display/empty" },
              { text: "Image", link: "/components/data-display/image" },
              { text: "QRCode", link: "/components/data-display/qrcode" },
              { text: "Skeleton", link: "/components/data-display/skeleton" },
              { text: "Table", link: "/components/data-display/table" },
            ],
          },
          {
            text: "导航",
            items: [
              {
                text: "Anchor",
                link: "/components/navigation/anchor",
              },
              {
                text: "Breadcrumb",
                link: "/components/navigation/breadcrumb",
              },
              {
                text: "Menu",
                link: "/components/navigation/menu",
              },
              {
                text: "Navigator",
                link: "/components/navigation/navigator",
              },
              {
                text: "Pagination",
                link: "/components/navigation/pagination",
              },
              {
                text: "Stepper",
                link: "/components/navigation/stepper",
              },
              {
                text: "Timeline",
                link: "/components/navigation/timeline",
              },
              {
                text: "Tabs",
                link: "/components/navigation/tabs",
              },
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
          ...(!isProd ? [{ text: "Next", link: "/devlog/next" }] : []),
          // 只陈列最近的 5 个版本
          { text: "v1.7.0", link: "/devlog/v1.7.0" },
          { text: "v1.6.0", link: "/devlog/v1.6.0" },
          { text: "v1.5.0", link: "/devlog/v1.5.0" },
          { text: "v1.4.0", link: "/devlog/v1.4.0" },
          { text: "v1.3.0", link: "/devlog/v1.3.0" },
        ],
      },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/Evanpatchouli/ldkj-web-ui" },
    ],
  },
  vite: {
    plugins: [
      react() as any,
      svgr() as any,
      OramaPlugin({
        analytics: {
          enabled: false,
          apiKey: "",
          indexId: "",
        },
      }) as any,
    ],
    vue: {
      template: {
        compilerOptions: {
          isCustomElement: (tag: string) => tag === "orama-searchbox",
        },
      },
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("../../src", import.meta.url)),
        "@ldkj/web-ui": fileURLToPath(
          new URL("../../src/index.ts", import.meta.url),
        ),
      },
    },
    server: {
      host: "0.0.0.0",
    },
  } as any,
};

export default config;
