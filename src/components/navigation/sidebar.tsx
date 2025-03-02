"use client"

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail, useSidebar, } from "@/components/ui/sidebar";
import Image from "next/image";
import { AppMenu } from "./menu";
import { AppUser } from "./user";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const { open } = useSidebar();

  const titelStyles = {
    marginTop: '1.4em',
    marginLeft: '0.3em',
    fontSize: '1em',
    display: open ? 'flex' : 'none'
  };

  const logo = {
    width: 110,
    height: 110,
  };

  const headerStyles = {
    marginLeft: open ? '' : '0.4em'
  };

  return (<>
    <Sidebar variant={"inset"} collapsible="icon" {...props} >
      <SidebarHeader className="inline-block align-middle mt-3" style={headerStyles}>
        <a href="/dashboard" className="brand-link flex" >
          <Image src={'/img/logo.png'} alt="logo" width={logo.width} height={logo.height} />
          <span style={titelStyles}> Top Detailing</span>
        </a>
        <SidebarRail />
      </SidebarHeader>
      <SidebarContent style={{ marginLeft: '0.4em' }}>
        <AppMenu />
      </SidebarContent>
      <SidebarFooter>
        <AppUser />
      </SidebarFooter>
    </Sidebar >
  </>
  )
}
