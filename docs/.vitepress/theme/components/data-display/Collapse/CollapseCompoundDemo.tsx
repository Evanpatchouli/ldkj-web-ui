import CodeView from "../../CodeView";
import { Collapse } from "@ldkj/web-ui";

const code = `import { Collapse } from "@ldkj/web-ui";

export function Example() {
  return (
    <Collapse defaultActiveKey="summary">
      <Collapse.Item value="summary">
        <Collapse.Header headingLevel={3}>
          <Collapse.Trigger>运营摘要</Collapse.Trigger>
        </Collapse.Header>
        <Collapse.Content>
          <div className="grid gap-2">
            <div>今日新增订单 326 单，支付转化率 42.8%。</div>
            <div>退款率较昨日下降 1.3%，整体处于健康区间。</div>
          </div>
        </Collapse.Content>
      </Collapse.Item>
      <Collapse.Item value="warning">
        <Collapse.Header headingLevel={3}>
          <Collapse.Trigger>异常提醒</Collapse.Trigger>
        </Collapse.Header>
        <Collapse.Content>
          华东仓有 8 个订单超过 24 小时未出库，建议优先排查库存锁定状态。
        </Collapse.Content>
      </Collapse.Item>
    </Collapse>
  );
}`;

function Example() {
  return (
    <Collapse defaultActiveKey="summary">
      <Collapse.Item value="summary">
        <Collapse.Header headingLevel={3}>
          <Collapse.Trigger>运营摘要</Collapse.Trigger>
        </Collapse.Header>
        <Collapse.Content>
          <div className="grid gap-2">
            <div>今日新增订单 326 单，支付转化率 42.8%。</div>
            <div>退款率较昨日下降 1.3%，整体处于健康区间。</div>
          </div>
        </Collapse.Content>
      </Collapse.Item>
      <Collapse.Item value="warning">
        <Collapse.Header headingLevel={3}>
          <Collapse.Trigger>异常提醒</Collapse.Trigger>
        </Collapse.Header>
        <Collapse.Content>
          华东仓有 8 个订单超过 24 小时未出库，建议优先排查库存锁定状态。
        </Collapse.Content>
      </Collapse.Item>
    </Collapse>
  );
}

export default function CollapseCompoundDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}

