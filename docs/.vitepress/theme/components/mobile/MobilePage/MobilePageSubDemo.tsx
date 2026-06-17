import CodeView from "../../CodeView";
import type * as React from "react";
import { SubPage } from "@ldkj/web-ui";

const pageStyle = {
  minHeight: 390,
  overflow: "hidden",
  border: "1px solid #d7e2f0",
  borderRadius: 12,
  boxShadow: "0 6px 18px rgba(15, 23, 42, 0.08)",
  fontSize: 12,
} satisfies React.CSSProperties;

const Example = () => (
  <div style={{ maxWidth: 320 }}>
    <SubPage
      title="订单详情"
      onBack={() => undefined}
      headerRight={<button style={{ fontSize: 12 }}>分享</button>}
      style={pageStyle}
      contentProps={{ style: { padding: 10, gap: 8 } }}
    >
      <section style={{ display: "grid", gap: 6, padding: 10, borderRadius: 8, background: "#fff" }}>
        <strong>沪 A12345</strong>
        <span style={{ color: "#64748b", fontSize: 12 }}>年检服务已预约，服务顾问将在 10:30 前联系车主。</span>
      </section>
      <section style={{ display: "grid", gap: 6, padding: 10, borderRadius: 8, background: "#fff" }}>
        <strong>服务进度</strong>
        <span style={{ color: "#64748b", fontSize: 12 }}>资料确认中，预计 1 个工作日完成。</span>
      </section>
    </SubPage>
  </div>
);

const code = `import { SubPage } from "@ldkj/web-ui";

const Example = () => (
  <SubPage
    title="订单详情"
    onBack={(target) => console.log(target)}
    headerRight={<button style={{ fontSize: 12 }}>分享</button>}
    style={{
      minHeight: 390,
      overflow: "hidden",
      border: "1px solid #d7e2f0",
      borderRadius: 12,
      fontSize: 12,
    }}
    contentProps={{ style: { padding: 10, gap: 8 } }}
  >
    <section style={{ padding: 10, borderRadius: 8, background: "#fff" }}>
      <strong>沪 A12345</strong>
      <p>年检服务已预约，服务顾问将在 10:30 前联系车主。</p>
    </section>
  </SubPage>
);`;

export default function MobilePageSubDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
