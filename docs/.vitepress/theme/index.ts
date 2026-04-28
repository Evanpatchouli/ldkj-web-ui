import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import { createElement, type ComponentType } from "react";
import { createRoot, type Root } from "react-dom/client";
import { defineComponent, h, onBeforeUnmount, onMounted, ref } from "vue";
import "../../../src/style.css";
import ButtonVariantsDemo from "./components/interact/Button/ButtonVariantsDemo";
import ButtonSizesDemo from "./components/interact/Button/ButtonSizesDemo";
import ButtonBounceDemo from "./components/interact/Button/ButtonBounce";
import ButtonSplashDemo from "./components/interact/Button/ButtonSplash";
import ButtonRoundedDemo from "./components/interact/Button/ButtonRoundedDemo";
import ButtonShadowDemo from "./components/interact/Button/ButtonShadowDemo";
import GhostButtonBasicDemo from "./components/interact/GhostButton/GhostButtonBasicDemo";
import GhostButtonSizeDemo from "./components/interact/GhostButton/GhostButtonSizeDemo";
import GhostButtonPositionDemo from "./components/interact/GhostButton/GhostButtonPositionDemo";
import GhostButtonGroupBasicDemo from "./components/interact/GhostButton/GhostButtonGroupBasicDemo";
import GhostButtonGroupTriggerDemo from "./components/interact/GhostButton/GhostButtonGroupTriggerDemo";
import GhostButtonGroupComposeDemo from "./components/interact/GhostButton/GhostButtonGroupComposeDemo";
import BoxBasicDemo from "./components/layout/Box/BoxBasicDemo";
import BoxPolymorphicDemo from "./components/layout/Box/BoxPolymorphicDemo";
import BoxOverlayDemo from "./components/layout/Box/BoxOverlayDemo";
import BoxRoundedShadowDemo from "./components/layout/Box/BoxRoundedShadowDemo";
import CardBasicDemo from "./components/data-display/Card/CardBasicDemo";
import CardSlotsDemo from "./components/data-display/Card/CardSlotsDemo";
import CardLoadingDemo from "./components/data-display/Card/CardLoadingDemo";
import CardVariantDemo from "./components/data-display/Card/CardVariantDemo";
import CardStateDemo from "./components/data-display/Card/CardStateDemo";
import CardCompoundDemo from "./components/data-display/Card/CardCompoundDemo";
import ChipVariantsDemo from "./components/data-display/Chip/ChipVariantsDemo";
import ChipOutlineDemo from "./components/data-display/Chip/ChipOutlineDemo";
import ChipSizesDemo from "./components/data-display/Chip/ChipSizesDemo";
import ChipRoundedDemo from "./components/data-display/Chip/ChipRoundedDemo";
import ChipShadowDemo from "./components/data-display/Chip/ChipShadowDemo";
import IconBasicDemo from "./components/data-display/Icon/IconBasicDemo";
import IconRegisterDemo from "./components/data-display/Icon/IconRegisterDemo";
import IconVariantFillDemo from "./components/data-display/Icon/IconVariantFillDemo";
import IconSizeDemo from "./components/data-display/Icon/IconSizeDemo";
import IconColorDemo from "./components/data-display/Icon/IconColorDemo";
import IconTitleDemo from "./components/data-display/Icon/IconTitleDemo";
import IconRegistryApiDemo from "./components/data-display/Icon/IconRegistryApiDemo";
import DividerVariantsDemo from "./components/layout/Divider/DividerVariantsDemo";
import DividerContentDemo from "./components/layout/Divider/DividerContentDemo";
import DividerVerticalDemo from "./components/layout/Divider/DividerVerticalDemo";
import DividerTypeColorDemo from "./components/layout/Divider/DividerTypeColorDemo";
import ToastBasicDemo from "./components/interact/Toast/ToastBasicDemo";
import ToastClosableDemo from "./components/interact/Toast/ToastClosableDemo";
import ToastCustomIconDemo from "./components/interact/Toast/ToastCustomIconDemo";
import ToastUseToastDemo from "./components/interact/Toast/ToastUseToastDemo";
import ToastStaticDemo from "./components/interact/Toast/ToastStaticDemo";
import FlexDirectionDemo from "./components/layout/Flex/FlexDirectionDemo";
import FlexGapWrapDemo from "./components/layout/Flex/FlexGapWrapDemo";
import FlexSizeDemo from "./components/layout/Flex/FlexSizeDemo";
import GridBasicDemo from "./components/layout/Grid/GridBasicDemo";
import GridSpacingDemo from "./components/layout/Grid/GridSpacingDemo";
import GridOffsetDemo from "./components/layout/Grid/GridOffsetDemo";
import GridGrowDemo from "./components/layout/Grid/GridGrowDemo";
import GridColumnsDemo from "./components/layout/Grid/GridColumnsDemo";
import GridDirectionWrapDemo from "./components/layout/Grid/GridDirectionWrapDemo";
import GridNestedDemo from "./components/layout/Grid/GridNestedDemo";
import GridDashboardDemo from "./components/layout/Grid/GridDashboardDemo";
import GridFormDetailDemo from "./components/layout/Grid/GridFormDetailDemo";
import QRCodeBasicDemo from "./components/data-display/QRCode/QRCodeBasicDemo";
import QRCodeCanvasDemo from "./components/data-display/QRCode/QRCodeCanvasDemo";
import QRCodeStatusDemo from "./components/data-display/QRCode/QRCodeStatusDemo";
import QRCodeStyleDemo from "./components/data-display/QRCode/QRCodeStyleDemo";
import QRCodeSizeDemo from "./components/data-display/QRCode/QRCodeSizeDemo";

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
      "ButtonShadowDemo",
      createReactDemoHost("ButtonShadowDemoHost", ButtonShadowDemo),
    );
    app.component(
      "GhostButtonBasicDemo",
      createReactDemoHost("GhostButtonBasicDemoHost", GhostButtonBasicDemo),
    );
    app.component(
      "GhostButtonSizeDemo",
      createReactDemoHost("GhostButtonSizeDemoHost", GhostButtonSizeDemo),
    );
    app.component(
      "GhostButtonPositionDemo",
      createReactDemoHost("GhostButtonPositionDemoHost", GhostButtonPositionDemo),
    );
    app.component(
      "GhostButtonGroupBasicDemo",
      createReactDemoHost("GhostButtonGroupBasicDemoHost", GhostButtonGroupBasicDemo),
    );
    app.component(
      "GhostButtonGroupTriggerDemo",
      createReactDemoHost("GhostButtonGroupTriggerDemoHost", GhostButtonGroupTriggerDemo),
    );
    app.component(
      "GhostButtonGroupComposeDemo",
      createReactDemoHost("GhostButtonGroupComposeDemoHost", GhostButtonGroupComposeDemo),
    );
    app.component(
      "BoxBasicDemo",
      createReactDemoHost("BoxBasicDemoHost", BoxBasicDemo),
    );
    app.component(
      "BoxPolymorphicDemo",
      createReactDemoHost("BoxPolymorphicDemoHost", BoxPolymorphicDemo),
    );
    app.component(
      "BoxOverlayDemo",
      createReactDemoHost("BoxOverlayDemoHost", BoxOverlayDemo),
    );
    app.component(
      "BoxRoundedShadowDemo",
      createReactDemoHost("BoxRoundedShadowDemoHost", BoxRoundedShadowDemo),
    );
    app.component(
      "CardBasicDemo",
      createReactDemoHost("CardBasicDemoHost", CardBasicDemo),
    );
    app.component(
      "CardVariantDemo",
      createReactDemoHost("CardVariantDemoHost", CardVariantDemo),
    );
    app.component(
      "CardSlotsDemo",
      createReactDemoHost("CardSlotsDemoHost", CardSlotsDemo),
    );
    app.component(
      "CardStateDemo",
      createReactDemoHost("CardStateDemoHost", CardStateDemo),
    );
    app.component(
      "CardLoadingDemo",
      createReactDemoHost("CardLoadingDemoHost", CardLoadingDemo),
    );
    app.component(
      "CardCompoundDemo",
      createReactDemoHost("CardCompoundDemoHost", CardCompoundDemo),
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
      "ChipShadowDemo",
      createReactDemoHost("ChipShadowDemoHost", ChipShadowDemo),
    );
    app.component(
      "IconBasicDemo",
      createReactDemoHost("IconBasicDemoHost", IconBasicDemo),
    );
    app.component(
      "IconRegisterDemo",
      createReactDemoHost("IconRegisterDemoHost", IconRegisterDemo),
    );
    app.component(
      "IconVariantFillDemo",
      createReactDemoHost("IconVariantFillDemoHost", IconVariantFillDemo),
    );
    app.component(
      "IconSizeDemo",
      createReactDemoHost("IconSizeDemoHost", IconSizeDemo),
    );
    app.component(
      "IconColorDemo",
      createReactDemoHost("IconColorDemoHost", IconColorDemo),
    );
    app.component(
      "IconTitleDemo",
      createReactDemoHost("IconTitleDemoHost", IconTitleDemo),
    );
    app.component(
      "IconRegistryApiDemo",
      createReactDemoHost("IconRegistryApiDemoHost", IconRegistryApiDemo),
    );
    app.component(
      "ToastBasicDemo",
      createReactDemoHost("ToastBasicDemoHost", ToastBasicDemo),
    );
    app.component(
      "ToastClosableDemo",
      createReactDemoHost("ToastClosableDemoHost", ToastClosableDemo),
    );
    app.component(
      "ToastCustomIconDemo",
      createReactDemoHost("ToastCustomIconDemoHost", ToastCustomIconDemo),
    );
    app.component(
      "ToastUseToastDemo",
      createReactDemoHost("ToastUseToastDemoHost", ToastUseToastDemo),
    );
    app.component(
      "ToastStaticDemo",
      createReactDemoHost("ToastStaticDemoHost", ToastStaticDemo),
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
    app.component(
      "QRCodeBasicDemo",
      createReactDemoHost("QRCodeBasicDemoHost", QRCodeBasicDemo),
    );
    app.component(
      "QRCodeCanvasDemo",
      createReactDemoHost("QRCodeCanvasDemoHost", QRCodeCanvasDemo),
    );
    app.component(
      "QRCodeStatusDemo",
      createReactDemoHost("QRCodeStatusDemoHost", QRCodeStatusDemo),
    );
    app.component(
      "QRCodeStyleDemo",
      createReactDemoHost("QRCodeStyleDemoHost", QRCodeStyleDemo),
    );
    app.component(
      "QRCodeSizeDemo",
      createReactDemoHost("QRCodeSizeDemoHost", QRCodeSizeDemo),
    );
  },
};

export default theme;
