import CodeView from "../../CodeView";
import { Progress } from "@ldkj/web-ui";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

const code = `import { Progress } from "@ldkj/web-ui";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

const Example = () => (
  <div className="grid max-w-md gap-5">
    {sizes.map((size, index) => (
      <div key={size} className="grid gap-2">
        <div className="text-xs font-medium uppercase text-slate-500">{size}</div>
        <Progress size={size} value={(index + 1) * 18} showInfo />
      </div>
    ))}

    <div className="flex flex-wrap items-center gap-4">
      {sizes.map((size, index) => (
        <Progress
          key={size}
          type="circle"
          size={size}
          value={(index + 1) * 18}
          showInfo={size !== "xs"}
        />
      ))}
    </div>
  </div>
);`;

const Example = () => (
  <div className="grid max-w-md gap-5">
    {sizes.map((size, index) => (
      <div key={size} className="grid gap-2">
        <div className="text-xs font-medium uppercase text-slate-500">{size}</div>
        <Progress size={size} value={(index + 1) * 18} showInfo />
      </div>
    ))}

    <div className="flex flex-wrap items-center gap-4">
      {sizes.map((size, index) => (
        <Progress
          key={size}
          type="circle"
          size={size}
          value={(index + 1) * 18}
          showInfo={size !== "xs"}
        />
      ))}
    </div>
  </div>
);

export default function ProgressSizeDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
