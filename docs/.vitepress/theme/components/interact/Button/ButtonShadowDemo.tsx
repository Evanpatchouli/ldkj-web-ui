import { Button } from "@/index";
import CodeView from "../../CodeView";

const shadowPresets = ["none", "xs", "sm", "md", "lg", "xl"] as const;

const code = `import { Button } from "@ldkj/web-ui";

export function Example() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button shadow="sm">sm</Button>
      <Button shadow="lg">lg</Button>
      <Button shadow="0 12px 30px rgba(37, 99, 235, 0.25)">custom</Button>
    </div>
  );
}`;

export default function ButtonShadowDemo() {
  return (
    <CodeView code={code}>
      <div className="flex flex-wrap gap-3">
        {shadowPresets.map((shadow) => (
          <Button key={shadow} shadow={shadow}>
            {shadow}
          </Button>
        ))}
        <Button shadow="0 12px 30px rgba(37, 99, 235, 0.25)">custom</Button>
      </div>
    </CodeView>
  );
}
