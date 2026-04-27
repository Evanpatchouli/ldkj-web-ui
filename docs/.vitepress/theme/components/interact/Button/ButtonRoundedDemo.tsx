import { Button } from "@/index";
import CodeView from "../../CodeView";

const roundedPresets = ["xs", "sm", "md", "lg", "xl", "full"] as const;

const code = `import { Button } from "@ldkj/web-ui";

export function Example() {
  return (
    <div className="flex gap-2 items-center flex-wrap">
      <Button rounded="xs">xs</Button>
      <Button rounded="sm">sm</Button>
      <Button rounded="md">md</Button>
      <Button rounded="lg">lg</Button>
      <Button rounded="xl">xl</Button>
      <Button rounded="full">full</Button>
      <Button rounded={12}>12px</Button>
      <Button rounded="1.25rem">1.25rem</Button>
    </div>
  );
}`;

export default function ButtonRoundedDemo() {
  return (
    <CodeView code={code}>
      <div className="flex gap-2 items-center flex-wrap">
        {roundedPresets.map((rounded) => (
          <Button key={rounded} rounded={rounded}>
            {rounded}
          </Button>
        ))}
        <Button rounded={12}>12px</Button>
        <Button rounded="1.25rem">1.25rem</Button>
        <Button rounded="50%">50%</Button>
      </div>
    </CodeView>
  );
}
