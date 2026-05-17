import React from "react";
import CodeView from "../../CodeView";
import { Progress } from "@ldkj/web-ui";
export default function ProgressDemo(){
  return <CodeView code={`<Progress value={68} showInfo />`}>
    <div style={{display:"grid",gap:12,maxWidth:320}}>
      <Progress value={25} />
      <Progress value={68} showInfo />
      <Progress value={100} showInfo />
    </div>
  </CodeView>
}