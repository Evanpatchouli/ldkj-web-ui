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
    <div className="grid grid-cols-2 gap-3">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Popover key={side}>
          <PopoverTrigger asChild>
            <Button variant="outline">{side}</Button>
          </PopoverTrigger>
          <PopoverContent side={side} align="center" width={220}>
            <p className="text-sm text-gray-600">当前从 {side} 方向展开。</p>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  );
}`;

function Example() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Popover key={side}>
          <PopoverTrigger asChild>
            <Button variant="outline">{side}</Button>
          </PopoverTrigger>
          <PopoverContent side={side} align="center" width={220}>
            <p className="text-sm text-gray-600">当前从 {side} 方向展开。</p>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  );
}

export default function PopoverPlacementDemo() {
  return (
    <CodeView code={code}>
      <div className="flex min-h-56 items-center justify-center">
        <Example />
      </div>
    </CodeView>
  );
}

