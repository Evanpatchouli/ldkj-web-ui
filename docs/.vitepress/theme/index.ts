import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import { createElement, type ComponentType } from "react";
import { createRoot, type Root } from "react-dom/client";
import { defineComponent, h, onBeforeUnmount, onMounted, ref } from "vue";
import "../../../src/style.css";
import ButtonVariantsDemo from "./components/Button/ButtonVariantsDemo";
import ButtonSizesDemo from "./components/Button/ButtonSizesDemo";
import ButtonBounceDemo from "./components/Button/ButtonBounce";
import ButtonSplashDemo from "./components/Button/ButtonSplash";
import ChipVariantsDemo from "./components/Chip/ChipVariantsDemo";
import ChipOutlineDemo from "./components/Chip/ChipOutlineDemo";
import ChipSizesDemo from "./components/Chip/ChipSizesDemo";

function createReactDemoHost(name: string, DemoComponent: ComponentType) {
  return defineComponent({
    name,
    setup() {
      const mountEl = ref<HTMLElement | null>(null);
      let root: Root | null = null;

      onMounted(() => {
        if (!mountEl.value) return;
        root = createRoot(mountEl.value);
        root.render(createElement(DemoComponent));
      });

      onBeforeUnmount(() => {
        root?.unmount();
      });

      return () => h("div", { ref: mountEl });
    },
  });
}

const theme: Theme = {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component(
      "ButtonVariantsDemo",
      createReactDemoHost("ButtonVariantsDemoHost", ButtonVariantsDemo),
    );
    app.component(
      "ButtonSizesDemo",
      createReactDemoHost("ButtonSizesDemoHost", ButtonSizesDemo),
    );
    app.component(
      "ButtonBounceDemo",
      createReactDemoHost("ButtonBounceDemoHost", ButtonBounceDemo),
    );
    app.component(
      "ButtonSplashDemo",
      createReactDemoHost("ButtonSplashDemoHost", ButtonSplashDemo),
    );
    app.component(
      "ChipVariantsDemo",
      createReactDemoHost("ChipVariantsDemoHost", ChipVariantsDemo),
    );
    app.component(
      "ChipOutlineDemo",
      createReactDemoHost("ChipOutlineDemoHost", ChipOutlineDemo),
    );
    app.component(
      "ChipSizesDemo",
      createReactDemoHost("ChipSizesDemoHost", ChipSizesDemo),
    );
  },
};

export default theme;
