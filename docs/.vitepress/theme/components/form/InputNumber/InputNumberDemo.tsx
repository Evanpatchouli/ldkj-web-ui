import React from "react";
import CodeView from "../../CodeView";
import { InputNumber } from "@ldkj/web-ui";
export default function InputNumberDemo(){
  const [v,setV]=React.useState<number|undefined>(12);
  return <CodeView code={`<InputNumber min={0} max={100} step={2} />`}>
    <div style={{display:"grid",gap:12,maxWidth:280}}>
      <InputNumber value={v as any} onChange={(e)=>setV(Number(e.target.value))} min={0} max={100} step={2} />
      <InputNumber defaultValue={0 as any} disabled />
      <div style={{fontSize:12,color:'#64748b'}}>当前值: {String(v)}</div>
    </div>
  </CodeView>
}