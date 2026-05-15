import { Chip } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const variants = [
  "primary",
  "success",
  "warning",
  "danger",
  "minor",
  "dark",
  "light",
  "text",
] as const;

const code = `import { Chip } from "@ldkj/web-ui";

export function Example() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Chip variant="primary">primary</Chip>
      <Chip variant="success">success</Chip>
      <Chip variant="warning">warning</Chip>
      <Chip variant="danger">danger</Chip>
    </div>
  );
}`;

export default function ChipVariantsDemo() {
  return (
    <CodeView code={code}>
      <div className="flex flex-wrap items-center gap-3">
        {variants.map((variant) => (
          <Chip key={variant} variant={variant}>
            {variant}
          </Chip>
        ))}
      </div>
    </CodeView>
  );
}

