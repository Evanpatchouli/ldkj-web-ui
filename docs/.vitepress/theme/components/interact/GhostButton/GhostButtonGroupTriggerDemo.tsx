import { GhostButtonGroup } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import { GhostButtonGroup } from "@ldkj/web-ui";

export function Example() {
  return (
    <>
      <GhostButtonGroup
        trigger="hover"
        data-ghost-button-group-trigger="hover"
        direction="right"
        position="static"
        variant="secondary"
        gap={10}
        items={[
          { "aria-label": "Favorite", children: "F" },
          { "aria-label": "Pin", children: "P" },
        ]}
      >
        H
      </GhostButtonGroup>

      <GhostButtonGroup
        trigger={["click", "hover"]}
        direction="down"
        position="static"
        variant="dark"
        gap="0.75rem"
        items={[
          { "aria-label": "Top", children: "T" },
          { "aria-label": "Middle", children: "M" },
        ]}
      >
        C
      </GhostButtonGroup>
    </>
  );
}`;

export default function GhostButtonGroupTriggerDemo() {
  return (
    <CodeView code={code}>
      <div className="flex flex-wrap items-start gap-8">
        <div className="flex flex-col gap-3">
          <div className="text-xs text-slate-500">Hover + right</div>
          <GhostButtonGroup
            trigger="hover"
            data-ghost-button-group-trigger="hover"
            direction="right"
            position="static"
            variant="secondary"
            gap={10}
            items={[
              { "aria-label": "Favorite", children: "F" },
              { "aria-label": "Pin", children: "P" },
            ]}
          >
            H
          </GhostButtonGroup>
        </div>

        <div className="flex flex-col gap-3">
          <div className="text-xs text-slate-500">Click + hover + down</div>
          <GhostButtonGroup
            trigger={["click", "hover"]}
            direction="down"
            position="static"
            variant="dark"
            gap="0.75rem"
            items={[
              { "aria-label": "Top", children: "T" },
              { "aria-label": "Middle", children: "M" },
            ]}
          >
            C
          </GhostButtonGroup>
        </div>
      </div>
    </CodeView>
  );
}

