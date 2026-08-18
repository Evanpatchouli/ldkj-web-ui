import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import { createElement, useEffect, useState, type ComponentType } from "react";
import { createRoot, type Root } from "react-dom/client";
import { defineComponent, h, onBeforeUnmount, onMounted, ref } from "vue";
import "@/reset.css";
import "@/style.css";
import { Switch } from "@ldkj/web-ui";
import DevlogIndexList from "./components/DevlogIndexList";
import ThemeBasicDemo from "./components/general/ThemeBasicDemo";
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
import BadgeBasicDemo from "./components/data-display/Badge/BadgeBasicDemo";
import BadgeCountDemo from "./components/data-display/Badge/BadgeCountDemo";
import BadgeDotVariantDemo from "./components/data-display/Badge/BadgeDotVariantDemo";
import BadgeLayoutDemo from "./components/data-display/Badge/BadgeLayoutDemo";
import ListBasicDemo from "./components/data-display/List/ListBasicDemo";
import ListBorderedDemo from "./components/data-display/List/ListBorderedDemo";
import ListRichItemDemo from "./components/data-display/List/ListRichItemDemo";
import ListSxDemo from "./components/data-display/List/ListSxDemo";
import CollapseAccordionDemo from "./components/data-display/Collapse/CollapseAccordionDemo";
import CollapseActionsDemo from "./components/data-display/Collapse/CollapseActionsDemo";
import CollapseBasicDemo from "./components/data-display/Collapse/CollapseBasicDemo";
import CollapseCompoundDemo from "./components/data-display/Collapse/CollapseCompoundDemo";
import CollapseControlledDemo from "./components/data-display/Collapse/CollapseControlledDemo";
import CollapseItemsDemo from "./components/data-display/Collapse/CollapseItemsDemo";
import CollapseLazyDemo from "./components/data-display/Collapse/CollapseLazyDemo";
import CollapseMultipleDemo from "./components/data-display/Collapse/CollapseMultipleDemo";
import CollapseNestedDemo from "./components/data-display/Collapse/CollapseNestedDemo";
import CollapseSxDemo from "./components/data-display/Collapse/CollapseSxDemo";
import CollapseVariantsDemo from "./components/data-display/Collapse/CollapseVariantsDemo";
import EmptyBasicDemo from "./components/data-display/Empty/EmptyBasicDemo";
import EmptyActionDemo from "./components/data-display/Empty/EmptyActionDemo";
import EmptyBoxDemo from "./components/data-display/Empty/EmptyBoxDemo";
import EmptyImageDemo from "./components/data-display/Empty/EmptyImageDemo";
import ImageBasicDemo from "./components/data-display/Image/ImageBasicDemo";
import ImageCropDemo from "./components/data-display/Image/ImageCropDemo";
import ImageFallbackDemo from "./components/data-display/Image/ImageFallbackDemo";
import ImageFitDemo from "./components/data-display/Image/ImageFitDemo";
import ImagePictureDemo from "./components/data-display/Image/ImagePictureDemo";
import ImagePreviewDemo from "./components/data-display/Image/ImagePreviewDemo";
import ImageStateDemo from "./components/data-display/Image/ImageStateDemo";
import ImageSxDemo from "./components/data-display/Image/ImageSxDemo";
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
import InputAffixAddonDemo from "./components/form/Input/InputAffixAddonDemo";
import InputBasicDemo from "./components/form/Input/InputBasicDemo";
import InputStatesDemo from "./components/form/Input/InputStatesDemo";
import InputSxDemo from "./components/form/Input/InputSxDemo";
import InputNumberDemo from "./components/form/InputNumber/InputNumberDemo";
import InputNumberBusinessDemo from "./components/form/InputNumber/InputNumberBusinessDemo";
import InputNumberHeadlessDemo from "./components/form/InputNumber/InputNumberHeadlessDemo";
import InputNumberRangeStepDemo from "./components/form/InputNumber/InputNumberRangeStepDemo";
import InputNumberStatesDemo from "./components/form/InputNumber/InputNumberStatesDemo";
import InputNumberSxDemo from "./components/form/InputNumber/InputNumberSxDemo";
import InputOPTDemo from "./components/form/InputOPT/InputOPTDemo";
import InputOPTFormDemo from "./components/form/InputOPT/InputOPTFormDemo";
import InputOPTMaskDemo from "./components/form/InputOPT/InputOPTMaskDemo";
import InputOPTPasteDemo from "./components/form/InputOPT/InputOPTPasteDemo";
import InputOPTStatesDemo from "./components/form/InputOPT/InputOPTStatesDemo";
import InputOPTSxDemo from "./components/form/InputOPT/InputOPTSxDemo";
import AutoCompleteDemo from "./components/form/AutoComplete/AutoCompleteDemo";
import AutoCompleteControlledDemo from "./components/form/AutoComplete/AutoCompleteControlledDemo";
import AutoCompleteRenderDemo from "./components/form/AutoComplete/AutoCompleteRenderDemo";
import AutoCompleteStateSxDemo from "./components/form/AutoComplete/AutoCompleteStateSxDemo";
import LabelBasicDemo from "./components/form/Label/LabelBasicDemo";
import LabelLayoutDemo from "./components/form/Label/LabelLayoutDemo";
import LabelRequiredDemo from "./components/form/Label/LabelRequiredDemo";
import LabelSxDemo from "./components/form/Label/LabelSxDemo";
import RadioBasicDemo from "./components/form/Radio/RadioBasicDemo";
import RadioControlledDemo from "./components/form/Radio/RadioControlledDemo";
import RadioFormDemo from "./components/form/Radio/RadioFormDemo";
import RadioSxDemo from "./components/form/Radio/RadioSxDemo";
import RateBasicDemo from "./components/form/Rate/RateBasicDemo";
import RateBorderlessDemo from "./components/form/Rate/RateBorderlessDemo";
import RateClearableDemo from "./components/form/Rate/RateClearableDemo";
import RateFormDemo from "./components/form/Rate/RateFormDemo";
import RateStatesDemo from "./components/form/Rate/RateStatesDemo";
import CascaderDemo from "./components/form/Cascader/CascaderDemo";
import CascaderControlledDemo from "./components/form/Cascader/CascaderControlledDemo";
import CascaderAdvancedDemo from "./components/form/Cascader/CascaderAdvancedDemo";
import SliderBasicDemo from "./components/form/Slider/SliderBasicDemo";
import SliderControlledDemo from "./components/form/Slider/SliderControlledDemo";
import SliderStateDemo from "./components/form/Slider/SliderStateDemo";
import SliderStepDemo from "./components/form/Slider/SliderStepDemo";
import RequiredDemo from "./components/form/Required/RequiredDemo";
import FormBasicDemo from "./components/form/Form/FormBasicDemo";
import FormLoginDemo from "./components/form/Form/FormLoginDemo";
import FormInlineDemo from "./components/form/Form/FormInlineDemo";
import FormUseFormDemo from "./components/form/Form/FormUseFormDemo";
import FormValidationDemo from "./components/form/Form/FormValidationDemo";
import FormWatchDemo from "./components/form/Form/FormWatchDemo";
import UploaderBusinessDemo from "./components/form/Uploader/UploaderBusinessDemo";
import UploaderControlledDemo from "./components/form/Uploader/UploaderControlledDemo";
import UploaderDemo from "./components/form/Uploader/UploaderDemo";
import UploaderDragDemo from "./components/form/Uploader/UploaderDragDemo";
import UploaderFormDemo from "./components/form/Uploader/UploaderFormDemo";
import UploaderInteractionsDemo from "./components/form/Uploader/UploaderInteractionsDemo";
import UploaderListTypesDemo from "./components/form/Uploader/UploaderListTypesDemo";
import UploaderManualDemo from "./components/form/Uploader/UploaderManualDemo";
import UploaderPictureDemo from "./components/form/Uploader/UploaderPictureDemo";
import UploaderPreviewActionsDemo from "./components/form/Uploader/UploaderPreviewActionsDemo";
import UploaderProviderDemo from "./components/form/Uploader/UploaderProviderDemo";
import UploaderRenderDemo from "./components/form/Uploader/UploaderRenderDemo";
import UploaderTransformDemo from "./components/form/Uploader/UploaderTransformDemo";
import UploaderValidationDemo from "./components/form/Uploader/UploaderValidationDemo";
import UploaderXhrDemo from "./components/form/Uploader/UploaderXhrDemo";
import SelectBasicDemo from "./components/form/Select/SelectBasicDemo";
import SelectControlledDemo from "./components/form/Select/SelectControlledDemo";
import SelectDisabledSxDemo from "./components/form/Select/SelectDisabledSxDemo";
import SelectGroupedDemo from "./components/form/Select/SelectGroupedDemo";
import SelectScrollBehaviorDemo from "./components/form/Select/SelectScrollBehaviorDemo";
import SwitchBasicDemo from "./components/form/Switch/SwitchBasicDemo";
import SwitchControlledDemo from "./components/form/Switch/SwitchControlledDemo";
import SwitchLabelDescriptionDemo from "./components/form/Switch/SwitchLabelDescriptionDemo";
import SwitchSizesSxDemo from "./components/form/Switch/SwitchSizesSxDemo";
// mobile
import MobileSelectBasicDemo from "./components/mobile/MobileSelect/MobileSelectBasicDemo";
import MobileSelectAlignDemo from "./components/mobile/MobileSelect/MobileSelectAlignDemo";
import MobileCascaderBasicDemo from "./components/mobile/MobileCascader/MobileCascaderBasicDemo";
import MobileCascaderControlledDemo from "./components/mobile/MobileCascader/MobileCascaderControlledDemo";
import MobileStepperActionsDemo from "./components/mobile/MobileStepper/MobileStepperActionsDemo";
import MobileStepperBasicDemo from "./components/mobile/MobileStepper/MobileStepperBasicDemo";
import MobileStepperControlledDemo from "./components/mobile/MobileStepper/MobileStepperControlledDemo";
import MobileStepperIndicatorDemo from "./components/mobile/MobileStepper/MobileStepperIndicatorDemo";
import MobilePageBasicDemo from "./components/mobile/MobilePage/MobilePageBasicDemo";
import MobilePageRefreshDemo from "./components/mobile/MobilePage/MobilePageRefreshDemo";
import MobilePageSubDemo from "./components/mobile/MobilePage/MobilePageSubDemo";
import MobilePageTabsDemo from "./components/mobile/MobilePage/MobilePageTabsDemo";
// scenario
import RacingChipsBasicDemo from "./components/scenario/RacingChips/RacingChipsBasicDemo";
import RacingChipsPhoneDemo from "./components/scenario/RacingChips/RacingChipsPhoneDemo";
import RacingChipsCustomDemo from "./components/scenario/RacingChips/RacingChipsCustomDemo";
// interact
import ButtonBounceDemo from "./components/interact/Button/ButtonBounce";
import ButtonDebounceDemo from "./components/interact/Button/ButtonDebounceDemo";
import ButtonLoadingDemo from "./components/interact/Button/ButtonLoadingDemo";
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
import NotificationActionsDemo from "./components/interact/Notification/NotificationActionsDemo";
import NotificationBasicDemo from "./components/interact/Notification/NotificationBasicDemo";
import NotificationOffsetDemo from "./components/interact/Notification/NotificationOffsetDemo";
import NotificationPlacementDemo from "./components/interact/Notification/NotificationPlacementDemo";
import SpinDemo from "./components/interact/Spin/SpinDemo";
import SpinInlineDemo from "./components/interact/Spin/SpinInlineDemo";
import SpinToneDemo from "./components/interact/Spin/SpinToneDemo";
import LoadingDemo from "./components/interact/Loading/LoadingDemo";
import LoadingOverlayDemo from "./components/interact/Loading/LoadingOverlayDemo";
import LoadingStateDemo from "./components/interact/Loading/LoadingStateDemo";
import DrawerDemo from "./components/interact/Drawer/DrawerDemo";
import DrawerBehaviorDemo from "./components/interact/Drawer/DrawerBehaviorDemo";
import DrawerPlacementDemo from "./components/interact/Drawer/DrawerPlacementDemo";
import AlertDemo from "./components/interact/Alert/AlertDemo";
import AlertActionDemo from "./components/interact/Alert/AlertActionDemo";
import AlertClosableDemo from "./components/interact/Alert/AlertClosableDemo";
import ProgressDemo from "./components/interact/Progress/ProgressDemo";
import ProgressCircleDemo from "./components/interact/Progress/ProgressCircleDemo";
import ProgressSizeDemo from "./components/interact/Progress/ProgressSizeDemo";
import ProgressStatusDemo from "./components/interact/Progress/ProgressStatusDemo";
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
import ColumnsBasicDemo from "./components/layout/Columns/ColumnsBasicDemo";
import ColumnsCardsDemo from "./components/layout/Columns/ColumnsCardsDemo";
import ColumnsResponsiveDemo from "./components/layout/Columns/ColumnsResponsiveDemo";
import MasonryBasicDemo from "./components/layout/Masonry/MasonryBasicDemo";
import MasonryDisabledDemo from "./components/layout/Masonry/MasonryDisabledDemo";
import MasonryVariantsDemo from "./components/layout/Masonry/MasonryVariantsDemo";
import GridColumnsDemo from "./components/layout/Grid/GridColumnsDemo";
import GridDashboardDemo from "./components/layout/Grid/GridDashboardDemo";
import GridDirectionWrapDemo from "./components/layout/Grid/GridDirectionWrapDemo";
import GridFormDetailDemo from "./components/layout/Grid/GridFormDetailDemo";
import GridGrowDemo from "./components/layout/Grid/GridGrowDemo";
import GridNestedDemo from "./components/layout/Grid/GridNestedDemo";
import GridOffsetDemo from "./components/layout/Grid/GridOffsetDemo";
import GridSpacingDemo from "./components/layout/Grid/GridSpacingDemo";
import HeaderBasicDemo from "./components/layout/Header/HeaderBasicDemo";
import HeaderCompoundDemo from "./components/layout/Header/HeaderCompoundDemo";
import HeaderResponsiveDemo from "./components/layout/Header/HeaderResponsiveDemo";
import HeaderSlotsDemo from "./components/layout/Header/HeaderSlotsDemo";
import HeaderStickyDemo from "./components/layout/Header/HeaderStickyDemo";
import RowColAlignDemo from "./components/layout/RowCol/RowColAlignDemo";
import RowColBasicDemo from "./components/layout/RowCol/RowColBasicDemo";
import RowColGutterDemo from "./components/layout/RowCol/RowColGutterDemo";
import SafeAreaBasicDemo from "./components/layout/SafeArea/SafeAreaBasicDemo";
import SpaceBasicDemo from "./components/layout/Space/SpaceBasicDemo";
import SpaceItemDemo from "./components/layout/Space/SpaceItemDemo";
import SpaceResponsiveDemo from "./components/layout/Space/SpaceResponsiveDemo";
import SpaceSplitDemo from "./components/layout/Space/SpaceSplitDemo";
import SplitterBasicDemo from "./components/layout/Splitter/SplitterBasicDemo";
import SplitterComplexDemo from "./components/layout/Splitter/SplitterComplexDemo";
import SplitterControlledDemo from "./components/layout/Splitter/SplitterControlledDemo";
import SplitterVerticalDemo from "./components/layout/Splitter/SplitterVerticalDemo";
import TypographyBasicDemo from "./components/layout/Typography/TypographyBasicDemo";
import TypographySemanticDemo from "./components/layout/Typography/TypographySemanticDemo";
import TypographySxDemo from "./components/layout/Typography/TypographySxDemo";
import TypographyVariantsDemo from "./components/layout/Typography/TypographyVariantsDemo";
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
import NavigatorBasicDemo from "./components/navigation/Navigator/NavigatorBasicDemo";
import NavigatorCompoundDemo from "./components/navigation/Navigator/NavigatorCompoundDemo";
import NavigatorControlledDemo from "./components/navigation/Navigator/NavigatorControlledDemo";
import NavigatorHeaderDemo from "./components/navigation/Navigator/NavigatorHeaderDemo";
import NavigatorMegaDemo from "./components/navigation/Navigator/NavigatorMegaDemo";
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
import StepperBasicDemo from "./components/navigation/Stepper/StepperBasicDemo";
import StepperCompoundDemo from "./components/navigation/Stepper/StepperCompoundDemo";
import StepperControlledDemo from "./components/navigation/Stepper/StepperControlledDemo";
import StepperStatusDemo from "./components/navigation/Stepper/StepperStatusDemo";
import StepperVerticalDemo from "./components/navigation/Stepper/StepperVerticalDemo";
import TimelineBasicDemo from "./components/navigation/Timeline/TimelineBasicDemo";
import TimelineCustomDemo from "./components/navigation/Timeline/TimelineCustomDemo";
import TimelinePendingDemo from "./components/navigation/Timeline/TimelinePendingDemo";
import TimelinePositionDemo from "./components/navigation/Timeline/TimelinePositionDemo";
import TimelineSxDemo from "./components/navigation/Timeline/TimelineSxDemo";
import TabsBasicDemo from "./components/navigation/Tabs/TabsBasicDemo";
import TabsBorderlessDemo from "./components/navigation/Tabs/TabsBorderlessDemo";
import TabsCustomContentDemo from "./components/navigation/Tabs/TabsCustomContentDemo";
import TabsItemsDemo from "./components/navigation/Tabs/TabsItemsDemo";
import TabsSxDemo from "./components/navigation/Tabs/TabsSxDemo";

