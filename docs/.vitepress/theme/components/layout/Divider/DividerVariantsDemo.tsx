import { Divider } from "@/index";
import CodeView from "../../CodeView";

const variants = ["full", "middle", "inset"] as const;

const code = `import { Divider } from "@ldkj/web-ui";

export function Example() {
  return (
    <div className="space-y-4">
      <Divider variant="full" />
      <Divider variant="middle" />
      <Divider variant="inset" />
    </div>
  );
}`;

export default function DividerVariantsDemo() {
  return (
    <CodeView code={code}>
      <div className="space-y-4">
        {variants.map((variant) => (
          <div key={variant} className="space-y-2">
            <div className="text-xs text-gray-500">{variant}</div>
            <Divider variant={variant} />
          </div>
        ))}
      </div>
    </CodeView>
  );
}
