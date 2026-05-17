import React from "react";
import CodeView from "../../CodeView";
import { AutoComplete } from "@ldkj/web-ui";
const options=[{label:"苹果",value:"apple"},{label:"香蕉",value:"banana"},{label:"蓝莓",value:"blueberry"}];
export default function AutoCompleteDemo(){
  return <CodeView code={`<AutoComplete options={options} placeholder="输入关键词" />`}>
    <div style={{display:"grid",gap:12,maxWidth:320}}>
      <AutoComplete options={options} placeholder="输入关键词" />
      <AutoComplete options={options} disabled value="apple" />
    </div>
  </CodeView>
}