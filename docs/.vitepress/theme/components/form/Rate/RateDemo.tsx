import React from "react";
import CodeView from "../../CodeView";
import { Rate } from "@ldkj/web-ui";
export default function RateDemo(){
  const [v,setV]=React.useState(3);
  return <CodeView code={`<Rate value={value} onChange={setValue} />`}>
    <div style={{display:"grid",gap:12}}>
      <Rate value={v} onChange={setV} />
      <Rate value={4} disabled />
      <Rate value={2} count={10} onChange={setV} />
    </div>
  </CodeView>
}