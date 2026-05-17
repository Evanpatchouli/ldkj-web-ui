import React from "react";
import CodeView from "../../CodeView";
import { Cascader } from "@ldkj/web-ui";
const options=[{label:"浙江",value:"zj"},{label:"江苏",value:"js"},{label:"广东",value:"gd"}];
export default function CascaderDemo(){
  const [v,setV]=React.useState<string|undefined>();
  return <CodeView code={`<Cascader options={options} value={value} onValueChange={setValue} />`}>
    <div style={{display:"grid",gap:12,maxWidth:280}}>
      <Cascader options={options} value={v} onValueChange={setV} />
      <div style={{fontSize:12,color:'#64748b'}}>当前值: {v||"-"}</div>
    </div>
  </CodeView>
}