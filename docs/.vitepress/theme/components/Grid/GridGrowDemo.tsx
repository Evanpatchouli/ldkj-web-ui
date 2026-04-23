import { Grid } from "@/index";
import CodeView from "../CodeView";

const code = `import { Grid } from "@ldkj/web-ui";

const itemClass =
  "rounded-md border border-violet-100 bg-violet-50 px-3 py-2 text-xs text-violet-700";

export function Example() {
  return (
    <Grid container spacing={2}>
      <Grid size={3}>
        <div className={itemClass}>size=3</div>
      </Grid>
      <Grid size="grow">
        <div className={itemClass}>size="grow"</div>
      </Grid>
      <Grid size={2}>
        <div className={itemClass}>size=2</div>
      </Grid>
    </Grid>
  );
}`;

const itemClass =
  "rounded-md border border-violet-100 bg-violet-50 px-3 py-2 text-xs text-violet-700";

export default function GridGrowDemo() {
  return (
    <CodeView code={code}>
      <Grid container spacing={2}>
        <Grid size={3}>
          <div className={itemClass}>size=3</div>
        </Grid>
        <Grid size="grow">
          <div className={itemClass}>size="grow"</div>
        </Grid>
        <Grid size={2}>
          <div className={itemClass}>size=2</div>
        </Grid>
      </Grid>
    </CodeView>
  );
}
