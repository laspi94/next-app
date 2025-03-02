import { users } from "@prisma/client";
import { Forms, PermissionForm } from "../prisma/models";

export interface MenuItem {
    key: string;
    name: string;
    icon: string;
    route: string;
    parent_key?: string;
    submenus?: MenuItem[];
}

class MenuGenerator {
    static async generateMenu(user: users | undefined): Promise<MenuItem[]> {
        if (!user) return [];

        const formObject = await Forms.all();

        const menuItems: MenuItem[] = await Promise.all(formObject.map(async (form) => {
            if (await this.havePermission(user, form.key)) {
                return {
                    key: form.key,
                    name: form.name,
                    icon: form.icon,
                    route: form.route,
                    parent_key: form.parent_key,
                };
            }
            return null;
        })).then((items) => items.filter(item => item !== null) as MenuItem[]);

        return this.organizeMenuHierarchical(menuItems);
    }

    private static async havePermission(user: users, formularioKey: string): Promise<boolean> {
        const permiso = PermissionForm.findOne(user, formularioKey);
        return permiso !== null;
    }

    private static organizeMenuHierarchical(items: MenuItem[]): MenuItem[] {
        const menuAgrupado: MenuItem[] = [];
        const itemsPorKey = new Map<string, MenuItem>(items.map(item => [item.key, item]));

        items.forEach(item => {
            if (!item.parent_key) {
                menuAgrupado.push(this.buildItemMenu(item, itemsPorKey));
            }
        });

        return menuAgrupado;
    }

    private static buildItemMenu(item: MenuItem, itemsPorKey: Map<string, MenuItem>): MenuItem {
        const menuItem: MenuItem = {
            key: item.key,
            name: item.name,
            icon: item.icon,
            route: item.route,
        };

        const submenus = Array.from(itemsPorKey.values()).filter(subitem => subitem.parent_key === item.key);

        if (submenus.length > 0) {
            menuItem.submenus = submenus.map(submenu => this.buildItemMenu(submenu, itemsPorKey));
        }

        return menuItem;
    }
}

export { MenuGenerator };