import React from "react";
import CodeView from "../../CodeView";
import { InputOPT } from "@ldkj/web-ui";
export default function InputOPTDemo(){
  const [v,setV]=React.useState("");
  return <CodeView code={`<InputOPT length={6} value={code} onChange={setCode} />`}>
    <InputOPT length={6} value={v} onChange={setV} />
  </CodeView>
}