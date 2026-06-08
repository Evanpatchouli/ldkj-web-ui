import CodeView from "../../CodeView";
import { Alert } from "@ldkj/web-ui";

const code = `import { Alert } from "@ldkj/web-ui";

const Example = () => (
  <div className="grid gap-3">
    <Alert variant="info" title="提示" description="新的对账任务已生成。" />
    <Alert variant="success" title="成功" description="保存成功，可以继续下一步。" />
    <Alert variant="warning" title="警告" description="请确认配置后再发布。" />
    <Alert variant="error" title="失败" description="请求失败，请重试。" />
  </div>
);`;

const Example = () => (
  <div className="grid gap-3">
    <Alert variant="info" title="提示" description="新的对账任务已生成。" />
    <Alert variant="success" title="成功" description="保存成功，可以继续下一步。" />
    <Alert variant="warning" title="警告" description="请确认配置后再发布。" />
    <Alert variant="error" title="失败" description="请求失败，请重试。" />
  </div>
);

export default function AlertDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
