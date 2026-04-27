import { GhostButtonGroup } from "@/index";
import CodeView from "../../CodeView";

const code = `import { GhostButtonGroup } from "@ldkj/web-ui";

function Example() {
  return (
    <div className="relative h-56 rounded-xl border border-dashed border-slate-300 bg-slate-50">
      <div className="flex h-full items-center justify-center text-sm text-slate-500">Click the trigger button</div>
      <GhostButtonGroup
        aria-label="Quick actions"
        position="absolute"
        variant="primary"
        shadow="lg"
        items={[
          { "aria-label": "Edit", variant: "secondary", children: "1" },
          { "aria-label": "Share", variant: "outline", children: "2" },
          { "aria-label": "Delete", variant: "danger", children: "3" },
        ]}
      >
        +
      </GhostButtonGroup>
    </div>
  );
}`;

function Example() {
  return (
    <div className="relative h-56 rounded-xl border border-dashed border-slate-300 bg-slate-50">
      <div className="flex h-full items-center justify-center text-sm text-slate-500">Click the trigger button</div>
      <GhostButtonGroup
        aria-label="Quick actions"
        position="absolute"
        variant="primary"
        shadow="lg"
        items={[
          { "aria-label": "Edit", variant: "secondary", children: "1" },
          { "aria-label": "Share", variant: "outline", children: "2" },
          { "aria-label": "Delete", variant: "danger", children: "3" },
        ]}
      >
        +
      </GhostButtonGroup>
    </div>
  );
}

export default function GhostButtonGroupBasicDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
