import { Flex } from "@/index";
import CodeView from "../CodeView";

const code = `import { Flex } from "@ldkj/web-ui";

export function Example() {
  return (
    <Flex direction="row" justify="space-between" items="center" gap="md">
      <div>A</div>
      <div>B</div>
      <div>C</div>
    </Flex>
  );
}`;

const itemClass =
  "rounded-md bg-blue-50 px-3 py-2 text-xs text-blue-700 border border-blue-100";

export default function FlexDirectionDemo() {
  return (
    <CodeView code={code}>
      <div className="space-y-4">
        <Flex direction="row" justify="space-between" items="center" gap="md">
          <div className={itemClass}>row + space-between</div>
          <div className={itemClass}>B</div>
          <div className={itemClass}>C</div>
        </Flex>
        <Flex direction="col" items="flex-start" gap="sm">
          <div className={itemClass}>col + flex-start</div>
          <div className={itemClass}>B</div>
          <div className={itemClass}>C</div>
        </Flex>
      </div>
    </CodeView>
  );
}
