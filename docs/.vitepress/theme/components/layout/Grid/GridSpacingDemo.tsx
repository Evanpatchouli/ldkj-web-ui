import { Grid } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import { Grid } from "@ldkj/web-ui";

const itemClass =
  "rounded-md border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs text-emerald-700";

export function Example() {
  return (
    <Grid container rowSpacing={1} columnSpacing={3}>
      <Grid size={6}>
        <div className={itemClass}>row=1 col=3</div>
      </Grid>
      <Grid size={6}>
        <div className={itemClass}>row=1 col=3</div>
      </Grid>
      <Grid size={6}>
        <div className={itemClass}>row=1 col=3</div>
      </Grid>
      <Grid size={6}>
        <div className={itemClass}>row=1 col=3</div>
      </Grid>
    </Grid>
  );
}`;

const itemClass =
  "rounded-md border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs text-emerald-700";

export default function GridSpacingDemo() {
  return (
    <CodeView code={code}>
      <Grid container rowSpacing={1} columnSpacing={3}>
        <Grid size={6}>
          <div className={itemClass}>row=1 col=3</div>
        </Grid>
        <Grid size={6}>
          <div className={itemClass}>row=1 col=3</div>
        </Grid>
        <Grid size={6}>
          <div className={itemClass}>row=1 col=3</div>
        </Grid>
        <Grid size={6}>
          <div className={itemClass}>row=1 col=3</div>
        </Grid>
      </Grid>
    </CodeView>
  );
}

