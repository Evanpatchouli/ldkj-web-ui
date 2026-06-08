import CodeView from "../../CodeView";
import { Alert, Button } from "@ldkj/web-ui";

const code = `import { Alert, Button } from "@ldkj/web-ui";

const Example = () => (
  <Alert
    showIcon
    variant="warning"
    title="额度即将用尽"
    description="当前批次剩余额度不足 10%，建议及时补充。"
    action={<Button size="sm">查看明细</Button>}
  />
);`;

const Example = () => (
  <Alert
    showIcon
    variant="warning"
    title="额度即将用尽"
    description="当前批次剩余额度不足 10%，建议及时补充。"
    action={<Button size="sm">查看明细</Button>}
  />
);

export default function AlertActionDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
