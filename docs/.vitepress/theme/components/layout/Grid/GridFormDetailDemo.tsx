import { Grid } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import { Grid } from "@ldkj/web-ui";

export function Example() {
  return (
    <Grid container spacing={2}>
      <Grid size={6}>First Name</Grid>
      <Grid size={6}>Last Name</Grid>
      <Grid size={4}>Country</Grid>
      <Grid size={4}>City</Grid>
      <Grid size={4}>Zip Code</Grid>
      <Grid size={12}>Address</Grid>
    </Grid>
  );
}`;

const fieldClass =
  "rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs text-zinc-700";

export default function GridFormDetailDemo() {
  return (
    <CodeView code={code}>
      <Grid container spacing={2}>
        <Grid size={6}>
          <div className={fieldClass}>First Name</div>
        </Grid>
        <Grid size={6}>
          <div className={fieldClass}>Last Name</div>
        </Grid>
        <Grid size={4}>
          <div className={fieldClass}>Country</div>
        </Grid>
        <Grid size={4}>
          <div className={fieldClass}>City</div>
        </Grid>
        <Grid size={4}>
          <div className={fieldClass}>Zip Code</div>
        </Grid>
        <Grid size={12}>
          <div className={fieldClass}>Address</div>
        </Grid>
      </Grid>
    </CodeView>
  );
}

