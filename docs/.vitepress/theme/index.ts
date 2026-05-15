import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import { createElement, type ComponentType } from "react";
import { createRoot, type Root } from "react-dom/client";
import { defineComponent, h, onBeforeUnmount, onMounted, ref } from "vue";
import "@/style.css";
import "@/reset.css";
// data-display
import AvatarBasicDemo from "./components/data-display/Avatar/AvatarBasicDemo";
import AvatarExportDemo from "./components/data-display/Avatar/AvatarExportDemo";
import AvatarGroupDemo from "./components/data-display/Avatar/AvatarGroupDemo";
import AvatarImageFallbackDemo from "./components/data-display/Avatar/AvatarImageFallbackDemo";
import AvatarRoundedDemo from "./components/data-display/Avatar/AvatarRoundedDemo";
import AvatarShadowDemo from "./components/data-display/Avatar/AvatarShadowDemo";
import AvatarSizeDemo from "./components/data-display/Avatar/AvatarSizeDemo";
import AvatarSxDemo from "./components/data-display/Avatar/AvatarSxDemo";
import CardBasicDemo from "./components/data-display/Card/CardBasicDemo";
import CardCompoundDemo from "./components/data-display/Card/CardCompoundDemo";
import CardLoadingDemo from "./components/data-display/Card/CardLoadingDemo";
import CardSlotsDemo from "./components/data-display/Card/CardSlotsDemo";
import CardStateDemo from "./components/data-display/Card/CardStateDemo";
import CardVariantDemo from "./components/data-display/Card/CardVariantDemo";
import ChipOutlineDemo from "./components/data-display/Chip/ChipOutlineDemo";
import ChipRoundedDemo from "./components/data-display/Chip/ChipRoundedDemo";
import ChipShadowDemo from "./components/data-display/Chip/ChipShadowDemo";
import ChipSizesDemo from "./components/data-display/Chip/ChipSizesDemo";
import ChipVariantsDemo from "./components/data-display/Chip/ChipVariantsDemo";
import IconBasicDemo from "./components/data-display/Icon/IconBasicDemo";
import IconColorDemo from "./components/data-display/Icon/IconColorDemo";
import IconRegisterDemo from "./components/data-display/Icon/IconRegisterDemo";
import IconRegistryApiDemo from "./components/data-display/Icon/IconRegistryApiDemo";
import IconSizeDemo from "./components/data-display/Icon/IconSizeDemo";
import IconTitleDemo from "./components/data-display/Icon/IconTitleDemo";
import IconVariantFillDemo from "./components/data-display/Icon/IconVariantFillDemo";
import QRCodeBasicDemo from "./components/data-display/QRCode/QRCodeBasicDemo";
import QRCodeCanvasDemo from "./components/data-display/QRCode/QRCodeCanvasDemo";
import QRCodeSizeDemo from "./components/data-display/QRCode/QRCodeSizeDemo";
import QRCodeStatusDemo from "./components/data-display/QRCode/QRCodeStatusDemo";
import QRCodeStyleDemo from "./components/data-display/QRCode/QRCodeStyleDemo";
import SkeletonBasicDemo from "./components/data-display/Skeleton/SkeletonBasicDemo";
import SkeletonCardSxDemo from "./components/data-display/Skeleton/SkeletonCardSxDemo";
import SkeletonTextRowsDemo from "./components/data-display/Skeleton/SkeletonTextRowsDemo";
import SkeletonVariantsDemo from "./components/data-display/Skeleton/SkeletonVariantsDemo";
import TableBasicDemo from "./components/data-display/Table/TableBasicDemo";
import TableColumnDemo from "./components/data-display/Table/TableColumnDemo";
import TablePaginationDemo from "./components/data-display/Table/TablePaginationDemo";
import TableRenderDemo from "./components/data-display/Table/TableRenderDemo";
import TableSelectionDemo from "./components/data-display/Table/TableSelectionDemo";
import TableStateDemo from "./components/data-display/Table/TableStateDemo";
import TableSxDemo from "./components/data-display/Table/TableSxDemo";
// form
import CheckboxBasicDemo from "./components/form/Checkbox/CheckboxBasicDemo";
import CheckboxControlledDemo from "./components/form/Checkbox/CheckboxControlledDemo";
import CheckboxStatesDemo from "./components/form/Checkbox/CheckboxStatesDemo";
import CheckboxSxDemo from "./components/form/Checkbox/CheckboxSxDemo";
import CheckboxGroupComposeDemo from "./components/form/CheckboxGroup/CheckboxGroupComposeDemo";
import CheckboxGroupFormDemo from "./components/form/CheckboxGroup/CheckboxGroupFormDemo";
import CheckboxGroupMultipleDemo from "./components/form/CheckboxGroup/CheckboxGroupMultipleDemo";
import CheckboxGroupSingleDemo from "./components/form/CheckboxGroup/CheckboxGroupSingleDemo";
import CheckboxGroupSxDemo from "./components/form/CheckboxGroup/CheckboxGroupSxDemo";
import InputBasicDemo from "./components/form/Input/InputBasicDemo";
import InputStatesDemo from "./components/form/Input/InputStatesDemo";
import InputSxDemo from "./components/form/Input/InputSxDemo";
import LabelBasicDemo from "./components/form/Label/LabelBasicDemo";
import LabelLayoutDemo from "./components/form/Label/LabelLayoutDemo";
import LabelRequiredDemo from "./components/form/Label/LabelRequiredDemo";
import LabelSxDemo from "./components/form/Label/LabelSxDemo";
import RadioBasicDemo from "./components/form/Radio/RadioBasicDemo";
import RadioControlledDemo from "./components/form/Radio/RadioControlledDemo";
import RadioFormDemo from "./components/form/Radio/RadioFormDemo";
import RadioSxDemo from "./components/form/Radio/RadioSxDemo";
import SelectBasicDemo from "./components/form/Select/SelectBasicDemo";
import SelectControlledDemo from "./components/form/Select/SelectControlledDemo";
import SelectDisabledSxDemo from "./components/form/Select/SelectDisabledSxDemo";
import SelectGroupedDemo from "./components/form/Select/SelectGroupedDemo";
import SwitchBasicDemo from "./components/form/Switch/SwitchBasicDemo";
import SwitchControlledDemo from "./components/form/Switch/SwitchControlledDemo";
import SwitchLabelDescriptionDemo from "./components/form/Switch/SwitchLabelDescriptionDemo";
import SwitchSizesSxDemo from "./components/form/Switch/SwitchSizesSxDemo";
// interact
import ButtonBounceDemo from "./components/interact/Button/ButtonBounce";
import ButtonRoundedDemo from "./components/interact/Button/ButtonRoundedDemo";
import ButtonShadowDemo from "./components/interact/Button/ButtonShadowDemo";
import ButtonSizesDemo from "./components/interact/Button/ButtonSizesDemo";
import ButtonSplashDemo from "./components/interact/Button/ButtonSplash";
import ButtonVariantsDemo from "./components/interact/Button/ButtonVariantsDemo";
import DialogBasicDemo from "./components/interact/Dialog/DialogBasicDemo";
import DialogControlledDemo from "./components/interact/Dialog/DialogControlledDemo";
import DialogCustomLayoutDemo from "./components/interact/Dialog/DialogCustomLayoutDemo";
import GhostButtonBasicDemo from "./components/interact/GhostButton/GhostButtonBasicDemo";
import GhostButtonGroupBasicDemo from "./components/interact/GhostButton/GhostButtonGroupBasicDemo";
import GhostButtonGroupComposeDemo from "./components/interact/GhostButton/GhostButtonGroupComposeDemo";
import GhostButtonGroupTriggerDemo from "./components/interact/GhostButton/GhostButtonGroupTriggerDemo";
import GhostButtonPositionDemo from "./components/interact/GhostButton/GhostButtonPositionDemo";
import GhostButtonSizeDemo from "./components/interact/GhostButton/GhostButtonSizeDemo";
import ModalBasicDemo from "./components/interact/Modal/ModalBasicDemo";
import ModalMaskDestroyDemo from "./components/interact/Modal/ModalMaskDestroyDemo";
import ModalPositionBlurDemo from "./components/interact/Modal/ModalPositionBlurDemo";
import PopoverBasicDemo from "./components/interact/Popover/PopoverBasicDemo";
import PopoverControlledDemo from "./components/interact/Popover/PopoverControlledDemo";
import PopoverCustomContentDemo from "./components/interact/Popover/PopoverCustomContentDemo";
import PopoverPlacementDemo from "./components/interact/Popover/PopoverPlacementDemo";
import ToastBasicDemo from "./components/interact/Toast/ToastBasicDemo";
import ToastClosableDemo from "./components/interact/Toast/ToastClosableDemo";
import ToastCustomIconDemo from "./components/interact/Toast/ToastCustomIconDemo";
import ToastStaticDemo from "./components/interact/Toast/ToastStaticDemo";
import ToastUseToastDemo from "./components/interact/Toast/ToastUseToastDemo";
import TooltipBasicDemo from "./components/interact/Tooltip/TooltipBasicDemo";
import TooltipPlacementDemo from "./components/interact/Tooltip/TooltipPlacementDemo";
import TooltipProviderDelayDemo from "./components/interact/Tooltip/TooltipProviderDelayDemo";
import TooltipToneSxDemo from "./components/interact/Tooltip/TooltipToneSxDemo";
// layout
import BoxBasicDemo from "./components/layout/Box/BoxBasicDemo";
import BoxLongPressDemo from "./components/layout/Box/BoxLongPressDemo";
import BoxOverlayDemo from "./components/layout/Box/BoxOverlayDemo";
import BoxPolymorphicDemo from "./components/layout/Box/BoxPolymorphicDemo";
import BoxRoundedShadowDemo from "./components/layout/Box/BoxRoundedShadowDemo";
import DividerContentDemo from "./components/layout/Divider/DividerContentDemo";
import DividerTypeColorDemo from "./components/layout/Divider/DividerTypeColorDemo";
import DividerVariantsDemo from "./components/layout/Divider/DividerVariantsDemo";
import DividerVerticalDemo from "./components/layout/Divider/DividerVerticalDemo";
import FlexDirectionDemo from "./components/layout/Flex/FlexDirectionDemo";
import FlexGapWrapDemo from "./components/layout/Flex/FlexGapWrapDemo";
import FlexSizeDemo from "./components/layout/Flex/FlexSizeDemo";
import GridBasicDemo from "./components/layout/Grid/GridBasicDemo";
import GridColumnsDemo from "./components/layout/Grid/GridColumnsDemo";
import GridDashboardDemo from "./components/layout/Grid/GridDashboardDemo";
import GridDirectionWrapDemo from "./components/layout/Grid/GridDirectionWrapDemo";
import GridFormDetailDemo from "./components/layout/Grid/GridFormDetailDemo";
import GridGrowDemo from "./components/layout/Grid/GridGrowDemo";
import GridNestedDemo from "./components/layout/Grid/GridNestedDemo";
import GridOffsetDemo from "./components/layout/Grid/GridOffsetDemo";
import GridSpacingDemo from "./components/layout/Grid/GridSpacingDemo";
import RowColAlignDemo from "./components/layout/RowCol/RowColAlignDemo";
import RowColBasicDemo from "./components/layout/RowCol/RowColBasicDemo";
import RowColGutterDemo from "./components/layout/RowCol/RowColGutterDemo";
import SpaceBasicDemo from "./components/layout/Space/SpaceBasicDemo";
import SpaceItemDemo from "./components/layout/Space/SpaceItemDemo";
import SpaceResponsiveDemo from "./components/layout/Space/SpaceResponsiveDemo";
import SpaceSplitDemo from "./components/layout/Space/SpaceSplitDemo";
// navigation
import AnchorBasicDemo from "./components/navigation/Anchor/AnchorBasicDemo";
import AnchorOffsetDemo from "./components/navigation/Anchor/AnchorOffsetDemo";
import BreadcrumbBasicDemo from "./components/navigation/Breadcrumb/BreadcrumbBasicDemo";
import BreadcrumbItemsDemo from "./components/navigation/Breadcrumb/BreadcrumbItemsDemo";
import BreadcrumbSeparatorDemo from "./components/navigation/Breadcrumb/BreadcrumbSeparatorDemo";
import BreadcrumbSxDemo from "./components/navigation/Breadcrumb/BreadcrumbSxDemo";
import MenuAccordionDemo from "./components/navigation/Menu/MenuAccordionDemo";
import MenuBasicDemo from "./components/navigation/Menu/MenuBasicDemo";
import MenuControlledDemo from "./components/navigation/Menu/MenuControlledDemo";
import MenuIndentDemo from "./components/navigation/Menu/MenuIndentDemo";
import MenuItemGapDemo from "./components/navigation/Menu/MenuItemGapDemo";
import MenuItemsDemo from "./components/navigation/Menu/MenuItemsDemo";
import MenuMultipleDemo from "./components/navigation/Menu/MenuMultipleDemo";
import MenuSxDemo from "./components/navigation/Menu/MenuSxDemo";
import PaginationBasicDemo from "./components/navigation/Pagination/PaginationBasicDemo";
import PaginationBoundaryDemo from "./components/navigation/Pagination/PaginationBoundaryDemo";
import PaginationControlledDemo from "./components/navigation/Pagination/PaginationControlledDemo";
import PaginationDisabledDemo from "./components/navigation/Pagination/PaginationDisabledDemo";
import PaginationEllipsisDemo from "./components/navigation/Pagination/PaginationEllipsisDemo";
import PaginationHrefDemo from "./components/navigation/Pagination/PaginationHrefDemo";
import PaginationPreviousNextDemo from "./components/navigation/Pagination/PaginationPreviousNextDemo";
import PaginationRenderItemDemo from "./components/navigation/Pagination/PaginationRenderItemDemo";
import PaginationSxDemo from "./components/navigation/Pagination/PaginationSxDemo";
import PaginationVariantDemo from "./components/navigation/Pagination/PaginationVariantDemo";
import TabsBasicDemo from "./components/navigation/Tabs/TabsBasicDemo";
import TabsBorderlessDemo from "./components/navigation/Tabs/TabsBorderlessDemo";
import TabsCustomContentDemo from "./components/navigation/Tabs/TabsCustomContentDemo";
import TabsItemsDemo from "./components/navigation/Tabs/TabsItemsDemo";
import TabsSxDemo from "./components/navigation/Tabs/TabsSxDemo";

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
    // data-display
    app.component(
      "AvatarBasicDemo",
      createReactDemoHost("AvatarBasicDemoHost", AvatarBasicDemo),
    );
    app.component(
      "AvatarExportDemo",
      createReactDemoHost("AvatarExportDemoHost", AvatarExportDemo),
    );
    app.component(
      "AvatarGroupDemo",
      createReactDemoHost("AvatarGroupDemoHost", AvatarGroupDemo),
    );
    app.component(
      "AvatarImageFallbackDemo",
      createReactDemoHost("AvatarImageFallbackDemoHost", AvatarImageFallbackDemo),
    );
    app.component(
      "AvatarRoundedDemo",
      createReactDemoHost("AvatarRoundedDemoHost", AvatarRoundedDemo),
    );
    app.component(
      "AvatarShadowDemo",
      createReactDemoHost("AvatarShadowDemoHost", AvatarShadowDemo),
    );
    app.component(
      "AvatarSizeDemo",
      createReactDemoHost("AvatarSizeDemoHost", AvatarSizeDemo),
    );
    app.component(
      "AvatarSxDemo",
      createReactDemoHost("AvatarSxDemoHost", AvatarSxDemo),
    );
    app.component(
      "CardBasicDemo",
      createReactDemoHost("CardBasicDemoHost", CardBasicDemo),
    );
    app.component(
      "CardCompoundDemo",
      createReactDemoHost("CardCompoundDemoHost", CardCompoundDemo),
    );
    app.component(
      "CardLoadingDemo",
      createReactDemoHost("CardLoadingDemoHost", CardLoadingDemo),
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
      "CardVariantDemo",
      createReactDemoHost("CardVariantDemoHost", CardVariantDemo),
    );
    app.component(
      "ChipOutlineDemo",
      createReactDemoHost("ChipOutlineDemoHost", ChipOutlineDemo),
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
      "ChipSizesDemo",
      createReactDemoHost("ChipSizesDemoHost", ChipSizesDemo),
    );
    app.component(
      "ChipVariantsDemo",
      createReactDemoHost("ChipVariantsDemoHost", ChipVariantsDemo),
    );
    app.component(
      "IconBasicDemo",
      createReactDemoHost("IconBasicDemoHost", IconBasicDemo),
    );
    app.component(
      "IconColorDemo",
      createReactDemoHost("IconColorDemoHost", IconColorDemo),
    );
    app.component(
      "IconRegisterDemo",
      createReactDemoHost("IconRegisterDemoHost", IconRegisterDemo),
    );
    app.component(
      "IconRegistryApiDemo",
      createReactDemoHost("IconRegistryApiDemoHost", IconRegistryApiDemo),
    );
    app.component(
      "IconSizeDemo",
      createReactDemoHost("IconSizeDemoHost", IconSizeDemo),
    );
    app.component(
      "IconTitleDemo",
      createReactDemoHost("IconTitleDemoHost", IconTitleDemo),
    );
    app.component(
      "IconVariantFillDemo",
      createReactDemoHost("IconVariantFillDemoHost", IconVariantFillDemo),
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
      "QRCodeSizeDemo",
      createReactDemoHost("QRCodeSizeDemoHost", QRCodeSizeDemo),
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
      "SkeletonBasicDemo",
      createReactDemoHost("SkeletonBasicDemoHost", SkeletonBasicDemo),
    );
    app.component(
      "SkeletonCardSxDemo",
      createReactDemoHost("SkeletonCardSxDemoHost", SkeletonCardSxDemo),
    );
    app.component(
      "SkeletonTextRowsDemo",
      createReactDemoHost("SkeletonTextRowsDemoHost", SkeletonTextRowsDemo),
    );
    app.component(
      "SkeletonVariantsDemo",
      createReactDemoHost("SkeletonVariantsDemoHost", SkeletonVariantsDemo),
    );
    app.component(
      "TableBasicDemo",
      createReactDemoHost("TableBasicDemoHost", TableBasicDemo),
    );
    app.component(
      "TableColumnDemo",
      createReactDemoHost("TableColumnDemoHost", TableColumnDemo),
    );
    app.component(
      "TablePaginationDemo",
      createReactDemoHost("TablePaginationDemoHost", TablePaginationDemo),
    );
    app.component(
      "TableRenderDemo",
      createReactDemoHost("TableRenderDemoHost", TableRenderDemo),
    );
    app.component(
      "TableSelectionDemo",
      createReactDemoHost("TableSelectionDemoHost", TableSelectionDemo),
    );
    app.component(
      "TableStateDemo",
      createReactDemoHost("TableStateDemoHost", TableStateDemo),
    );
    app.component(
      "TableSxDemo",
      createReactDemoHost("TableSxDemoHost", TableSxDemo),
    );
    // form
    app.component(
      "CheckboxBasicDemo",
      createReactDemoHost("CheckboxBasicDemoHost", CheckboxBasicDemo),
    );
    app.component(
      "CheckboxControlledDemo",
      createReactDemoHost("CheckboxControlledDemoHost", CheckboxControlledDemo),
    );
    app.component(
      "CheckboxStatesDemo",
      createReactDemoHost("CheckboxStatesDemoHost", CheckboxStatesDemo),
    );
    app.component(
      "CheckboxSxDemo",
      createReactDemoHost("CheckboxSxDemoHost", CheckboxSxDemo),
    );
    app.component(
      "CheckboxGroupComposeDemo",
      createReactDemoHost("CheckboxGroupComposeDemoHost", CheckboxGroupComposeDemo),
    );
    app.component(
      "CheckboxGroupFormDemo",
      createReactDemoHost("CheckboxGroupFormDemoHost", CheckboxGroupFormDemo),
    );
    app.component(
      "CheckboxGroupMultipleDemo",
      createReactDemoHost("CheckboxGroupMultipleDemoHost", CheckboxGroupMultipleDemo),
    );
    app.component(
      "CheckboxGroupSingleDemo",
      createReactDemoHost("CheckboxGroupSingleDemoHost", CheckboxGroupSingleDemo),
    );
    app.component(
      "CheckboxGroupSxDemo",
      createReactDemoHost("CheckboxGroupSxDemoHost", CheckboxGroupSxDemo),
    );
    app.component(
      "InputBasicDemo",
      createReactDemoHost("InputBasicDemoHost", InputBasicDemo),
    );
    app.component(
      "InputStatesDemo",
      createReactDemoHost("InputStatesDemoHost", InputStatesDemo),
    );
    app.component(
      "InputSxDemo",
      createReactDemoHost("InputSxDemoHost", InputSxDemo),
    );
    app.component(
      "LabelBasicDemo",
      createReactDemoHost("LabelBasicDemoHost", LabelBasicDemo),
    );
    app.component(
      "LabelLayoutDemo",
      createReactDemoHost("LabelLayoutDemoHost", LabelLayoutDemo),
    );
    app.component(
      "LabelRequiredDemo",
      createReactDemoHost("LabelRequiredDemoHost", LabelRequiredDemo),
    );
    app.component(
      "LabelSxDemo",
      createReactDemoHost("LabelSxDemoHost", LabelSxDemo),
    );
    app.component(
      "RadioBasicDemo",
      createReactDemoHost("RadioBasicDemoHost", RadioBasicDemo),
    );
    app.component(
      "RadioControlledDemo",
      createReactDemoHost("RadioControlledDemoHost", RadioControlledDemo),
    );
    app.component(
      "RadioFormDemo",
      createReactDemoHost("RadioFormDemoHost", RadioFormDemo),
    );
    app.component(
      "RadioSxDemo",
      createReactDemoHost("RadioSxDemoHost", RadioSxDemo),
    );
    app.component(
      "SelectBasicDemo",
      createReactDemoHost("SelectBasicDemoHost", SelectBasicDemo),
    );
    app.component(
      "SelectControlledDemo",
      createReactDemoHost("SelectControlledDemoHost", SelectControlledDemo),
    );
    app.component(
      "SelectDisabledSxDemo",
      createReactDemoHost("SelectDisabledSxDemoHost", SelectDisabledSxDemo),
    );
    app.component(
      "SelectGroupedDemo",
      createReactDemoHost("SelectGroupedDemoHost", SelectGroupedDemo),
    );
    app.component(
      "SwitchBasicDemo",
      createReactDemoHost("SwitchBasicDemoHost", SwitchBasicDemo),
    );
    app.component(
      "SwitchControlledDemo",
      createReactDemoHost("SwitchControlledDemoHost", SwitchControlledDemo),
    );
    app.component(
      "SwitchLabelDescriptionDemo",
      createReactDemoHost("SwitchLabelDescriptionDemoHost", SwitchLabelDescriptionDemo),
    );
    app.component(
      "SwitchSizesSxDemo",
      createReactDemoHost("SwitchSizesSxDemoHost", SwitchSizesSxDemo),
    );
    // interact
    app.component(
      "ButtonBounceDemo",
      createReactDemoHost("ButtonBounceDemoHost", ButtonBounceDemo),
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
      "ButtonSizesDemo",
      createReactDemoHost("ButtonSizesDemoHost", ButtonSizesDemo),
    );
    app.component(
      "ButtonSplashDemo",
      createReactDemoHost("ButtonSplashDemoHost", ButtonSplashDemo),
    );
    app.component(
      "ButtonVariantsDemo",
      createReactDemoHost("ButtonVariantsDemoHost", ButtonVariantsDemo),
    );
    app.component(
      "DialogBasicDemo",
      createReactDemoHost("DialogBasicDemoHost", DialogBasicDemo),
    );
    app.component(
      "DialogControlledDemo",
      createReactDemoHost("DialogControlledDemoHost", DialogControlledDemo),
    );
    app.component(
      "DialogCustomLayoutDemo",
      createReactDemoHost("DialogCustomLayoutDemoHost", DialogCustomLayoutDemo),
    );
    app.component(
      "GhostButtonBasicDemo",
      createReactDemoHost("GhostButtonBasicDemoHost", GhostButtonBasicDemo),
    );
    app.component(
      "GhostButtonGroupBasicDemo",
      createReactDemoHost("GhostButtonGroupBasicDemoHost", GhostButtonGroupBasicDemo),
    );
    app.component(
      "GhostButtonGroupComposeDemo",
      createReactDemoHost("GhostButtonGroupComposeDemoHost", GhostButtonGroupComposeDemo),
    );
    app.component(
      "GhostButtonGroupTriggerDemo",
      createReactDemoHost("GhostButtonGroupTriggerDemoHost", GhostButtonGroupTriggerDemo),
    );
    app.component(
      "GhostButtonPositionDemo",
      createReactDemoHost("GhostButtonPositionDemoHost", GhostButtonPositionDemo),
    );
    app.component(
      "GhostButtonSizeDemo",
      createReactDemoHost("GhostButtonSizeDemoHost", GhostButtonSizeDemo),
    );
    app.component(
      "ModalBasicDemo",
      createReactDemoHost("ModalBasicDemoHost", ModalBasicDemo),
    );
    app.component(
      "ModalMaskDestroyDemo",
      createReactDemoHost("ModalMaskDestroyDemoHost", ModalMaskDestroyDemo),
    );
    app.component(
      "ModalPositionBlurDemo",
      createReactDemoHost("ModalPositionBlurDemoHost", ModalPositionBlurDemo),
    );
    app.component(
      "PopoverBasicDemo",
      createReactDemoHost("PopoverBasicDemoHost", PopoverBasicDemo),
    );
    app.component(
      "PopoverControlledDemo",
      createReactDemoHost("PopoverControlledDemoHost", PopoverControlledDemo),
    );
    app.component(
      "PopoverCustomContentDemo",
      createReactDemoHost("PopoverCustomContentDemoHost", PopoverCustomContentDemo),
    );
    app.component(
      "PopoverPlacementDemo",
      createReactDemoHost("PopoverPlacementDemoHost", PopoverPlacementDemo),
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
      "ToastStaticDemo",
      createReactDemoHost("ToastStaticDemoHost", ToastStaticDemo),
    );
    app.component(
      "ToastUseToastDemo",
      createReactDemoHost("ToastUseToastDemoHost", ToastUseToastDemo),
    );
    app.component(
      "TooltipBasicDemo",
      createReactDemoHost("TooltipBasicDemoHost", TooltipBasicDemo),
    );
    app.component(
      "TooltipPlacementDemo",
      createReactDemoHost("TooltipPlacementDemoHost", TooltipPlacementDemo),
    );
    app.component(
      "TooltipProviderDelayDemo",
      createReactDemoHost("TooltipProviderDelayDemoHost", TooltipProviderDelayDemo),
    );
    app.component(
      "TooltipToneSxDemo",
      createReactDemoHost("TooltipToneSxDemoHost", TooltipToneSxDemo),
    );
    // layout
    app.component(
      "BoxBasicDemo",
      createReactDemoHost("BoxBasicDemoHost", BoxBasicDemo),
    );
    app.component(
      "BoxLongPressDemo",
      createReactDemoHost("BoxLongPressDemoHost", BoxLongPressDemo),
    );
    app.component(
      "BoxOverlayDemo",
      createReactDemoHost("BoxOverlayDemoHost", BoxOverlayDemo),
    );
    app.component(
      "BoxPolymorphicDemo",
      createReactDemoHost("BoxPolymorphicDemoHost", BoxPolymorphicDemo),
    );
    app.component(
      "BoxRoundedShadowDemo",
      createReactDemoHost("BoxRoundedShadowDemoHost", BoxRoundedShadowDemo),
    );
    app.component(
      "DividerContentDemo",
      createReactDemoHost("DividerContentDemoHost", DividerContentDemo),
    );
    app.component(
      "DividerTypeColorDemo",
      createReactDemoHost("DividerTypeColorDemoHost", DividerTypeColorDemo),
    );
    app.component(
      "DividerVariantsDemo",
      createReactDemoHost("DividerVariantsDemoHost", DividerVariantsDemo),
    );
    app.component(
      "DividerVerticalDemo",
      createReactDemoHost("DividerVerticalDemoHost", DividerVerticalDemo),
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
      "GridColumnsDemo",
      createReactDemoHost("GridColumnsDemoHost", GridColumnsDemo),
    );
    app.component(
      "GridDashboardDemo",
      createReactDemoHost("GridDashboardDemoHost", GridDashboardDemo),
    );
    app.component(
      "GridDirectionWrapDemo",
      createReactDemoHost("GridDirectionWrapDemoHost", GridDirectionWrapDemo),
    );
    app.component(
      "GridFormDetailDemo",
      createReactDemoHost("GridFormDetailDemoHost", GridFormDetailDemo),
    );
    app.component(
      "GridGrowDemo",
      createReactDemoHost("GridGrowDemoHost", GridGrowDemo),
    );
    app.component(
      "GridNestedDemo",
      createReactDemoHost("GridNestedDemoHost", GridNestedDemo),
    );
    app.component(
      "GridOffsetDemo",
      createReactDemoHost("GridOffsetDemoHost", GridOffsetDemo),
    );
    app.component(
      "GridSpacingDemo",
      createReactDemoHost("GridSpacingDemoHost", GridSpacingDemo),
    );
    app.component(
      "RowColAlignDemo",
      createReactDemoHost("RowColAlignDemoHost", RowColAlignDemo),
    );
    app.component(
      "RowColBasicDemo",
      createReactDemoHost("RowColBasicDemoHost", RowColBasicDemo),
    );
    app.component(
      "RowColGutterDemo",
      createReactDemoHost("RowColGutterDemoHost", RowColGutterDemo),
    );
    app.component(
      "SpaceBasicDemo",
      createReactDemoHost("SpaceBasicDemoHost", SpaceBasicDemo),
    );
    app.component(
      "SpaceItemDemo",
      createReactDemoHost("SpaceItemDemoHost", SpaceItemDemo),
    );
    app.component(
      "SpaceResponsiveDemo",
      createReactDemoHost("SpaceResponsiveDemoHost", SpaceResponsiveDemo),
    );
    app.component(
      "SpaceSplitDemo",
      createReactDemoHost("SpaceSplitDemoHost", SpaceSplitDemo),
    );
    // navigation
    app.component(
      "AnchorBasicDemo",
      createReactDemoHost("AnchorBasicDemoHost", AnchorBasicDemo),
    );
    app.component(
      "AnchorOffsetDemo",
      createReactDemoHost("AnchorOffsetDemoHost", AnchorOffsetDemo),
    );
    app.component(
      "BreadcrumbBasicDemo",
      createReactDemoHost("BreadcrumbBasicDemoHost", BreadcrumbBasicDemo),
    );
    app.component(
      "BreadcrumbItemsDemo",
      createReactDemoHost("BreadcrumbItemsDemoHost", BreadcrumbItemsDemo),
    );
    app.component(
      "BreadcrumbSeparatorDemo",
      createReactDemoHost("BreadcrumbSeparatorDemoHost", BreadcrumbSeparatorDemo),
    );
    app.component(
      "BreadcrumbSxDemo",
      createReactDemoHost("BreadcrumbSxDemoHost", BreadcrumbSxDemo),
    );
    app.component(
      "MenuAccordionDemo",
      createReactDemoHost("MenuAccordionDemoHost", MenuAccordionDemo),
    );
    app.component(
      "MenuBasicDemo",
      createReactDemoHost("MenuBasicDemoHost", MenuBasicDemo),
    );
    app.component(
      "MenuControlledDemo",
      createReactDemoHost("MenuControlledDemoHost", MenuControlledDemo),
    );
    app.component(
      "MenuIndentDemo",
      createReactDemoHost("MenuIndentDemoHost", MenuIndentDemo),
    );
    app.component(
      "MenuItemGapDemo",
      createReactDemoHost("MenuItemGapDemoHost", MenuItemGapDemo),
    );
    app.component(
      "MenuItemsDemo",
      createReactDemoHost("MenuItemsDemoHost", MenuItemsDemo),
    );
    app.component(
      "MenuMultipleDemo",
      createReactDemoHost("MenuMultipleDemoHost", MenuMultipleDemo),
    );
    app.component(
      "MenuSxDemo",
      createReactDemoHost("MenuSxDemoHost", MenuSxDemo),
    );
    app.component(
      "PaginationBasicDemo",
      createReactDemoHost("PaginationBasicDemoHost", PaginationBasicDemo),
    );
    app.component(
      "PaginationBoundaryDemo",
      createReactDemoHost("PaginationBoundaryDemoHost", PaginationBoundaryDemo),
    );
    app.component(
      "PaginationControlledDemo",
      createReactDemoHost("PaginationControlledDemoHost", PaginationControlledDemo),
    );
    app.component(
      "PaginationDisabledDemo",
      createReactDemoHost("PaginationDisabledDemoHost", PaginationDisabledDemo),
    );
    app.component(
      "PaginationEllipsisDemo",
      createReactDemoHost("PaginationEllipsisDemoHost", PaginationEllipsisDemo),
    );
    app.component(
      "PaginationHrefDemo",
      createReactDemoHost("PaginationHrefDemoHost", PaginationHrefDemo),
    );
    app.component(
      "PaginationPreviousNextDemo",
      createReactDemoHost("PaginationPreviousNextDemoHost", PaginationPreviousNextDemo),
    );
    app.component(
      "PaginationRenderItemDemo",
      createReactDemoHost("PaginationRenderItemDemoHost", PaginationRenderItemDemo),
    );
    app.component(
      "PaginationSxDemo",
      createReactDemoHost("PaginationSxDemoHost", PaginationSxDemo),
    );
    app.component(
      "PaginationVariantDemo",
      createReactDemoHost("PaginationVariantDemoHost", PaginationVariantDemo),
    );
    app.component(
      "TabsBasicDemo",
      createReactDemoHost("TabsBasicDemoHost", TabsBasicDemo),
    );
    app.component(
      "TabsBorderlessDemo",
      createReactDemoHost("TabsBorderlessDemoHost", TabsBorderlessDemo),
    );
    app.component(
      "TabsCustomContentDemo",
      createReactDemoHost("TabsCustomContentDemoHost", TabsCustomContentDemo),
    );
    app.component(
      "TabsItemsDemo",
      createReactDemoHost("TabsItemsDemoHost", TabsItemsDemo),
    );
    app.component(
      "TabsSxDemo",
      createReactDemoHost("TabsSxDemoHost", TabsSxDemo),
    );
  },
};

export default theme;
