import { Button } from "@/index";
import CodeView from "../../CodeView";

const code = `import { Button } from "@ldkj/web-ui";

export function Example() {
  return (
    <div className="flex gap-2 items-center flex-wrap">
      <Button>Default</Button>
      <Button splash>Splash</Button>
    </div>
  );
}`;

export default function ButtonSplashDemo() {
  return (
    <CodeView code={code}>
      <div className="flex gap-2 items-center flex-wrap">
        <Button>Default</Button>
        <Button splash>Splash</Button>
      </div>
    </CodeView>
  );
}
