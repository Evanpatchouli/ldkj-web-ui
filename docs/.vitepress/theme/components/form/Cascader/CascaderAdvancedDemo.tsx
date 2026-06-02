import * as React from "react";
import { Cascader, type CascaderOption } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const changeOnSelectOptions: CascaderOption[] = [
  {
    label: "研发中心",
    value: "rd",
    children: [
      {
        label: "前端组",
        value: "frontend",
        children: [
          { label: "基础平台", value: "platform" },
          { label: "体验设计", value: "ux" },
        ],
      },
      {
        label: "后端组",
        value: "backend",
        children: [
          { label: "交易链路", value: "trade" },
          { label: "数据中台", value: "data" },
        ],
      },
    ],
  },
  {
    label: "产品中心",
    value: "product",
    children: [
      { label: "B 端", value: "b2b" },
      { label: "C 端", value: "b2c" },
    ],
  },
];

const initialLazyOptions: CascaderOption[] = [
  { label: "亚洲", value: "asia", isLeaf: false },
  { label: "欧洲", value: "europe", isLeaf: false },
];

function appendChildren(
  nodes: CascaderOption[],
  targetValue: string,
  children: CascaderOption[],
): CascaderOption[] {
  return nodes.map((node) => {
    if (node.value === targetValue) {
      return {
        ...node,
        children,
      };
    }

    if (node.children?.length) {
      return {
        ...node,
        children: appendChildren(node.children, targetValue, children),
      };
    }

    return node;
  });
}

const Example = () => {
  const [lazyOptions, setLazyOptions] = React.useState(initialLazyOptions);

  const loadData = React.useCallback(async (selectedOptions: CascaderOption[]) => {
    const target = selectedOptions[selectedOptions.length - 1];

    if (!target?.value) {
      return;
    }

    await new Promise((resolve) => window.setTimeout(resolve, 420));

    const children =
      target.value === "asia"
        ? [
            { label: "中国", value: "china" },
            { label: "日本", value: "japan" },
            { label: "新加坡", value: "singapore" },
          ]
        : [
            { label: "法国", value: "france" },
            { label: "德国", value: "germany" },
            { label: "意大利", value: "italy" },
          ];

    setLazyOptions((current) => appendChildren(current, target.value!, children));
  }, []);

  return (
    <div style={{ display: "grid", gap: 20 }}>
      <section style={{ display: "grid", gap: 10 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>
          changeOnSelect
        </div>
        <div style={{ maxWidth: 460 }}>
          <Cascader
            options={changeOnSelectOptions}
            placeholder="选择后即可提交当前路径"
            changeOnSelect
            clearable
          />
        </div>
      </section>

      <section style={{ display: "grid", gap: 10 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>
          懒加载 + 自定义渲染
        </div>
        <div style={{ maxWidth: 460 }}>
          <Cascader
            options={lazyOptions}
            placeholder="点击城市节点加载子项"
            loadData={loadData}
            clearable
            renderOption={(option, state) => (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <span>{option.label}</span>
                {state.loading ? (
                  <span style={{ fontSize: 12, color: "#2563eb" }}>加载中</span>
                ) : state.checked ? (
                  <span style={{ fontSize: 12, color: "#2563eb" }}>已选</span>
                ) : state.active ? (
                  <span style={{ fontSize: 12, color: "#64748b" }}>展开中</span>
                ) : null}
              </span>
            )}
            displayRender={(labels) => (
              <span style={{ color: "#0f172a" }}>{labels.join(" / ")}</span>
            )}
          />
        </div>
      </section>
    </div>
  );
};

const code = `import * as React from "react";
import { Cascader } from "@ldkj/web-ui";

const changeOnSelectOptions = [
  {
    label: "研发中心",
    value: "rd",
    children: [
      {
        label: "前端组",
        value: "frontend",
        children: [
          { label: "基础平台", value: "platform" },
          { label: "体验设计", value: "ux" },
        ],
      },
      {
        label: "后端组",
        value: "backend",
        children: [
          { label: "交易链路", value: "trade" },
          { label: "数据中台", value: "data" },
        ],
      },
    ],
  },
  {
    label: "产品中心",
    value: "product",
    children: [
      { label: "B 端", value: "b2b" },
      { label: "C 端", value: "b2c" },
    ],
  },
];

const initialLazyOptions = [
  { label: "亚洲", value: "asia", isLeaf: false },
  { label: "欧洲", value: "europe", isLeaf: false },
];

function appendChildren(nodes, targetValue, children) {
  return nodes.map((node) => {
    if (node.value === targetValue) {
      return { ...node, children };
    }

    if (node.children?.length) {
      return {
        ...node,
        children: appendChildren(node.children, targetValue, children),
      };
    }

    return node;
  });
}

export function Example() {
  const [lazyOptions, setLazyOptions] = React.useState(initialLazyOptions);

  const loadData = React.useCallback(async (selectedOptions) => {
    const target = selectedOptions[selectedOptions.length - 1];

    if (!target?.value) {
      return;
    }

    await new Promise((resolve) => window.setTimeout(resolve, 420));

    const children =
      target.value === "asia"
        ? [
            { label: "中国", value: "china" },
            { label: "日本", value: "japan" },
            { label: "新加坡", value: "singapore" },
          ]
        : [
            { label: "法国", value: "france" },
            { label: "德国", value: "germany" },
            { label: "意大利", value: "italy" },
          ];

    setLazyOptions((current) => appendChildren(current, target.value, children));
  }, []);

  return (
    <div style={{ display: "grid", gap: 20 }}>
      <section style={{ display: "grid", gap: 10 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>
          changeOnSelect
        </div>
        <div style={{ maxWidth: 460 }}>
          <Cascader
            options={changeOnSelectOptions}
            placeholder="选择后即可提交当前路径"
            changeOnSelect
            clearable
          />
        </div>
      </section>

      <section style={{ display: "grid", gap: 10 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>
          懒加载 + 自定义渲染
        </div>
        <div style={{ maxWidth: 460 }}>
          <Cascader
            options={lazyOptions}
            placeholder="点击城市节点加载子项"
            loadData={loadData}
            clearable
            renderOption={(option, state) => (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <span>{option.label}</span>
                {state.loading ? (
                  <span style={{ fontSize: 12, color: "#2563eb" }}>加载中</span>
                ) : state.checked ? (
                  <span style={{ fontSize: 12, color: "#2563eb" }}>已选</span>
                ) : state.active ? (
                  <span style={{ fontSize: 12, color: "#64748b" }}>展开中</span>
                ) : null}
              </span>
            )}
            displayRender={(labels) => (
              <span style={{ color: "#0f172a" }}>{labels.join(" / ")}</span>
            )}
          />
        </div>
      </section>
    </div>
  );
}`;

export default function CascaderAdvancedDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
