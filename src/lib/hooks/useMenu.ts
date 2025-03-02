import { useEffect, useState } from "react"
import { MenuItem } from "../helpers/MenuGenerator";

export const useMenu = () => {

    const [menu, setMenu] = useState<MenuItem[]>([]);

    async function getMenu() {
        try {
            const response = await fetch("/api/resources/forms", {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });

            const result = await response.json();

            if (!response.ok) {
                return;
            }

            const partialMenu: MenuItem[] = JSON.parse(result.forms);

            setMenu(partialMenu);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getMenu();
    }, [])

    return {
        menu
    }

}
