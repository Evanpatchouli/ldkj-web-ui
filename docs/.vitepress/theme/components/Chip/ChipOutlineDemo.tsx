import { Chip } from "@/components/ui/chip";
import CodeView from "../CodeView";

const variants = ["primary", "success", "warning", "danger"] as const;

const code = `import { Chip } from "@ldkj/web-ui";

export function Example() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Chip variant="primary" outline>primary</Chip>
      <Chip variant="success" outline>success</Chip>
      <Chip variant="warning" outline>warning</Chip>
      <Chip variant="danger" outline>danger</Chip>
    </div>
  );
}`;

export default function ChipOutlineDemo() {
  return (
    <CodeView code={code}>
      <div className="flex flex-wrap items-center gap-3">
        {variants.map((variant) => (
          <Chip key={variant} variant={variant} outline>
            {variant}
          </Chip>
        ))}
      </div>
    </CodeView>
  );
}
