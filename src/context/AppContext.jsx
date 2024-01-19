import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [userResponse, setUserResponse] = useState();

    return (
        <AppContext.Provider
            value={{
                user, setUser,
                userResponse, setUserResponse
            }}
        >
            {children}
        </AppContext.Provider>
    )
};