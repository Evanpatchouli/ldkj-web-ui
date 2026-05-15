import { Chip } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const roundedPresets = ["xs", "sm", "md", "lg", "xl", "full"] as const;

const code = `import { Chip } from "@ldkj/web-ui";

export function Example() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Chip rounded="xs">xs</Chip>
      <Chip rounded="sm">sm</Chip>
      <Chip rounded="full">full</Chip>
      <Chip rounded={10}>10px</Chip>
      <Chip rounded="1rem">1rem</Chip>
    </div>
  );
}`;

export default function ChipRoundedDemo() {
  return (
    <CodeView code={code}>
      <div className="flex flex-wrap items-center gap-3">
        {roundedPresets.map((rounded) => (
          <Chip key={rounded} rounded={rounded} variant="primary">
            {rounded}
          </Chip>
        ))}
        <Chip rounded={10} variant="success">
          10px
        </Chip>
        <Chip rounded="1rem" variant="warning">
          1rem
        </Chip>
        <Chip rounded="999px" variant="danger">
          999px
        </Chip>
      </div>
    </CodeView>
  );
}

