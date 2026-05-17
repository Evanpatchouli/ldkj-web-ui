import React from "react";
import CodeView from "../../CodeView";
import { Spin } from "@ldkj/web-ui";
export default function SpinDemo(){
  return <CodeView code={`<Spin size={24} />`}>
    <div style={{display:"flex",gap:16,alignItems:"center"}}>
      <Spin size={16}/><Spin size={24}/><Spin size={32}/>
    </div>
  </CodeView>
}