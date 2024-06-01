import { Button } from "@nextui-org/react"
import { useAppDispatch } from "shared/lib"
import { logoutUserThunk } from "../model"
import { useNavigate } from "react-router-dom"
import { EUserRoles, setUserRole } from "entities/user"

export const LogoutButton = () => {
    const dispatch = useAppDispatch()
    const navigator = useNavigate()
    
    const logoutHandler = () => {
        dispatch(logoutUserThunk({})).then((result) => {
            if (result.meta.requestStatus === "fulfilled") {
                navigator('/')
                dispatch(setUserRole(EUserRoles.Guest))
            }
        })
    }

    return <Button onPress={logoutHandler} radius="sm" color="danger">Выйти из аккаунта</Button>
}