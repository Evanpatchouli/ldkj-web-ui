import CodeView from "../../CodeView";
import type * as React from "react";
import { useState } from "react";
import { TabRootPage, type PageTabDefinition } from "@ldkj/web-ui";

const tabs = [
  { id: "home", title: "首页", icon: "⌂" },
  { id: "service", title: "服务", icon: "□" },
  { id: "mine", title: "我的", icon: "○" },
] as const satisfies readonly PageTabDefinition[];

const pageStyle = {
  minHeight: 420,
  overflow: "hidden",
  border: "1px solid #d7e2f0",
  borderRadius: 12,
  boxShadow: "0 6px 18px rgba(15, 23, 42, 0.08)",
  fontSize: 12,
} satisfies React.CSSProperties;

const Example = () => {
  const [tabId, setTabId] = useState<(typeof tabs)[number]["id"]>("home");

  return (
    <div style={{ maxWidth: 320 }}>
      <TabRootPage
        title="车管家"
        tabs={tabs}
        tabId={tabId}
        onTabChange={(nextTabId) => setTabId(nextTabId)}
        style={pageStyle}
        tabContentProps={{ style: { padding: 10, display: "grid", gap: 8 } }}
        copyright="Copyright 2026 LDKJ"
      >
        <section style={{ display: "grid", gap: 6, padding: 10, borderRadius: 8, background: "#fff" }}>
          <strong>{tabs.find((tab) => tab.id === tabId)?.title}</strong>
          <span style={{ color: "#64748b", fontSize: 12 }}>底部导航只负责展示和回调，路由跳转由业务侧处理。</span>
        </section>
      </TabRootPage>
    </div>
  );
};

const code = `import { useState } from "react";
import { TabRootPage, type PageTabDefinition } from "@ldkj/web-ui";

const tabs = [
  { id: "home", title: "首页", icon: "⌂", route: "../home" },
  { id: "service", title: "服务", icon: "□", route: "../service" },
  { id: "mine", title: "我的", icon: "○", route: "../mine" },
] as const satisfies readonly PageTabDefinition[];

const Example = () => {
  const [tabId, setTabId] = useState<(typeof tabs)[number]["id"]>("home");

  return (
    <TabRootPage
      title="车管家"
      tabs={tabs}
      tabId={tabId}
      onTabChange={(nextTabId) => setTabId(nextTabId)}
      style={{
        minHeight: 420,
        overflow: "hidden",
        border: "1px solid #d7e2f0",
        borderRadius: 12,
        fontSize: 12,
      }}
      tabContentProps={{ style: { padding: 10, display: "grid", gap: 8 } }}
    >
      当前 Tab：{tabId}
    </TabRootPage>
  );
};`;

export default function MobilePageTabsDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
