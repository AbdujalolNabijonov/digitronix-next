import React, { ReactNode, useState } from "react";
import { GlobalContext } from "@/libs/hooks/useGlobal";

const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [rebuild, setRebuild] = useState(new Date())
    return (
        <GlobalContext.Provider value={{ rebuild, setRebuild }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default ContextProvider