import CodeView from "../../CodeView";
import { Button, Collapse } from "@ldkj/web-ui";

const code = `import { Button, Collapse } from "@ldkj/web-ui";

export function Example() {
  return (
    <Collapse defaultActiveKey="contract">
      <Collapse.Item value="contract">
        <Collapse.Header>
          <Collapse.Trigger>合同资料</Collapse.Trigger>
          <Collapse.Actions>
            <Button size="xs" variant="ghost">
              预览
            </Button>
            <Button size="xs" variant="ghost">
              下载
            </Button>
          </Collapse.Actions>
        </Collapse.Header>
        <Collapse.Content>
          合同编号 HT20260609001，签署主体为杭州某某科技有限公司。
        </Collapse.Content>
      </Collapse.Item>
      <Collapse.Item value="approval">
        <Collapse.Header>
          <Collapse.Trigger>审批记录</Collapse.Trigger>
          <Collapse.Actions>
            <span className="rounded bg-green-50 px-2 py-1 text-xs text-green-700">
              已通过
            </span>
          </Collapse.Actions>
        </Collapse.Header>
        <Collapse.Content>
          业务负责人、财务负责人和法务负责人均已完成审批。
        </Collapse.Content>
      </Collapse.Item>
    </Collapse>
  );
}`;

function Example() {
  return (
    <Collapse defaultActiveKey="contract">
      <Collapse.Item value="contract">
        <Collapse.Header>
          <Collapse.Trigger>合同资料</Collapse.Trigger>
          <Collapse.Actions>
            <Button size="xs" variant="ghost">
              预览
            </Button>
            <Button size="xs" variant="ghost">
              下载
            </Button>
          </Collapse.Actions>
        </Collapse.Header>
        <Collapse.Content>
          合同编号 HT20260609001，签署主体为杭州某某科技有限公司。
        </Collapse.Content>
      </Collapse.Item>
      <Collapse.Item value="approval">
        <Collapse.Header>
          <Collapse.Trigger>审批记录</Collapse.Trigger>
          <Collapse.Actions>
            <span className="rounded bg-green-50 px-2 py-1 text-xs text-green-700">
              已通过
            </span>
          </Collapse.Actions>
        </Collapse.Header>
        <Collapse.Content>
          业务负责人、财务负责人和法务负责人均已完成审批。
        </Collapse.Content>
      </Collapse.Item>
    </Collapse>
  );
}

export default function CollapseActionsDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}

