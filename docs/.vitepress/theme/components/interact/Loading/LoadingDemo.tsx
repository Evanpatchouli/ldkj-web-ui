import React from "react";
import CodeView from "../../CodeView";
import { Loading } from "@ldkj/web-ui";
export default function LoadingDemo(){
  return <CodeView code={`<Loading text="数据加载中..." />`}>
    <div style={{display:"grid",gap:12}}>
      <Loading />
      <Loading text="数据加载中..." />
    </div>
  </CodeView>
}