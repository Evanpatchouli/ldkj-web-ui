import { GhostButtonGroup } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import { GhostButtonGroup } from "@ldkj/web-ui";

export function Example() {
  return (
    <GhostButtonGroup
      aria-label="More actions"
      position="absolute"
      direction="left"
      gap={8}
      variant="warning"
      shadow="md"
    >
      ⋯

      <GhostButtonGroup.Item aria-label="Preview" variant="minor">
        P
      </GhostButtonGroup.Item>
      <GhostButtonGroup.Item aria-label="Copy" variant="outline">
        C
      </GhostButtonGroup.Item>
      <GhostButtonGroup.Item aria-label="Archive" variant="success">
        A
      </GhostButtonGroup.Item>
    </GhostButtonGroup>
  );
}`;

export default function GhostButtonGroupComposeDemo() {
  return (
    <CodeView code={code}>
      <div className="relative h-56 overflow-hidden rounded-xl border border-slate-200 bg-[linear-gradient(135deg,#fff7ed_0%,#ffedd5_100%)]">
        <div className="flex h-full items-center justify-center text-sm text-slate-500">
          Compose mode
        </div>
        <GhostButtonGroup
          aria-label="More actions"
          position="absolute"
          direction="left"
          gap={8}
          variant="warning"
          shadow="md"
        >
          ⋯

          <GhostButtonGroup.Item aria-label="Preview" variant="minor">
            P
          </GhostButtonGroup.Item>
          <GhostButtonGroup.Item aria-label="Copy" variant="outline">
            C
          </GhostButtonGroup.Item>
          <GhostButtonGroup.Item aria-label="Archive" variant="success">
            A
          </GhostButtonGroup.Item>
        </GhostButtonGroup>
      </div>
    </CodeView>
  );
}

