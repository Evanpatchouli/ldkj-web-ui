import { Grid } from "@/index";
import CodeView from "../CodeView";

const code = `import { Grid } from "@ldkj/web-ui";

export function Example() {
  return (
    <Grid container direction="row-reverse" wrap={false} spacing={2}>
      <Grid size={3}>A</Grid>
      <Grid size={3}>B</Grid>
      <Grid size={3}>C</Grid>
      <Grid size={3}>D</Grid>
      <Grid size={3}>E</Grid>
    </Grid>
  );
}`;

const itemClass =
  "rounded-md border border-rose-100 bg-rose-50 px-3 py-2 text-xs text-rose-700";

export default function GridDirectionWrapDemo() {
  return (
    <CodeView code={code}>
      <div className="overflow-x-auto">
        <Grid
          container
          direction="row-reverse"
          wrap={false}
          spacing={2}
          style={{ minWidth: 520 }}
        >
          {["A", "B", "C", "D", "E"].map((label) => (
            <Grid key={label} size={3}>
              <div className={itemClass}>
                direction=row-reverse, wrap=false, item={label}
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </CodeView>
  );
}
