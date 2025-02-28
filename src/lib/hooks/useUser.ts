import { useEffect, useState } from "react"
import { users } from "@prisma/client";
import { getCookie } from "../utils";

export const useUser = () => {
    const [user, setUser] = useState<users>();

    useEffect(() => {
        const userCookie = getCookie('session_user');

        if (userCookie) {
            const decodedUserCookie = decodeURIComponent(userCookie);
            const parsedUser = JSON.parse(decodedUserCookie);
            setUser(parsedUser);
        }

    }, [])

    return {
        user
    }

}
