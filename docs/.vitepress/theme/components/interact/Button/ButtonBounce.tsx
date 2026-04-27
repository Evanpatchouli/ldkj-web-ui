import { Button } from "@/index";
import CodeView from "../../CodeView";

const code = `import { Button } from "@ldkj/web-ui";

export function Example() {
  return (
    <div className="flex gap-2 items-center flex-wrap">
      <Button>Default</Button>
      <Button bounce>Bounce</Button>
    </div>
  );
}`;

export default function ButtonBounceDemo() {
  return (
    <CodeView code={code}>
      <div className="flex gap-2 items-center flex-wrap">
        <Button>Default</Button>
        <Button bounce>Bounce</Button>
      </div>
    </CodeView>
  );
}
