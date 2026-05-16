import CodeView from "../../CodeView";
import { Badge } from "@ldkj/web-ui";

const Example = () => (
  <div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
    <Badge badgeContent={6}>
      <span
        style={{
          display: "inline-block",
          width: 40,
          height: 40,
          borderRadius: 999,
          background: "#e2e8f0",
        }}
      />
    </Badge>
    <Badge badgeContent={12} sx={{ transform: "scale(1.1)" }}>
      <div
        style={{
          width: 84,
          height: 36,
          borderRadius: 8,
          background: "#f1f5f9",
          display: "grid",
          placeItems: "center",
          color: "#475569",
          fontSize: 12,
        }}
      >
        卡片入口
      </div>
    </Badge>
  </div>
);

const code = `
import { Badge } from "@ldkj/web-ui";

const Example = () => (
  <div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
    <Badge badgeContent={6}>
      <span
        style={{
          display: "inline-block",
          width: 40,
          height: 40,
          borderRadius: 999,
          background: "#e2e8f0",
        }}
      />
    </Badge>
    <Badge badgeContent={12} sx={{ transform: "scale(1.1)" }}>
      <div
        style={{
          width: 84,
          height: 36,
          borderRadius: 8,
          background: "#f1f5f9",
          display: "grid",
          placeItems: "center",
          color: "#475569",
          fontSize: 12,
        }}
      >
        卡片入口
      </div>
    </Badge>
  </div>
);`;

export default function BadgeLayoutDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
