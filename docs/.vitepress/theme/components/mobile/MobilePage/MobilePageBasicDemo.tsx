import CodeView from "../../CodeView";
import type * as React from "react";
import { RootPage } from "@ldkj/web-ui";

const pageStyle = {
  minHeight: 420,
  overflow: "hidden",
  border: "1px solid #d7e2f0",
  borderRadius: 12,
  boxShadow: "0 6px 18px rgba(15, 23, 42, 0.08)",
  fontSize: 12,
} satisfies React.CSSProperties;

const Example = () => (
  <div style={{ maxWidth: 320 }}>
    <RootPage
      title="服务首页"
      headerRight={<button style={{ fontSize: 12 }}>客服</button>}
      style={pageStyle}
      contentProps={{ style: { padding: 10, gap: 8 } }}
      copyright="Copyright 2026 LDKJ"
    >
      <section style={{ display: "grid", gap: 6, padding: 10, borderRadius: 8, background: "#fff" }}>
        <strong>车辆服务</strong>
        <span style={{ color: "#64748b", fontSize: 12 }}>集中展示保养、年检、违章和保险续费入口。</span>
      </section>
      <section style={{ display: "grid", gap: 6, padding: 10, borderRadius: 8, background: "#fff" }}>
        <strong>待办提醒</strong>
        <span style={{ color: "#64748b", fontSize: 12 }}>2 辆车即将到期，建议本周内处理。</span>
      </section>
    </RootPage>
  </div>
);

const code = `import { RootPage } from "@ldkj/web-ui";

const Example = () => (
  <RootPage
    title="服务首页"
    headerRight={<button style={{ fontSize: 12 }}>客服</button>}
    style={{
      minHeight: 420,
      overflow: "hidden",
      border: "1px solid #d7e2f0",
      borderRadius: 12,
      fontSize: 12,
    }}
    contentProps={{ style: { padding: 10, gap: 8 } }}
    copyright="Copyright 2026 LDKJ"
  >
    <section style={{ padding: 10, borderRadius: 8, background: "#fff" }}>
      <strong>车辆服务</strong>
      <p>集中展示保养、年检、违章和保险续费入口。</p>
    </section>
  </RootPage>
);`;

export default function MobilePageBasicDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