const APPEARANCE_KEY = "vitepress-theme-appearance";

function createReactDemoHost(name: string, DemoComponent: ComponentType, rootStyle?: Record<string, string>) {
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

      return () => h("div", { ref: mountEl, style: rootStyle });
    },
  });
}

function getInitialDark() {
  if (typeof window === "undefined") return false;

  const saved = window.localStorage.getItem(APPEARANCE_KEY);
  if (saved === "dark") return true;
  if (saved === "light") return false;

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function setDocumentTheme(isDark: boolean) {
  const root = document.documentElement;

  root.classList.toggle("dark", isDark);
  root.style.colorScheme = isDark ? "dark" : "light";
  window.localStorage.setItem(APPEARANCE_KEY, isDark ? "dark" : "light");
}

function DocsThemeSwitch() {
  const [checked, setChecked] = useState(getInitialDark);

  useEffect(() => {
    setDocumentTheme(checked);
  }, [checked]);

  const label = checked ? "切换为浅色主题" : "切换为深色主题";

  return createElement(Switch, {
    checked,
    size: "sm",
    "aria-label": label,
    title: label,
    onCheckedChange: setChecked,
  });
}

const DocsThemeSwitchHost = createReactDemoHost(
  "DocsThemeSwitchHost",
  DocsThemeSwitch,
  { display: "inline-flex", marginInline: "12px" },
);

const DocsLayout = defineComponent({
  name: "DocsLayout",
  setup() {
    return () =>
      h(DefaultTheme.Layout, null, {
        "nav-bar-content-after": () => h(DocsThemeSwitchHost),
      });
  },
});

const theme: Theme = {
  ...DefaultTheme,
  Layout: DocsLayout,
  enhanceApp({ app }) {
    app.component(
      "ThemeBasicDemo",
      createReactDemoHost("ThemeBasicDemoHost", ThemeBasicDemo),
    );
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
      "BadgeBasicDemo",
      createReactDemoHost("BadgeBasicDemoHost", BadgeBasicDemo),
    );
    app.component(
      "BadgeCountDemo",
      createReactDemoHost("BadgeCountDemoHost", BadgeCountDemo),
    );
    app.component(
      "BadgeDotVariantDemo",
      createReactDemoHost("BadgeDotVariantDemoHost", BadgeDotVariantDemo),
    );
    app.component(
      "BadgeLayoutDemo",
      createReactDemoHost("BadgeLayoutDemoHost", BadgeLayoutDemo),
    );
    app.component(
      "ListBasicDemo",
      createReactDemoHost("ListBasicDemoHost", ListBasicDemo),
    );
    app.component(
      "ListBorderedDemo",
      createReactDemoHost("ListBorderedDemoHost", ListBorderedDemo),
    );
    app.component(
      "ListRichItemDemo",
      createReactDemoHost("ListRichItemDemoHost", ListRichItemDemo),
    );
    app.component(
      "ListSxDemo",
      createReactDemoHost("ListSxDemoHost", ListSxDemo),
    );
    app.component(
      "CollapseAccordionDemo",
      createReactDemoHost("CollapseAccordionDemoHost", CollapseAccordionDemo),
    );
    app.component(
      "CollapseActionsDemo",
      createReactDemoHost("CollapseActionsDemoHost", CollapseActionsDemo),
    );
    app.component(
      "CollapseBasicDemo",
      createReactDemoHost("CollapseBasicDemoHost", CollapseBasicDemo),
    );
    app.component(
      "CollapseCompoundDemo",
      createReactDemoHost("CollapseCompoundDemoHost", CollapseCompoundDemo),
    );
    app.component(
      "CollapseControlledDemo",
      createReactDemoHost("CollapseControlledDemoHost", CollapseControlledDemo),
    );
    app.component(
      "CollapseItemsDemo",
      createReactDemoHost("CollapseItemsDemoHost", CollapseItemsDemo),
    );
    app.component(
      "CollapseLazyDemo",
      createReactDemoHost("CollapseLazyDemoHost", CollapseLazyDemo),
    );
    app.component(
      "CollapseMultipleDemo",
      createReactDemoHost("CollapseMultipleDemoHost", CollapseMultipleDemo),
    );
    app.component(
      "CollapseNestedDemo",
      createReactDemoHost("CollapseNestedDemoHost", CollapseNestedDemo),
    );
    app.component(
      "CollapseSxDemo",
      createReactDemoHost("CollapseSxDemoHost", CollapseSxDemo),
    );
    app.component(
      "CollapseVariantsDemo",
      createReactDemoHost("CollapseVariantsDemoHost", CollapseVariantsDemo),
    );
    app.component(
      "EmptyBasicDemo",
      createReactDemoHost("EmptyBasicDemoHost", EmptyBasicDemo),
    );
    app.component(
      "EmptyImageDemo",
      createReactDemoHost("EmptyImageDemoHost", EmptyImageDemo),
    );
    app.component(
      "EmptyActionDemo",
      createReactDemoHost("EmptyActionDemoHost", EmptyActionDemo),
    );
    app.component(
      "EmptyBoxDemo",
      createReactDemoHost("EmptyBoxDemoHost", EmptyBoxDemo),
    );
    app.component(
      "ImageBasicDemo",
      createReactDemoHost("ImageBasicDemoHost", ImageBasicDemo),
    );
    app.component(
      "ImageCropDemo",
      createReactDemoHost("ImageCropDemoHost", ImageCropDemo),
    );
    app.component(
      "ImageFitDemo",
      createReactDemoHost("ImageFitDemoHost", ImageFitDemo),
    );
    app.component(
      "ImageFallbackDemo",
      createReactDemoHost("ImageFallbackDemoHost", ImageFallbackDemo),
    );
    app.component(
      "ImageSxDemo",
      createReactDemoHost("ImageSxDemoHost", ImageSxDemo),
    );
    app.component(
      "ImagePreviewDemo",
      createReactDemoHost("ImagePreviewDemoHost", ImagePreviewDemo),
    );
    app.component(
      "ImageStateDemo",
      createReactDemoHost("ImageStateDemoHost", ImageStateDemo),
    );
    app.component(
      "ImagePictureDemo",
      createReactDemoHost("ImagePictureDemoHost", ImagePictureDemo),
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
      "InputAffixAddonDemo",
      createReactDemoHost("InputAffixAddonDemoHost", InputAffixAddonDemo),
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
      "InputNumberDemo",
      createReactDemoHost("InputNumberDemoHost", InputNumberDemo),
    );
    app.component(
      "InputNumberRangeStepDemo",
      createReactDemoHost("InputNumberRangeStepDemoHost", InputNumberRangeStepDemo),
    );
    app.component(
      "InputNumberBusinessDemo",
      createReactDemoHost("InputNumberBusinessDemoHost", InputNumberBusinessDemo),
    );
    app.component(
      "InputNumberHeadlessDemo",
      createReactDemoHost("InputNumberHeadlessDemoHost", InputNumberHeadlessDemo),
    );
    app.component(
      "InputNumberStatesDemo",
      createReactDemoHost("InputNumberStatesDemoHost", InputNumberStatesDemo),
    );
    app.component(
      "InputNumberSxDemo",
      createReactDemoHost("InputNumberSxDemoHost", InputNumberSxDemo),
    );
    app.component(
      "InputOPTDemo",
      createReactDemoHost("InputOPTDemoHost", InputOPTDemo),
    );
    app.component(
      "InputOPTPasteDemo",
      createReactDemoHost("InputOPTPasteDemoHost", InputOPTPasteDemo),
    );
    app.component(
      "InputOPTMaskDemo",
      createReactDemoHost("InputOPTMaskDemoHost", InputOPTMaskDemo),
    );
    app.component(
      "InputOPTFormDemo",
      createReactDemoHost("InputOPTFormDemoHost", InputOPTFormDemo),
    );
    app.component(
      "InputOPTStatesDemo",
      createReactDemoHost("InputOPTStatesDemoHost", InputOPTStatesDemo),
    );
    app.component(
      "InputOPTSxDemo",
      createReactDemoHost("InputOPTSxDemoHost", InputOPTSxDemo),
    );
    app.component(
      "AutoCompleteDemo",
      createReactDemoHost("AutoCompleteDemoHost", AutoCompleteDemo),
    );
    app.component(
      "AutoCompleteControlledDemo",
      createReactDemoHost(
        "AutoCompleteControlledDemoHost",
        AutoCompleteControlledDemo,
      ),
    );
    app.component(
      "AutoCompleteRenderDemo",
      createReactDemoHost("AutoCompleteRenderDemoHost", AutoCompleteRenderDemo),
    );
    app.component(
      "AutoCompleteStateSxDemo",
      createReactDemoHost(
        "AutoCompleteStateSxDemoHost",
        AutoCompleteStateSxDemo,
      ),
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
      "RateBasicDemo",
      createReactDemoHost("RateBasicDemoHost", RateBasicDemo),
    );
    app.component(
      "RateBorderlessDemo",
      createReactDemoHost("RateBorderlessDemoHost", RateBorderlessDemo),
    );
    app.component(
      "RateClearableDemo",
      createReactDemoHost("RateClearableDemoHost", RateClearableDemo),
    );
    app.component(
      "RateFormDemo",
      createReactDemoHost("RateFormDemoHost", RateFormDemo),
    );
    app.component(
      "RateStatesDemo",
      createReactDemoHost("RateStatesDemoHost", RateStatesDemo),
    );
    app.component(
      "CascaderDemo",
      createReactDemoHost("CascaderDemoHost", CascaderDemo),
    );
    app.component(
      "CascaderControlledDemo",
      createReactDemoHost(
        "CascaderControlledDemoHost",
        CascaderControlledDemo,
      ),
    );
    app.component(
      "CascaderAdvancedDemo",
      createReactDemoHost("CascaderAdvancedDemoHost", CascaderAdvancedDemo),
    );
    app.component(
      "SliderBasicDemo",
      createReactDemoHost("SliderBasicDemoHost", SliderBasicDemo),
    );
    app.component(
      "SliderControlledDemo",
      createReactDemoHost("SliderControlledDemoHost", SliderControlledDemo),
    );
    app.component(
      "SliderStepDemo",
      createReactDemoHost("SliderStepDemoHost", SliderStepDemo),
    );
    app.component(
      "SliderStateDemo",
      createReactDemoHost("SliderStateDemoHost", SliderStateDemo),
    );
    app.component(
      "RequiredDemo",
      createReactDemoHost("RequiredDemoHost", RequiredDemo),
    );
    app.component(
      "FormBasicDemo",
      createReactDemoHost("FormBasicDemoHost", FormBasicDemo),
    );
    app.component(
      "FormLoginDemo",
      createReactDemoHost("FormLoginDemoHost", FormLoginDemo),
    );
    app.component(
      "FormInlineDemo",
      createReactDemoHost("FormInlineDemoHost", FormInlineDemo),
    );
    app.component(
      "FormUseFormDemo",
      createReactDemoHost("FormUseFormDemoHost", FormUseFormDemo),
    );
    app.component(
      "FormWatchDemo",
      createReactDemoHost("FormWatchDemoHost", FormWatchDemo),
    );
    app.component(
      "FormValidationDemo",
      createReactDemoHost("FormValidationDemoHost", FormValidationDemo),
    );
    app.component(
      "UploaderDemo",
      createReactDemoHost("UploaderDemoHost", UploaderDemo),
    );
    app.component(
      "UploaderBusinessDemo",
      createReactDemoHost("UploaderBusinessDemoHost", UploaderBusinessDemo),
    );
    app.component(
      "UploaderControlledDemo",
      createReactDemoHost("UploaderControlledDemoHost", UploaderControlledDemo),
    );
    app.component(
      "UploaderDragDemo",
      createReactDemoHost("UploaderDragDemoHost", UploaderDragDemo),
    );
    app.component(
      "UploaderFormDemo",
      createReactDemoHost("UploaderFormDemoHost", UploaderFormDemo),
    );
    app.component(
      "UploaderInteractionsDemo",
      createReactDemoHost("UploaderInteractionsDemoHost", UploaderInteractionsDemo),
    );
    app.component(
      "UploaderListTypesDemo",
      createReactDemoHost("UploaderListTypesDemoHost", UploaderListTypesDemo),
    );
    app.component(
      "UploaderManualDemo",
      createReactDemoHost("UploaderManualDemoHost", UploaderManualDemo),
    );
    app.component(
      "UploaderPictureDemo",
      createReactDemoHost("UploaderPictureDemoHost", UploaderPictureDemo),
    );
    app.component(
      "UploaderPreviewActionsDemo",
      createReactDemoHost("UploaderPreviewActionsDemoHost", UploaderPreviewActionsDemo),
    );
    app.component(
      "UploaderProviderDemo",
      createReactDemoHost("UploaderProviderDemoHost", UploaderProviderDemo),
    );
    app.component(
      "UploaderRenderDemo",
      createReactDemoHost("UploaderRenderDemoHost", UploaderRenderDemo),
    );
    app.component(
      "UploaderTransformDemo",
      createReactDemoHost("UploaderTransformDemoHost", UploaderTransformDemo),
    );
    app.component(
      "UploaderValidationDemo",
      createReactDemoHost("UploaderValidationDemoHost", UploaderValidationDemo),
    );
    app.component(
      "UploaderXhrDemo",
      createReactDemoHost("UploaderXhrDemoHost", UploaderXhrDemo),
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
      "SelectScrollBehaviorDemo",
      createReactDemoHost("SelectScrollBehaviorDemoHost", SelectScrollBehaviorDemo),
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
    // mobile
    app.component(
      "MobileSelectBasicDemo",
      createReactDemoHost("MobileSelectBasicDemoHost", MobileSelectBasicDemo),
    );
    app.component(
      "MobileSelectAlignDemo",
      createReactDemoHost("MobileSelectAlignDemoHost", MobileSelectAlignDemo),
    );
    app.component(
      "MobileCascaderBasicDemo",
      createReactDemoHost(
        "MobileCascaderBasicDemoHost",
        MobileCascaderBasicDemo,
      ),
    );
    app.component(
      "MobileCascaderControlledDemo",
      createReactDemoHost(
        "MobileCascaderControlledDemoHost",
        MobileCascaderControlledDemo,
      ),
    );
    app.component(
      "MobileStepperBasicDemo",
      createReactDemoHost("MobileStepperBasicDemoHost", MobileStepperBasicDemo),
    );
    app.component(
      "MobileStepperControlledDemo",
      createReactDemoHost(
        "MobileStepperControlledDemoHost",
        MobileStepperControlledDemo,
      ),
    );
    app.component(
      "MobileStepperIndicatorDemo",
      createReactDemoHost(
        "MobileStepperIndicatorDemoHost",
        MobileStepperIndicatorDemo,
      ),
    );
    app.component(
      "MobileStepperActionsDemo",
      createReactDemoHost("MobileStepperActionsDemoHost", MobileStepperActionsDemo),
    );
    app.component(
      "MobilePageBasicDemo",
      createReactDemoHost("MobilePageBasicDemoHost", MobilePageBasicDemo),
    );
    app.component(
      "MobilePageSubDemo",
      createReactDemoHost("MobilePageSubDemoHost", MobilePageSubDemo),
    );
    app.component(
      "MobilePageRefreshDemo",
      createReactDemoHost("MobilePageRefreshDemoHost", MobilePageRefreshDemo),
    );
    app.component(
      "MobilePageTabsDemo",
      createReactDemoHost("MobilePageTabsDemoHost", MobilePageTabsDemo),
    );
    // scenario
    app.component(
      "RacingChipsBasicDemo",
      createReactDemoHost("RacingChipsBasicDemoHost", RacingChipsBasicDemo),
    );
    app.component(
      "RacingChipsPhoneDemo",
      createReactDemoHost("RacingChipsPhoneDemoHost", RacingChipsPhoneDemo),
    );
    app.component(
      "RacingChipsCustomDemo",
      createReactDemoHost("RacingChipsCustomDemoHost", RacingChipsCustomDemo),
    );
    // interact
    app.component(
      "ButtonBounceDemo",
      createReactDemoHost("ButtonBounceDemoHost", ButtonBounceDemo),
    );
    app.component(
      "ButtonDebounceDemo",
      createReactDemoHost("ButtonDebounceDemoHost", ButtonDebounceDemo),
    );
    app.component(
      "ButtonLoadingDemo",
      createReactDemoHost("ButtonLoadingDemoHost", ButtonLoadingDemo),
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
    app.component(
      "NotificationBasicDemo",
      createReactDemoHost("NotificationBasicDemoHost", NotificationBasicDemo),
    );
    app.component(
      "NotificationPlacementDemo",
      createReactDemoHost(
        "NotificationPlacementDemoHost",
        NotificationPlacementDemo,
      ),
    );
    app.component(
      "NotificationActionsDemo",
      createReactDemoHost("NotificationActionsDemoHost", NotificationActionsDemo),
    );
    app.component(
      "NotificationOffsetDemo",
      createReactDemoHost("NotificationOffsetDemoHost", NotificationOffsetDemo),
    );
    app.component(
      "SpinDemo",
      createReactDemoHost("SpinDemoHost", SpinDemo),
    );
    app.component(
      "SpinToneDemo",
      createReactDemoHost("SpinToneDemoHost", SpinToneDemo),
    );
    app.component(
      "SpinInlineDemo",
      createReactDemoHost("SpinInlineDemoHost", SpinInlineDemo),
    );
    app.component(
      "LoadingDemo",
      createReactDemoHost("LoadingDemoHost", LoadingDemo),
    );
    app.component(
      "LoadingOverlayDemo",
      createReactDemoHost("LoadingOverlayDemoHost", LoadingOverlayDemo),
    );
    app.component(
      "LoadingStateDemo",
      createReactDemoHost("LoadingStateDemoHost", LoadingStateDemo),
    );
    app.component(
      "DrawerDemo",
      createReactDemoHost("DrawerDemoHost", DrawerDemo),
    );
    app.component(
      "DrawerPlacementDemo",
      createReactDemoHost("DrawerPlacementDemoHost", DrawerPlacementDemo),
    );
    app.component(
      "DrawerBehaviorDemo",
      createReactDemoHost("DrawerBehaviorDemoHost", DrawerBehaviorDemo),
    );
    app.component(
      "AlertDemo",
      createReactDemoHost("AlertDemoHost", AlertDemo),
    );
    app.component(
      "AlertActionDemo",
      createReactDemoHost("AlertActionDemoHost", AlertActionDemo),
    );
    app.component(
      "AlertClosableDemo",
      createReactDemoHost("AlertClosableDemoHost", AlertClosableDemo),
    );
    app.component(
      "ProgressDemo",
      createReactDemoHost("ProgressDemoHost", ProgressDemo),
    );
    app.component(
      "ProgressCircleDemo",
      createReactDemoHost("ProgressCircleDemoHost", ProgressCircleDemo),
    );
    app.component(
      "ProgressSizeDemo",
      createReactDemoHost("ProgressSizeDemoHost", ProgressSizeDemo),
    );
    app.component(
      "ProgressStatusDemo",
      createReactDemoHost("ProgressStatusDemoHost", ProgressStatusDemo),
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
      "ColumnsBasicDemo",
      createReactDemoHost("ColumnsBasicDemoHost", ColumnsBasicDemo),
    );
    app.component(
      "ColumnsCardsDemo",
      createReactDemoHost("ColumnsCardsDemoHost", ColumnsCardsDemo),
    );
    app.component(
      "ColumnsResponsiveDemo",
      createReactDemoHost("ColumnsResponsiveDemoHost", ColumnsResponsiveDemo),
    );
    app.component(
      "MasonryBasicDemo",
      createReactDemoHost("MasonryBasicDemoHost", MasonryBasicDemo),
    );
    app.component(
      "MasonryDisabledDemo",
      createReactDemoHost("MasonryDisabledDemoHost", MasonryDisabledDemo),
    );
    app.component(
      "MasonryVariantsDemo",
      createReactDemoHost("MasonryVariantsDemoHost", MasonryVariantsDemo),
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
      "HeaderBasicDemo",
      createReactDemoHost("HeaderBasicDemoHost", HeaderBasicDemo),
    );
    app.component(
      "HeaderSlotsDemo",
      createReactDemoHost("HeaderSlotsDemoHost", HeaderSlotsDemo),
    );
    app.component(
      "HeaderStickyDemo",
      createReactDemoHost("HeaderStickyDemoHost", HeaderStickyDemo),
    );
    app.component(
      "HeaderResponsiveDemo",
      createReactDemoHost("HeaderResponsiveDemoHost", HeaderResponsiveDemo),
    );
    app.component(
      "HeaderCompoundDemo",
      createReactDemoHost("HeaderCompoundDemoHost", HeaderCompoundDemo),
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
      "SafeAreaBasicDemo",
      createReactDemoHost("SafeAreaBasicDemoHost", SafeAreaBasicDemo),
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
    app.component(
      "SplitterBasicDemo",
      createReactDemoHost("SplitterBasicDemoHost", SplitterBasicDemo),
    );
    app.component(
      "SplitterVerticalDemo",
      createReactDemoHost("SplitterVerticalDemoHost", SplitterVerticalDemo),
    );
    app.component(
      "SplitterControlledDemo",
      createReactDemoHost("SplitterControlledDemoHost", SplitterControlledDemo),
    );
    app.component(
      "SplitterComplexDemo",
      createReactDemoHost("SplitterComplexDemoHost", SplitterComplexDemo),
    );
    app.component(
      "TypographyBasicDemo",
      createReactDemoHost("TypographyBasicDemoHost", TypographyBasicDemo),
    );
    app.component(
      "TypographyVariantsDemo",
      createReactDemoHost("TypographyVariantsDemoHost", TypographyVariantsDemo),
    );
    app.component(
      "TypographySemanticDemo",
      createReactDemoHost("TypographySemanticDemoHost", TypographySemanticDemo),
    );
    app.component(
      "TypographySxDemo",
      createReactDemoHost("TypographySxDemoHost", TypographySxDemo),
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
      "NavigatorBasicDemo",
      createReactDemoHost("NavigatorBasicDemoHost", NavigatorBasicDemo),
    );
    app.component(
      "NavigatorHeaderDemo",
      createReactDemoHost("NavigatorHeaderDemoHost", NavigatorHeaderDemo),
    );
    app.component(
      "NavigatorMegaDemo",
      createReactDemoHost("NavigatorMegaDemoHost", NavigatorMegaDemo),
    );
    app.component(
      "NavigatorControlledDemo",
      createReactDemoHost("NavigatorControlledDemoHost", NavigatorControlledDemo),
    );
    app.component(
      "NavigatorCompoundDemo",
      createReactDemoHost("NavigatorCompoundDemoHost", NavigatorCompoundDemo),
    );
    app.component(
      "StepperBasicDemo",
      createReactDemoHost("StepperBasicDemoHost", StepperBasicDemo),
    );
    app.component(
      "StepperVerticalDemo",
      createReactDemoHost("StepperVerticalDemoHost", StepperVerticalDemo),
    );
    app.component(
      "StepperControlledDemo",
      createReactDemoHost("StepperControlledDemoHost", StepperControlledDemo),
    );
    app.component(
      "StepperStatusDemo",
      createReactDemoHost("StepperStatusDemoHost", StepperStatusDemo),
    );
    app.component(
      "StepperCompoundDemo",
      createReactDemoHost("StepperCompoundDemoHost", StepperCompoundDemo),
    );
    app.component(
      "TimelineBasicDemo",
      createReactDemoHost("TimelineBasicDemoHost", TimelineBasicDemo),
    );
    app.component(
      "TimelinePositionDemo",
      createReactDemoHost("TimelinePositionDemoHost", TimelinePositionDemo),
    );
    app.component(
      "TimelineCustomDemo",
      createReactDemoHost("TimelineCustomDemoHost", TimelineCustomDemo),
    );
    app.component(
      "TimelinePendingDemo",
      createReactDemoHost("TimelinePendingDemoHost", TimelinePendingDemo),
    );
    app.component(
      "TimelineSxDemo",
      createReactDemoHost("TimelineSxDemoHost", TimelineSxDemo),
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
    app.component("DevlogIndexList", DevlogIndexList);
  },
};

export default theme;


