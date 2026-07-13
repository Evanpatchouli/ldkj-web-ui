import { Columns } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const Example = () => (
  <Columns
    columns={4}
    gap={10}
    className="max-[640px]:gap-2"
    sx={{ "@media (max-width: 640px)": { display: "block" } }}
  >
    {["A", "B", "C", "D", "E", "F", "G", "H"].map((item) => (
      <div
        key={item}
        className="mb-2 rounded-md bg-slate-100 px-3 py-2 text-center text-sm text-slate-700"
      >
        卡片 {item}
      </div>
    ))}
  </Columns>
);

const code = `import { Columns } from "@ldkj/web-ui";

const Example = () => (
  <Columns
    columns={4}
    gap={10}
    className="max-[640px]:gap-2"
    sx={{ "@media (max-width: 640px)": { display: "block" } }}
  >
    {["A", "B", "C", "D", "E", "F", "G", "H"].map((item) => (
      <div
        key={item}
        className="mb-2 rounded-md bg-slate-100 px-3 py-2 text-center text-sm text-slate-700"
      >
        卡片 {item}
      </div>
    ))}
  </Columns>
);`;

export default function ColumnsResponsiveDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
