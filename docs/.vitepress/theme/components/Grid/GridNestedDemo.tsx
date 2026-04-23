import { Grid } from "@/index";
import CodeView from "../CodeView";

const code = `import { Grid } from "@ldkj/web-ui";

export function Example() {
  return (
    <Grid container spacing={2}>
      <Grid size={8}>
        <Grid container spacing={1}>
          <Grid size={6}>Nested A</Grid>
          <Grid size={6}>Nested B</Grid>
        </Grid>
      </Grid>
      <Grid size={4}>Aside</Grid>
    </Grid>
  );
}`;

const outerClass =
  "rounded-md border border-lime-100 bg-lime-50 px-3 py-2 text-xs text-lime-700";
const innerClass =
  "rounded-md border border-lime-200 bg-white px-3 py-2 text-xs text-lime-700";

export default function GridNestedDemo() {
  return (
    <CodeView code={code}>
      <Grid container spacing={2}>
        <Grid size={8}>
          <div className={outerClass}>parent size=8</div>
          <Grid container spacing={1} style={{ marginTop: 8 }}>
            <Grid size={6}>
              <div className={innerClass}>nested size=6</div>
            </Grid>
            <Grid size={6}>
              <div className={innerClass}>nested size=6</div>
            </Grid>
          </Grid>
        </Grid>
        <Grid size={4}>
          <div className={outerClass}>aside size=4</div>
        </Grid>
      </Grid>
    </CodeView>
  );
}
