import CodeView from "../../CodeView";
import { Timeline } from "@ldkj/web-ui";

const Example = () => (
  <Timeline position="alternate" hideLastConnector={false}>
    <Timeline.Item>
      <Timeline.OppositeContent>08:50</Timeline.OppositeContent>
      <Timeline.Separator>
        <Timeline.Dot color="success" variant="soft">
          1
        </Timeline.Dot>
        <Timeline.Connector />
      </Timeline.Separator>
      <Timeline.Content>
        <strong>系统检测通过</strong>
        <div style={{ color: "var(--ldkj-color-muted-foreground)" }}>
          关键任务、库存和审批人配置均已校验。
        </div>
      </Timeline.Content>
    </Timeline.Item>
    <Timeline.Item>
      <Timeline.OppositeContent>09:20</Timeline.OppositeContent>
      <Timeline.Separator>
        <Timeline.Dot color="warning" variant="outlined">
          2
        </Timeline.Dot>
        <Timeline.Connector />
      </Timeline.Separator>
      <Timeline.Content>
        <strong>等待人工确认</strong>
        <div style={{ color: "var(--ldkj-color-muted-foreground)" }}>
          需要运营确认配送窗口和短信模板。
        </div>
      </Timeline.Content>
    </Timeline.Item>
  </Timeline>
);

const code = `import { Timeline } from "@ldkj/web-ui";

export function Example() {
  return (
    <Timeline position="alternate" hideLastConnector={false}>
      <Timeline.Item>
        <Timeline.OppositeContent>08:50</Timeline.OppositeContent>
        <Timeline.Separator>
          <Timeline.Dot color="success" variant="soft">
            1
          </Timeline.Dot>
          <Timeline.Connector />
        </Timeline.Separator>
        <Timeline.Content>
          <strong>系统检测通过</strong>
          <div style={{ color: "var(--ldkj-color-muted-foreground)" }}>
            关键任务、库存和审批人配置均已校验。
          </div>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.OppositeContent>09:20</Timeline.OppositeContent>
        <Timeline.Separator>
          <Timeline.Dot color="warning" variant="outlined">
            2
          </Timeline.Dot>
          <Timeline.Connector />
        </Timeline.Separator>
        <Timeline.Content>
          <strong>等待人工确认</strong>
          <div style={{ color: "var(--ldkj-color-muted-foreground)" }}>
            需要运营确认配送窗口和短信模板。
          </div>
        </Timeline.Content>
      </Timeline.Item>
    </Timeline>
  );
}`;

export default function TimelineCustomDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
