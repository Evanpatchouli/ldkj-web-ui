import CodeView from "../../CodeView";
import { Progress } from "@ldkj/web-ui";

const code = `import { Progress } from "@ldkj/web-ui";

const Example = () => (
  <div className="grid max-w-sm gap-4">
    <Progress value={25} />
    <Progress value={68} showInfo />
    <Progress value={100} showInfo />
  </div>
);`;

const Example = () => (
  <div className="grid max-w-sm gap-4">
    <Progress value={25} />
    <Progress value={68} showInfo />
    <Progress value={100} showInfo />
  </div>
);

export default function ProgressDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
