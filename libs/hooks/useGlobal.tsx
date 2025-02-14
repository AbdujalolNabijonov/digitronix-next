import React, { createContext, useContext } from "react";


interface GlobalContext {
    rebuild: Date;
    setRebuild: any
}
export const GlobalContext = createContext<GlobalContext | undefined>(undefined)

export function useGlobal() {
    const context = useContext(GlobalContext)
    if (!context) throw new Error("Context within Provider!")
    return context
}
