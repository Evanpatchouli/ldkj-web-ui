import CodeView from "../../CodeView";
import { Progress } from "@ldkj/web-ui";

const code = `import { Progress } from "@ldkj/web-ui";

const Example = () => (
  <div className="grid max-w-sm gap-4">
    <Progress value={45} showInfo status="normal" />
    <Progress value={72} showInfo status="warning" />
    <Progress value={30} showInfo status="exception" />
    <Progress
      value={18}
      max={24}
      showInfo
      format={(percent, value, max) => \`\${value}/\${max} 人 · \${percent}%\`}
    />
  </div>
);`;

const Example = () => (
  <div className="grid max-w-sm gap-4">
    <Progress value={45} showInfo status="normal" />
    <Progress value={72} showInfo status="warning" />
    <Progress value={30} showInfo status="exception" />
    <Progress
      value={18}
      max={24}
      showInfo
      format={(percent, value, max) => `${value}/${max} 人 · ${percent}%`}
    />
  </div>
);

export default function ProgressStatusDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
