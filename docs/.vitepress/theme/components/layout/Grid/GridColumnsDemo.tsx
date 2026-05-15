import { Grid } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import { Grid } from "@ldkj/web-ui";

export function Example() {
  return (
    <Grid container columns={16} spacing={2}>
      <Grid size={8}>size=8 / 16</Grid>
      <Grid size={4}>size=4 / 16</Grid>
      <Grid size={4}>size=4 / 16</Grid>
    </Grid>
  );
}`;

const itemClass =
  "rounded-md border border-sky-100 bg-sky-50 px-3 py-2 text-xs text-sky-700";

export default function GridColumnsDemo() {
  return (
    <CodeView code={code}>
      <Grid container columns={16} spacing={2}>
        <Grid size={8}>
          <div className={itemClass}>size=8 / 16</div>
        </Grid>
        <Grid size={4}>
          <div className={itemClass}>size=4 / 16</div>
        </Grid>
        <Grid size={4}>
          <div className={itemClass}>size=4 / 16</div>
        </Grid>
      </Grid>
    </CodeView>
  );
}

