

import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"
import { ChevronRightIcon } from "lucide-react";
import { useMenu } from "@/lib/hooks/useMenu"
import { usePathname } from "next/navigation"
import { Icon } from "../utils";

export const AppMenu = () => {

    const { menu } = useMenu();
    const pathname = usePathname();

    return (<SidebarGroup>
        <SidebarMenu >
            {menu.map((item) => {
                if (item.submenus) {
                    return <Collapsible
                        key={item.key}
                        asChild
                        defaultOpen={item.route === pathname}
                        className="group/collapsible"
                    >
                        <SidebarMenuItem >
                            <CollapsibleTrigger asChild >
                                <SidebarMenuButton tooltip={item.name} isActive={item.route === pathname}>
                                    <Icon iconName={item.icon} />
                                    <span>{item.name}</span>
                                    <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <SidebarMenuSub>
                                    {item.submenus?.map((subItem) => (
                                        <SidebarMenuSubItem key={subItem.key}>
                                            <SidebarMenuSubButton asChild>
                                                <a href={subItem.route}>
                                                    <Icon iconName={item.icon} />
                                                    <span>{subItem.name}</span>
                                                </a>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    ))}
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </SidebarMenuItem>
                    </Collapsible>
                } else {
                    return (
                        <SidebarMenuItem key={item.key}>
                            <SidebarMenuSubButton asChild isActive={item.route === pathname}>
                                <a href={item.route}>
                                    <Icon iconName={item.icon} />
                                    <span>{item.name}</span>
                                </a>
                            </SidebarMenuSubButton>
                        </SidebarMenuItem>)
                }
            })}
        </SidebarMenu>
    </SidebarGroup>
    )
}
