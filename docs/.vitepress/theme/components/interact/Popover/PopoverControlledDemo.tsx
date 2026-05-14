import { useState } from "react";
import { Button } from "@/components/interact/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/interact/popover";
import CodeView from "../../CodeView";

const code = `import { useState } from "react";
import { Button, Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@ldkj/web-ui";

export function Example() {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant={open ? "primary" : "outline"}>{open ? "已打开" : "打开面板"}</Button>
      </PopoverTrigger>
      <PopoverContent width={320}>
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium text-gray-900">受控弹层</h4>
            <p className="mt-1 text-sm text-gray-500">open 与 onOpenChange 由外部状态管理。</p>
          </div>
          <PopoverClose asChild>
            <Button size="sm" variant="minor">关闭</Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
}`;

function Example() {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant={open ? "primary" : "outline"}>
          {open ? "已打开" : "打开面板"}
        </Button>
      </PopoverTrigger>
      <PopoverContent width={320}>
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium text-gray-900">受控弹层</h4>
            <p className="mt-1 text-sm text-gray-500">
              open 与 onOpenChange 由外部状态管理。
            </p>
          </div>
          <PopoverClose asChild>
            <Button size="sm" variant="minor">
              关闭
            </Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default function PopoverControlledDemo() {
  return (
    <CodeView code={code}>
      <div className="flex min-h-40 items-center justify-center">
        <Example />
      </div>
    </CodeView>
  );
}
