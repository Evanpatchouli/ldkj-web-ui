# 文档贡献指南

本指南用于统一组件文档与 Demo 的编写方式，确保内容可用、可维护、可验证。

## 文档结构要求

每个组件文档建议至少包含以下章节：

1. `Basic`：最小可用示例
2. `常见场景`：2~4 个业务高频场景
3. `Usage`：可复制的完整示例
4. `API`：属性表
5. `行为规则 / 优先级`：状态流、冲突处理顺序
6. `Notes`：边界情况、限制、最佳实践

复杂组件（如 Image / Table / Form / Modal）必须补充：

- 组合能力之间的关系与优先级
- 默认值与覆盖规则
- 可访问性（A11Y）约束
- 性能建议

## Demo 规范

每个 Demo 文件统一为三段结构：

1. `Example`：真实渲染内容
2. `code`：与 Example 完全一致（含 import）
3. `export default Demo`：通过 `CodeView` 包裹

统一模板：

```tsx
import CodeView from "../../CodeView";
import { Badge, Button } from "@ldkj/web-ui";

const Example = () => (
  <div style={{ display: "grid", gap: 16 }}>
    <div style={{ display: "flex", gap: 16 }}>
      <Badge badgeContent={8}>
        <Button size="sm">消息</Button>
      </Badge>
      <Badge badgeContent={120} max={99}>
        <Button size="sm">系统</Button>
      </Badge>
      <Badge badgeContent={0} showZero>
        <Button size="sm">通知</Button>
      </Badge>
    </div>
    <div style={{ display: "flex", gap: 16 }}>
      <Badge dot variant="danger">
        <Button size="sm">更新</Button>
      </Badge>
      <Badge badgeContent="NEW" variant="success">
        <Button size="sm">活动</Button>
      </Badge>
    </div>
  </div>
);

const code = `
import { Badge, Button } from "@ldkj/web-ui";

const Example = () => (
  <div style={{ display: "grid", gap: 16 }}>
    <div style={{ display: "flex", gap: 16 }}>
      <Badge badgeContent={8}>
        <Button size="sm">消息</Button>
      </Badge>
      <Badge badgeContent={120} max={99}>
        <Button size="sm">系统</Button>
      </Badge>
      <Badge badgeContent={0} showZero>
        <Button size="sm">通知</Button>
      </Badge>
    </div>
    <div style={{ display: "flex", gap: 16 }}>
      <Badge dot variant="danger">
        <Button size="sm">更新</Button>
      </Badge>
      <Badge badgeContent="NEW" variant="success">
        <Button size="sm">活动</Button>
      </Badge>
    </div>
  </div>
);`;

export default function BadgeBasicDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
```

## Image 类组件专项

Image 文档除通用章节外，必须明确：

1. 失败链路优先级：`retry -> fallbackSrc -> fallback`
2. 资源协商：`sources / formats / responsiveWidths / loader / sizes`
3. 预览交互：打开、关闭、缩放、拖拽、键盘
4. A11Y：`alt` 规则、dialog 语义、焦点行为
5. 性能建议：懒加载、异步解码、比例占位防 CLS

## 文档变更验收

每次文档或 Demo 修改后至少执行：

1. `pnpm -s tsc --noEmit --ignoreDeprecations 5.0`
2. `pnpm -s build:docs`
3. 本地页面可视化检查（Demo 正常渲染，无未注册标签残留）
4. 复杂交互组件补自动化断言（如 Playwright）

## 编码要求

所有文本文件必须使用 **UTF-8 无 BOM**：

- 禁止写入 UTF-8 BOM（`EF BB BF`）
- 禁止依赖系统默认编码
- 修改后抽查触碰文件是否含 BOM
