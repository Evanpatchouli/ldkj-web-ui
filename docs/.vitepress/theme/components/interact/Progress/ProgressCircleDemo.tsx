import CodeView from "../../CodeView";
import { Progress } from "@ldkj/web-ui";

const code = `import { Progress } from "@ldkj/web-ui";

const Example = () => (
  <div className="flex flex-wrap items-center gap-6">
    <Progress type="circle" value={32} showInfo />
    <Progress type="circle" value={76} size={120} strokeWidth={10} showInfo />
    <Progress type="circle" value={100} status="success" showInfo />
  </div>
);`;

const Example = () => (
  <div className="flex flex-wrap items-center gap-6">
    <Progress type="circle" value={32} showInfo />
    <Progress type="circle" value={76} size={120} strokeWidth={10} showInfo />
    <Progress type="circle" value={100} status="success" showInfo />
  </div>
);

export default function ProgressCircleDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
