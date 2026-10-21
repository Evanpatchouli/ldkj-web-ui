import CodeView from "../../CodeView";
import type * as React from "react";
import { RootPage } from "@ldkj/web-ui";

const pageStyle = {
  minHeight: 380,
  overflow: "hidden",
  border: "1px solid #d7e2f0",
  borderRadius: 12,
  boxShadow: "0 6px 18px rgba(15, 23, 42, 0.08)",
  fontSize: 12,
} satisfies React.CSSProperties;

const Example = () => (
  <div style={{ maxWidth: 320 }}>
    <RootPage
      title="下拉刷新"
      onPullRefresh={() => new Promise((resolve) => window.setTimeout(resolve, 900))}
      style={pageStyle}
      contentProps={{ style: { padding: 10, gap: 8, overflowY: "auto" } }}
    >
      <section style={{ display: "grid", gap: 6, padding: 10, borderRadius: 8, background: "#fff" }}>
        <strong>手机端查看效果</strong>
        <span style={{ color: "#64748b", fontSize: 12 }}>请在手机端或浏览器移动设备模式下，从页头或内容顶部向下拖动。</span>
      </section>
      {Array.from({ length: 3 }).map((_, index) => (
        <section
          key={index}
          style={{ display: "grid", gap: 6, padding: 10, borderRadius: 8, background: "#fff" }}
        >
          <strong>服务动态 {index + 1}</strong>
          <span style={{ color: "#64748b", fontSize: 12 }}>拖动距离达到阈值后松手，会进入刷新中状态。</span>
        </section>
      ))}
    </RootPage>
  </div>
);

const code = `import { RootPage } from "@ldkj/web-ui";

const Example = () => (
  <RootPage
    title="下拉刷新"
    onPullRefresh={() => fetch("/api/refresh")}
    style={{
      minHeight: 380,
      overflow: "hidden",
      border: "1px solid #d7e2f0",
      borderRadius: 12,
      fontSize: 12,
    }}
    contentProps={{ style: { padding: 10, gap: 8, overflowY: "auto" } }}
  >
    <section style={{ padding: 10, borderRadius: 8, background: "#fff" }}>
      <strong>手机端查看效果</strong>
      <p>请在手机端或浏览器移动设备模式下，从页头或内容顶部向下拖动。</p>
    </section>
  </RootPage>
);`;

export default function MobilePageRefreshDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
