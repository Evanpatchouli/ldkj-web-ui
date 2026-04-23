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
import ButtonRoundedDemo from "./components/Button/ButtonRoundedDemo";
import ChipVariantsDemo from "./components/Chip/ChipVariantsDemo";
import ChipOutlineDemo from "./components/Chip/ChipOutlineDemo";
import ChipSizesDemo from "./components/Chip/ChipSizesDemo";
import ChipRoundedDemo from "./components/Chip/ChipRoundedDemo";
import DividerVariantsDemo from "./components/Divider/DividerVariantsDemo";
import DividerContentDemo from "./components/Divider/DividerContentDemo";
import DividerVerticalDemo from "./components/Divider/DividerVerticalDemo";
import DividerTypeColorDemo from "./components/Divider/DividerTypeColorDemo";
import FlexDirectionDemo from "./components/Flex/FlexDirectionDemo";
import FlexGapWrapDemo from "./components/Flex/FlexGapWrapDemo";
import FlexSizeDemo from "./components/Flex/FlexSizeDemo";
import GridBasicDemo from "./components/Grid/GridBasicDemo";
import GridSpacingDemo from "./components/Grid/GridSpacingDemo";
import GridOffsetDemo from "./components/Grid/GridOffsetDemo";
import GridGrowDemo from "./components/Grid/GridGrowDemo";
import GridColumnsDemo from "./components/Grid/GridColumnsDemo";
import GridDirectionWrapDemo from "./components/Grid/GridDirectionWrapDemo";
import GridNestedDemo from "./components/Grid/GridNestedDemo";
import GridDashboardDemo from "./components/Grid/GridDashboardDemo";
import GridFormDetailDemo from "./components/Grid/GridFormDetailDemo";

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
      "ButtonRoundedDemo",
      createReactDemoHost("ButtonRoundedDemoHost", ButtonRoundedDemo),
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
    app.component(
      "ChipRoundedDemo",
      createReactDemoHost("ChipRoundedDemoHost", ChipRoundedDemo),
    );
    app.component(
      "DividerVariantsDemo",
      createReactDemoHost("DividerVariantsDemoHost", DividerVariantsDemo),
    );
    app.component(
      "DividerContentDemo",
      createReactDemoHost("DividerContentDemoHost", DividerContentDemo),
    );
    app.component(
      "DividerVerticalDemo",
      createReactDemoHost("DividerVerticalDemoHost", DividerVerticalDemo),
    );
    app.component(
      "DividerTypeColorDemo",
      createReactDemoHost("DividerTypeColorDemoHost", DividerTypeColorDemo),
    );
    app.component(
      "FlexDirectionDemo",
      createReactDemoHost("FlexDirectionDemoHost", FlexDirectionDemo),
    );
    app.component(
      "FlexGapWrapDemo",
      createReactDemoHost("FlexGapWrapDemoHost", FlexGapWrapDemo),
    );
    app.component(
      "FlexSizeDemo",
      createReactDemoHost("FlexSizeDemoHost", FlexSizeDemo),
    );
    app.component(
      "GridBasicDemo",
      createReactDemoHost("GridBasicDemoHost", GridBasicDemo),
    );
    app.component(
      "GridSpacingDemo",
      createReactDemoHost("GridSpacingDemoHost", GridSpacingDemo),
    );
    app.component(
      "GridOffsetDemo",
      createReactDemoHost("GridOffsetDemoHost", GridOffsetDemo),
    );
    app.component(
      "GridGrowDemo",
      createReactDemoHost("GridGrowDemoHost", GridGrowDemo),
    );
    app.component(
      "GridColumnsDemo",
      createReactDemoHost("GridColumnsDemoHost", GridColumnsDemo),
    );
    app.component(
      "GridDirectionWrapDemo",
      createReactDemoHost("GridDirectionWrapDemoHost", GridDirectionWrapDemo),
    );
    app.component(
      "GridNestedDemo",
      createReactDemoHost("GridNestedDemoHost", GridNestedDemo),
    );
    app.component(
      "GridDashboardDemo",
      createReactDemoHost("GridDashboardDemoHost", GridDashboardDemo),
    );
    app.component(
      "GridFormDetailDemo",
      createReactDemoHost("GridFormDetailDemoHost", GridFormDetailDemo),
    );
  },
};

export default theme;
