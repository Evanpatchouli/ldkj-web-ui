import React from "react";
import CodeView from "../../CodeView";
import { Uploader } from "@ldkj/web-ui";
export default function UploaderDemo(){
  const [count,setCount]=React.useState(0);
  return <CodeView code={`<Uploader accept="image/*" multiple onChange={...} />`}>
    <div style={{display:"grid",gap:12}}>
      <Uploader accept="image/*" multiple onChange={(files)=>setCount(files?.length||0)} />
      <div style={{fontSize:12,color:'#64748b'}}>已选择: {count} 个文件</div>
    </div>
  </CodeView>
}