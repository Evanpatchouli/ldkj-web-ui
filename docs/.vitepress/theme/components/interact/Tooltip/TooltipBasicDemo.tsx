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

export function Example() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button>悬停查看</button>
        </TooltipTrigger>
        <TooltipContent arrow>用于补充说明当前操作。</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}`;

function Example() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 transition hover:border-gray-400"
          >
            悬停查看
          </button>
        </TooltipTrigger>
        <TooltipContent arrow>用于补充说明当前操作。</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default function TooltipBasicDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}

