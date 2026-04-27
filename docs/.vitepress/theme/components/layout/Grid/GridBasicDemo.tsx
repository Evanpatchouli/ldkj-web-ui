import { Grid } from "@/index";
import CodeView from "../../CodeView";

const code = `import { Grid } from "@ldkj/web-ui";

const itemClass =
  "rounded-md border border-indigo-100 bg-indigo-50 px-3 py-2 text-xs text-indigo-700";

export function Example() {
  return (
    <Grid container spacing={2}>
      <Grid size={8}>
        <div className={itemClass}>size=8</div>
      </Grid>
      <Grid size={4}>
        <div className={itemClass}>size=4</div>
      </Grid>
      <Grid size={4}>
        <div className={itemClass}>size=4</div>
      </Grid>
      <Grid size={8}>
        <div className={itemClass}>size=8</div>
      </Grid>
    </Grid>
  );
}`;

const itemClass =
  "rounded-md border border-indigo-100 bg-indigo-50 px-3 py-2 text-xs text-indigo-700";

export default function GridBasicDemo() {
  return (
    <CodeView code={code}>
      <Grid container spacing={2}>
        <Grid size={8}>
          <div className={itemClass}>size=8</div>
        </Grid>
        <Grid size={4}>
          <div className={itemClass}>size=4</div>
        </Grid>
        <Grid size={4}>
          <div className={itemClass}>size=4</div>
        </Grid>
        <Grid size={8}>
          <div className={itemClass}>size=8</div>
        </Grid>
      </Grid>
    </CodeView>
  );
}
