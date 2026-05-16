import CodeView from "../../CodeView";
import { Empty } from "@ldkj/web-ui";

const code = `import { Empty } from "@ldkj/web-ui";

export function Example() {
  return (
    <Empty
      image={
        <div className="grid h-16 w-16 place-items-center rounded-full bg-sky-50 text-3xl">
          □
        </div>
      }
      description="没有匹配的搜索结果"
    />
  );
}`;

function Example() {
  return (
    <Empty
      image={
        <div className="grid h-16 w-16 place-items-center rounded-full bg-sky-50 text-3xl">
          □
        </div>
      }
      description="没有匹配的搜索结果"
    />
  );
}

export default function EmptyImageDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
