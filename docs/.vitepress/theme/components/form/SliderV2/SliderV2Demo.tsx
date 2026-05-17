import React from "react";
import CodeView from "../../CodeView";
import { SliderV2 } from "@ldkj/web-ui";
export default function SliderV2Demo(){
  const [v,setV]=React.useState(35);
  return <CodeView code={`<SliderV2 min={0} max={100} value={value} onValueChange={setValue} />`}>
    <div style={{display:"grid",gap:12,maxWidth:320}}>
      <SliderV2 min={0} max={100} value={v} onValueChange={setV} />
      <SliderV2 min={0} max={100} defaultValue={70} disabled />
      <div style={{fontSize:12,color:'#64748b'}}>当前值: {v}</div>
    </div>
  </CodeView>
}