import { useState } from "react";
import { Button } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const Example = () => {
  const [submitCount, setSubmitCount] = useState(0);
  const [searchCount, setSearchCount] = useState(0);
  const [normalCount, setNormalCount] = useState(0);

  return (
    <div className="grid gap-4">
      <div className="flex gap-2 items-center flex-wrap">
        <Button debounce onClick={() => setSubmitCount((count) => count + 1)}>
          防抖提交
        </Button>
        <span className="text-sm text-slate-500">
          300ms 后触发：{submitCount}
        </span>
      </div>
      <div className="flex gap-2 items-center flex-wrap">
        <Button
          debounce={600}
          variant="secondary"
          onClick={() => setSearchCount((count) => count + 1)}
        >
          自定义 600ms
        </Button>
        <span className="text-sm text-slate-500">
          600ms 后触发：{searchCount}
        </span>
      </div>
      <div className="flex gap-2 items-center flex-wrap">
        <Button
          debounce={false}
          variant="outline"
          onClick={() => setNormalCount((count) => count + 1)}
        >
          立即触发
        </Button>
        <span className="text-sm text-slate-500">
          立即触发：{normalCount}
        </span>
      </div>
    </div>
  );
};

const code = `import { useState } from "react";
import { Button } from "@ldkj/web-ui";

const Example = () => {
  const [submitCount, setSubmitCount] = useState(0);
  const [searchCount, setSearchCount] = useState(0);
  const [normalCount, setNormalCount] = useState(0);

  return (
    <div className="grid gap-4">
      <div className="flex gap-2 items-center flex-wrap">
        <Button debounce onClick={() => setSubmitCount((count) => count + 1)}>
          防抖提交
        </Button>
        <span className="text-sm text-slate-500">
          300ms 后触发：{submitCount}
        </span>
      </div>
      <div className="flex gap-2 items-center flex-wrap">
        <Button
          debounce={600}
          variant="secondary"
          onClick={() => setSearchCount((count) => count + 1)}
        >
          自定义 600ms
        </Button>
        <span className="text-sm text-slate-500">
          600ms 后触发：{searchCount}
        </span>
      </div>
      <div className="flex gap-2 items-center flex-wrap">
        <Button
          debounce={false}
          variant="outline"
          onClick={() => setNormalCount((count) => count + 1)}
        >
          立即触发
        </Button>
        <span className="text-sm text-slate-500">
          立即触发：{normalCount}
        </span>
      </div>
    </div>
  );
};`;

export default function ButtonDebounceDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
