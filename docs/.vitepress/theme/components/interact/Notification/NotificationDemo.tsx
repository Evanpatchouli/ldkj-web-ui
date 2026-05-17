import React from "react";
import CodeView from "../../CodeView";
import { Button, notification } from "@ldkj/web-ui";
export default function NotificationDemo(){
  return <CodeView code={`notification.success("保存成功")`}>
    <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
      <Button size="sm" onClick={()=>notification.info("信息通知")}>Info</Button>
      <Button size="sm" onClick={()=>notification.success("保存成功")}>Success</Button>
      <Button size="sm" onClick={()=>notification.warn("请注意")}>Warn</Button>
      <Button size="sm" onClick={()=>notification.error("操作失败")}>Error</Button>
    </div>
  </CodeView>
}