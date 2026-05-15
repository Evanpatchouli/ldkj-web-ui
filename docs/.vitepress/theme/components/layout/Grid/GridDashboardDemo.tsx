import { Grid } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import { Grid } from "@ldkj/web-ui";

export function Example() {
  return (
    <Grid container spacing={2}>
      <Grid size={8}>Main Chart</Grid>
      <Grid size={4}>Summary</Grid>
      <Grid size={4}>Metric A</Grid>
      <Grid size={4}>Metric B</Grid>
      <Grid size={4}>Metric C</Grid>
      <Grid size={12}>Table</Grid>
    </Grid>
  );
}`;

const cardClass =
  "rounded-lg border border-slate-200 bg-white p-3 text-xs text-slate-700 shadow-sm";

export default function GridDashboardDemo() {
  return (
    <CodeView code={code}>
      <Grid container spacing={2}>
        <Grid size={8}>
          <div className={cardClass} style={{ minHeight: 80 }}>
            Main Chart
          </div>
        </Grid>
        <Grid size={4}>
          <div className={cardClass} style={{ minHeight: 80 }}>
            Summary
          </div>
        </Grid>
        <Grid size={4}>
          <div className={cardClass}>Metric A</div>
        </Grid>
        <Grid size={4}>
          <div className={cardClass}>Metric B</div>
        </Grid>
        <Grid size={4}>
          <div className={cardClass}>Metric C</div>
        </Grid>
        <Grid size={12}>
          <div className={cardClass} style={{ minHeight: 72 }}>
            Table
          </div>
        </Grid>
      </Grid>
    </CodeView>
  );
}

