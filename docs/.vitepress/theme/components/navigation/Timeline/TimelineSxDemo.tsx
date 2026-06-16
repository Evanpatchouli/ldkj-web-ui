import CodeView from "../../CodeView";
import { Timeline } from "@ldkj/web-ui";

const Example = () => (
  <Timeline
    position="right"
    color="success"
    items={[
      { oppositeContent: "Step 1", content: "生成对账单" },
      { oppositeContent: "Step 2", content: "推送给财务确认" },
      { oppositeContent: "Step 3", content: "回写付款结果" },
    ]}
    sx={{
      padding: 16,
      border: "1px solid var(--ldkj-color-border)",
      borderRadius: "var(--ldkj-radius-md)",
      background: "var(--ldkj-color-surface)",
      ".timeline-content": {
        padding: "0 0 0 4px",
      },
      ".timeline-opposite-content": {
        fontWeight: 600,
      },
    }}
  />
);

const code = `import { Timeline } from "@ldkj/web-ui";

export function Example() {
  return (
    <Timeline
      position="right"
      color="success"
      items={[
        { oppositeContent: "Step 1", content: "生成对账单" },
        { oppositeContent: "Step 2", content: "推送给财务确认" },
        { oppositeContent: "Step 3", content: "回写付款结果" },
      ]}
      sx={{
        padding: 16,
        border: "1px solid var(--ldkj-color-border)",
        borderRadius: "var(--ldkj-radius-md)",
        background: "var(--ldkj-color-surface)",
        ".timeline-content": {
          padding: "0 0 0 4px",
        },
        ".timeline-opposite-content": {
          fontWeight: 600,
        },
      }}
    />
  );
}`;

export default function TimelineSxDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
