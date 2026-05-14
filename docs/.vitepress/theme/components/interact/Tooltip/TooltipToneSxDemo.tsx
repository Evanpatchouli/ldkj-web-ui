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
    <TooltipProvider>
      <div className="flex flex-wrap gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <button>light</button>
          </TooltipTrigger>
          <TooltipContent tone="light" arrow>
            浅色提示。
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button>primary</button>
          </TooltipTrigger>
          <TooltipContent tone="primary" arrow>
            品牌色提示。
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button>sx</button>
          </TooltipTrigger>
          <TooltipContent
            arrow
            sx={{
              backgroundColor: "#111827",
              borderColor: "#34d399",
              color: "#ecfdf5",
              "& svg": { fill: "#111827" },
            }}
          >
            使用 sx 覆盖样式。
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}`;

function DemoButton(props: { children: string; className?: string }) {
  return (
    <button
      type="button"
      className={`rounded-md border px-3 py-1.5 text-sm transition hover:opacity-90 ${props.className ?? ""}`}
    >
      {props.children}
    </button>
  );
}

function Example() {
  return (
    <TooltipProvider>
      <div className="flex flex-wrap gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <DemoButton className="border-gray-300 text-gray-700">
              light
            </DemoButton>
          </TooltipTrigger>
          <TooltipContent tone="light" arrow>
            浅色提示。
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <DemoButton className="border-blue-300 text-blue-700">
              primary
            </DemoButton>
          </TooltipTrigger>
          <TooltipContent tone="primary" arrow>
            品牌色提示。
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <DemoButton className="border-emerald-300 text-emerald-700">
              sx
            </DemoButton>
          </TooltipTrigger>
          <TooltipContent
            arrow
            sx={{
              backgroundColor: "#111827",
              borderColor: "#34d399",
              color: "#ecfdf5",
              "& svg": { fill: "#111827" },
            }}
          >
            使用 sx 覆盖样式。
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}

export default function TooltipToneSxDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
