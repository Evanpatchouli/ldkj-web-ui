import { Chip } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

const code = `import { Chip } from "@ldkj/web-ui";

export function Example() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Chip size="xs">xs</Chip>
      <Chip size="sm">sm</Chip>
      <Chip size="md">md</Chip>
      <Chip size="lg">lg</Chip>
      <Chip size="xl">xl</Chip>
    </div>
  );
}`;

export default function ChipSizesDemo() {
  return (
    <CodeView code={code}>
      <div className="flex flex-wrap items-center gap-3">
        {sizes.map((size) => (
          <Chip key={size} size={size} variant="primary">
            {size}
          </Chip>
        ))}
      </div>
    </CodeView>
  );
}

