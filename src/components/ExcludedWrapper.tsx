"use client"

import { usePathname } from "next/navigation"

export default function ExcludedWrapper({children}:{children: React.ReactNode}) {

    const excludesPaths = ["/"]

    const path = usePathname()

    if(!(path == "/")){
        return children
    }
}