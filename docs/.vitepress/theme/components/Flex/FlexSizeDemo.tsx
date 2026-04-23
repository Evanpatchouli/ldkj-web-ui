import { Flex } from "@/index";
import CodeView from "../CodeView";

const code = `import { Flex } from "@ldkj/web-ui";

export function Example() {
  return (
    <Flex width={360} height={120} items="center" justify="center" gap="md">
      <div>width/height as number</div>
    </Flex>
  );
}`;

export default function FlexSizeDemo() {
  return (
    <CodeView code={code}>
      <div className="space-y-4">
        <Flex
          width={360}
          height={120}
          items="center"
          justify="center"
          gap="md"
          className="rounded-md border border-gray-200 bg-gray-50"
        >
          <div className="text-xs text-gray-700">width=360, height=120</div>
        </Flex>
        <Flex
          width="100%"
          height="96px"
          items="center"
          justify="space-between"
          gap="md"
          className="rounded-md border border-gray-200 bg-gray-50 px-4"
        >
          <div className="text-xs text-gray-700">width=100%</div>
          <div className="text-xs text-gray-700">height=96px</div>
        </Flex>
      </div>
    </CodeView>
  );
}
