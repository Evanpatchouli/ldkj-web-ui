import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ldkj/web-ui";

const placements = ["top", "right", "bottom", "left"] as const;

export function Example() {
  return (
    <TooltipProvider>
      <div className="flex flex-wrap gap-2">
        {placements.map((side) => (
          <Tooltip key={side}>
            <TooltipTrigger asChild>
              <button>{side}</button>
            </TooltipTrigger>
            <TooltipContent side={side} align="center" arrow>
              side={side}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}`;

const placements = ["top", "right", "bottom", "left"] as const;

function Example() {
  return (
    <TooltipProvider>
      <div className="flex flex-wrap gap-2">
        {placements.map((side) => (
          <Tooltip key={side}>
            <TooltipTrigger asChild>
              <button
                type="button"
                className="min-w-20 rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 transition hover:border-gray-400"
              >
                {side}
              </button>
            </TooltipTrigger>
            <TooltipContent side={side} align="center" arrow>
              side={side}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}

export default function TooltipPlacementDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}

