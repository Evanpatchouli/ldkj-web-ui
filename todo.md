# 组件建设待办（按大版本迭代）

说明：采用本库 `PascalCase` 命名，`[x]` 表示已实现，`[ ]` 表示待实现。

## V1（核心可用）

## 基础与布局

- [x] Box
- [x] Divider
- [x] Flex
- [x] Grid
- [x] SafeArea
- [x] Space（与 Flex 组件的区别
      Space 为内联元素提供间距，其本身会为每一个子元素添加包裹元素用于内联对齐。适用于行、列中多个子元素的等距排列。
      Flex 为块级元素提供间距，其本身不会添加包裹元素。适用于垂直或水平方向上的子元素布局，并提供了更多的灵活性和控制能力。）
- [x] Col
- [x] Row

## 通用与导航

- [x] Anchor
- [x] Menu
- [x] MenuItem（作为 Menu 子组件导出，组合式 API）
- [ ] Tabs
- [x] Breadcrumb
- [ ] Pagination

## 数据展示

- [x] Card
- [x] Icon
- [x] Chip
- [ ] Avatar
- [ ] Badge
- [ ] List
- [ ] Table
- [ ] Skeleton
- [ ] Empty
- [x] QRCode

## 表单与输入

- [ ] Input
- [ ] InputNumber
- [ ] InputOPT
- [ ] AutoComplete
- [ ] Select
- [ ] Checkbox
- [ ] CheckboxGroup
- [ ] Radio
- [ ] RadioGroup
- [ ] Switch
- [ ] Rate
- [ ] Cascader
- [ ] SliderV2
- [ ] Required
- [ ] FormV2
- [ ] Uploader

## 反馈与弹层

- [x] Toast
- [ ] Message
- [ ] Notification
- [ ] Spin
- [ ] Loading（与 Spin 职责边界待定）
- [ ] Tooltip
- [ ] Popover
- [ ] Modal
- [ ] Dialog
- [ ] Drawer
- [ ] Alert
- [ ] Progress

## V2（增强能力）

## 基础与布局

- [ ] Header
- [ ] Navigator
- [ ] Steps
- [ ] Timeline
- [ ] Splitter
- [ ] Waterfalls（内部实现走 @masonry-grid/react）

## 数据展示

- [ ] Title
- [ ] Label
- [ ] Image
- [ ] Gallery
- [ ] Carousel（与 Gallery 职责区分：Carousel 负责切换容器，Gallery 负责图片浏览体验）
- [ ] Tree
- [ ] TreeSelect
- [ ] WaterMark
- [ ] Collapse
- [ ] Descriptions
- [ ] Statistic

## 表单与输入

- [ ] Calendar
- [ ] DateTimePicker
- [ ] ColorPicker
- [ ] Transfer

## 反馈与引导

- [ ] Popconfirm
- [ ] Tour

## 动效与可视化

- [ ] Circle
- [ ] Counter
- [ ] FrostedGlass
- [ ] Snake

## V3（按场景扩展）

## 导航与页面能力

- [ ] Dropdown
- [ ] Affix

## 命名与边界治理

- [ ] Loading / Spin 职责边界（容器态 vs 局部态）
- [ ] Message / Toast / Notification 职责边界
