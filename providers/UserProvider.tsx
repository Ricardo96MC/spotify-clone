"use client"

import { MyUserContextProvider } from "@/app/hooks/useUser";

interface UserProviderProps {
    children: React.ReactNode;
}

const UserProvider = ({ children }: UserProviderProps) => {
    return (
        <MyUserContextProvider>
            {children}
        </MyUserContextProvider>
    )
}

export default UserProvider;