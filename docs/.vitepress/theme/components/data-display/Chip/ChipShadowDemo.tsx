import { Chip } from "@/components/data-display/chip";
import CodeView from "../../CodeView";

const shadowPresets = ["none", "xs", "sm", "md", "lg", "xl"] as const;

const code = `import { Chip } from "@ldkj/web-ui";

export function Example() {
  return (
    <div className="flex flex-wrap gap-3">
      <Chip shadow="sm">sm</Chip>
      <Chip shadow="lg">lg</Chip>
      <Chip shadow="0 10px 24px rgba(34, 197, 94, 0.22)">custom</Chip>
    </div>
  );
}`;

export default function ChipShadowDemo() {
  return (
    <CodeView code={code}>
      <div className="flex flex-wrap gap-3">
        {shadowPresets.map((shadow) => (
          <Chip key={shadow} shadow={shadow} variant="primary">
            {shadow}
          </Chip>
        ))}
        <Chip shadow="0 10px 24px rgba(34, 197, 94, 0.22)" variant="success">
          custom
        </Chip>
      </div>
    </CodeView>
  );
}
