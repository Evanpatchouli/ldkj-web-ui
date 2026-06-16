import CodeView from "../../CodeView";
import { Timeline } from "@ldkj/web-ui";

const items = [
  { oppositeContent: "2026-06-01", content: "需求评审完成" },
  { oppositeContent: "2026-06-04", content: "完成接口联调" },
  { oppositeContent: "2026-06-08", content: "灰度发布到华东区域" },
  { oppositeContent: "2026-06-12", content: "全量发布并归档" },
];

const Example = () => (
  <div style={{ display: "grid", gap: 28 }}>
    <Timeline items={items} position="alternate" />
    <Timeline
      items={items.slice(0, 3)}
      position="left"
      variant="outlined"
      color="neutral"
    />
  </div>
);

const code = `import { Timeline } from "@ldkj/web-ui";

const items = [
  { oppositeContent: "2026-06-01", content: "需求评审完成" },
  { oppositeContent: "2026-06-04", content: "完成接口联调" },
  { oppositeContent: "2026-06-08", content: "灰度发布到华东区域" },
  { oppositeContent: "2026-06-12", content: "全量发布并归档" },
];

export function Example() {
  return (
    <div style={{ display: "grid", gap: 28 }}>
      <Timeline items={items} position="alternate" />
      <Timeline
        items={items.slice(0, 3)}
        position="left"
        variant="outlined"
        color="neutral"
      />
    </div>
  );
}`;

export default function TimelinePositionDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
