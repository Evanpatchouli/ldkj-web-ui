import React from "react";
import CodeView from "../../CodeView";
import { Drawer, Button } from "@ldkj/web-ui";
export default function DrawerDemo(){
  const [open,setOpen]=React.useState(false);
  return <CodeView code={`<Drawer open={open} onOpenChange={setOpen} title="筛选" />`}>
    <Button onClick={()=>setOpen(true)}>打开 Drawer</Button>
    <Drawer open={open} onOpenChange={setOpen} title="筛选条件">
      <p style={{fontSize:14,color:'#475569'}}>这里可以放筛选表单、详情信息或操作按钮。</p>
    </Drawer>
  </CodeView>
}