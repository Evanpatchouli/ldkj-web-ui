import { Grid } from "@/index";
import CodeView from "../../CodeView";

const code = `import { Grid } from "@ldkj/web-ui";

const itemClass =
  "rounded-md border border-amber-100 bg-amber-50 px-3 py-2 text-xs text-amber-700";

export function Example() {
  return (
    <Grid container spacing={2}>
      <Grid size={4}>
        <div className={itemClass}>size=4</div>
      </Grid>
      <Grid size={4} offset={4}>
        <div className={itemClass}>size=4 offset=4</div>
      </Grid>
      <Grid size={3}>
        <div className={itemClass}>size=3</div>
      </Grid>
      <Grid size={3} offset="auto">
        <div className={itemClass}>offset=auto</div>
      </Grid>
    </Grid>
  );
}`;

const itemClass =
  "rounded-md border border-amber-100 bg-amber-50 px-3 py-2 text-xs text-amber-700";

export default function GridOffsetDemo() {
  return (
    <CodeView code={code}>
      <Grid container spacing={2}>
        <Grid size={4}>
          <div className={itemClass}>size=4</div>
        </Grid>
        <Grid size={4} offset={4}>
          <div className={itemClass}>size=4 offset=4</div>
        </Grid>
        <Grid size={3}>
          <div className={itemClass}>size=3</div>
        </Grid>
        <Grid size={3} offset="auto">
          <div className={itemClass}>offset=auto</div>
        </Grid>
      </Grid>
    </CodeView>
  );
}
