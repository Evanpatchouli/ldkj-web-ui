import { Button } from "@ldkj/web-ui";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import { Button, Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@ldkj/web-ui";

export function Example() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button shadow="sm">筛选条件</Button>
      </PopoverTrigger>
      <PopoverContent
        width="min(360px, calc(100vw - 32px))"
        rounded={16}
        shadow="0 16px 40px rgba(15, 23, 42, 0.16)"
        sx={{
          borderColor: "#bfdbfe",
          "& button[data-filter]": {
            borderColor: "#cbd5e1",
          },
        }}
      >
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-900">筛选条件</h4>
            <p className="mt-1 text-sm text-gray-500">通过 sx、width、rounded 与 shadow 定制内容面板。</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button data-filter className="rounded-md border px-3 py-1 text-sm text-gray-700">活跃</button>
            <button data-filter className="rounded-md border px-3 py-1 text-sm text-gray-700">待审核</button>
            <button data-filter className="rounded-md border px-3 py-1 text-sm text-gray-700">已归档</button>
          </div>
          <PopoverClose asChild>
            <Button size="sm">应用</Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
}`;

function Example() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button shadow="sm">筛选条件</Button>
      </PopoverTrigger>
      <PopoverContent
        width="min(360px, calc(100vw - 32px))"
        rounded={16}
        shadow="0 16px 40px rgba(15, 23, 42, 0.16)"
        sx={{
          borderColor: "#bfdbfe",
          "& button[data-filter]": {
            borderColor: "#cbd5e1",
          },
        }}
      >
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-900">筛选条件</h4>
            <p className="mt-1 text-sm text-gray-500">
              通过 sx、width、rounded 与 shadow 定制内容面板。
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              data-filter
              className="rounded-md border px-3 py-1 text-sm text-gray-700"
            >
              活跃
            </button>
            <button
              data-filter
              className="rounded-md border px-3 py-1 text-sm text-gray-700"
            >
              待审核
            </button>
            <button
              data-filter
              className="rounded-md border px-3 py-1 text-sm text-gray-700"
            >
              已归档
            </button>
          </div>
          <PopoverClose asChild>
            <Button size="sm">应用</Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default function PopoverCustomContentDemo() {
  return (
    <CodeView code={code}>
      <div className="flex min-h-56 items-center justify-center">
        <Example />
      </div>
    </CodeView>
  );
}

