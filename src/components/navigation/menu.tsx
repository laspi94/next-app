

import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"
import { ChevronRightIcon } from "lucide-react";
import { usePathname } from "next/navigation"
import { Icon } from "../utils";
import { MenuItem } from "@/lib/helpers/MenuGenerator";
import { useEffect, useState } from "react";
import { useMenu } from "@/lib/hooks/useMenu";
export const AppMenu = () => {

    const pathname = usePathname();
    const { menu } = useMenu();
    const { state, toggleSidebar } = useSidebar();

    const [activeMenu, setActiveMenu] = useState<MenuItem[]>()

    const checkActiveMenu = () => {
        const updatedMenu = menu.map((itemMenu) => {
            if (itemMenu.submenus) {
                const updatedSubmenus = itemMenu.submenus.map((subItem) => ({
                    ...subItem,
                    isActive: subItem.route === pathname
                }));

                const isAnySubmenuActive = updatedSubmenus.some((sub) => sub.isActive);

                return {
                    ...itemMenu,
                    isActive: isAnySubmenuActive,
                    submenus: updatedSubmenus
                };
            } else {
                return {
                    ...itemMenu,
                    isActive: itemMenu.route === pathname
                };
            }
        });

        console.log(updatedMenu);

        setActiveMenu(updatedMenu)
    };


    useEffect(() => {
        checkActiveMenu();

        return () => {
            //
        }
    }, [menu])


    return (
        <SidebarGroup>
            <SidebarMenu>
                {activeMenu && activeMenu.map((item, i) => {
                    if (item.submenus) {
                        return <Collapsible
                            key={item.key}
                            asChild

                            defaultOpen={item.isActive}
                            className="group/collapsible"
                        >
                            <SidebarMenuItem >
                                <CollapsibleTrigger asChild defaultChecked={item.isActive}>
                                    <SidebarMenuButton tooltip={item.name} isActive={item.isActive} onClick={(e) => {
                                        if (state === "collapsed") {
                                            toggleSidebar();
                                            return;
                                        }
                                    }}>
                                        <Icon iconName={item.icon} color="red" />
                                        <span>{item.name}</span>
                                        <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent className="CollapsibleContent">
                                    <SidebarMenuSub>
                                        {item.submenus.map((submenu) => {
                                            return <SidebarMenuSubItem key={submenu.key} >
                                                <SidebarMenuSubButton asChild isActive={submenu.isActive}>
                                                    <a href={submenu.route}>
                                                        <Icon iconName={item.icon} />
                                                        <span>{submenu.name}</span>
                                                    </a>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        })}
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    } else {
                        return (<SidebarMenuItem key={item.key}>
                            <SidebarMenuButton asChild isActive={item.isActive}>
                                <a href={item.route}>
                                    <Icon iconName={item.icon} color="red" />
                                    <span>{item.name}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>)
                    }
                })}
            </SidebarMenu>
        </SidebarGroup>
    )
}
