import { Button } from "@ldkj/web-ui";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import { Button, Popover, PopoverContent, PopoverTrigger } from "@ldkj/web-ui";

export function Example() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">查看状态</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-900">同步状态</h4>
          <p className="text-sm text-gray-500">最近一次同步完成于 10:24，当前没有待处理任务。</p>
        </div>
      </PopoverContent>
    </Popover>
  );
}`;

function Example() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">查看状态</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-900">同步状态</h4>
          <p className="text-sm text-gray-500">
            最近一次同步完成于 10:24，当前没有待处理任务。
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default function PopoverBasicDemo() {
  return (
    <CodeView code={code}>
      <div className="flex min-h-36 items-center justify-center">
        <Example />
      </div>
    </CodeView>
  );
}

