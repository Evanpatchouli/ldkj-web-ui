import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/interact/tooltip";
import CodeView from "../../CodeView";

const code = `import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ldkj/web-ui";

export function Example() {
  return (
    <TooltipProvider delayDuration={800} skipDelayDuration={200}>
      <div className="flex flex-wrap gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <button>延迟打开</button>
          </TooltipTrigger>
          <TooltipContent arrow>800ms 后显示。</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button>同组提示</button>
          </TooltipTrigger>
          <TooltipContent arrow>Provider 统一控制延迟。</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}`;

function DemoButton(props: { children: string }) {
  return (
    <button
      type="button"
      className="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 transition hover:border-gray-400"
    >
      {props.children}
    </button>
  );
}

function Example() {
  return (
    <TooltipProvider delayDuration={800} skipDelayDuration={200}>
      <div className="flex flex-wrap gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <DemoButton>延迟打开</DemoButton>
          </TooltipTrigger>
          <TooltipContent arrow>800ms 后显示。</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <DemoButton>同组提示</DemoButton>
          </TooltipTrigger>
          <TooltipContent arrow>Provider 统一控制延迟。</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}

export default function TooltipProviderDelayDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
