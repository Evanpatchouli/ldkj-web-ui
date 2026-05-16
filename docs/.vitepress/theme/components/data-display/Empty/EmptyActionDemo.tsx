import CodeView from "../../CodeView";
import { Button, Empty } from "@ldkj/web-ui";

const code = `import { Button, Empty } from "@ldkj/web-ui";

export function Example() {
  return (
    <Empty description="暂无收藏内容">
      <div className="flex items-center gap-2">
        <Button size="sm">去浏览</Button>
        <Button size="sm" variant="outline">
          刷新
        </Button>
      </div>
    </Empty>
  );
}`;

function Example() {
  return (
    <Empty description="暂无收藏内容">
      <div className="flex items-center gap-2">
        <Button size="sm">去浏览</Button>
        <Button size="sm" variant="outline">
          刷新
        </Button>
      </div>
    </Empty>
  );
}

export default function EmptyActionDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
