import { ReactNode, useEffect } from "react"
import { useAppDispatch } from "../../../../shared/lib"
import { getUserInfo } from ".."

interface AuthProviderProps {
    children : ReactNode
}

export const AuthProvider = (props: AuthProviderProps) => {
    const dispath = useAppDispatch()

    useEffect(() => {
        dispath(getUserInfo({})).unwrap()
    }, [])
    
    return props.children
}