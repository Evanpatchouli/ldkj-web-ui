import { Flex } from "@/index";
import CodeView from "../../CodeView";

const code = `import { Flex } from "@ldkj/web-ui";

export function Example() {
  return (
    <Flex wrap gap="lg">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i}>Item {i + 1}</div>
      ))}
    </Flex>
  );
}`;

const itemClass =
  "rounded-md bg-emerald-50 px-3 py-2 text-xs text-emerald-700 border border-emerald-100";

export default function FlexGapWrapDemo() {
  return (
    <CodeView code={code}>
      <div className="space-y-4">
        <Flex wrap gap="lg">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={`preset-${i}`} className={itemClass}>
              gap=lg #{i + 1}
            </div>
          ))}
        </Flex>
        <Flex wrap gap={10}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={`number-${i}`} className={itemClass}>
              gap=10 #{i + 1}
            </div>
          ))}
        </Flex>
        <Flex wrap gap="1.25rem">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={`string-${i}`} className={itemClass}>
              gap=1.25rem #{i + 1}
            </div>
          ))}
        </Flex>
      </div>
    </CodeView>
  );
}
