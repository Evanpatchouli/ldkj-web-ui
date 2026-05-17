import React from "react";
import CodeView from "../../CodeView";
import { Required, Label } from "@ldkj/web-ui";
export default function RequiredDemo(){
  return <CodeView code={`<Label>用户名<Required /></Label>`}>
    <div style={{display:"grid",gap:12}}>
      <Label>用户名 <Required /></Label>
      <Label>金额 <Required>（必填）</Required></Label>
    </div>
  </CodeView>
}