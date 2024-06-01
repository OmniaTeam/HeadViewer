import { Button, Input } from "@nextui-org/react"
import { useAppDispatch, useAppSelector } from "shared/lib"
import { ChangeEvent, useState } from "react"
import { changeUserFioThunk } from "../model"

import './styles.scss'

export const OptionsUserChange = () => {
    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch()

    const [newUserFio, setNewUserFio] = useState<string>(user.userFio)
    const [reqStatus, setReqStatus] = useState<"fulfilled" | "rejected" | "pending" | "none">("none")

    const onChangeHandle = () => {
        dispatch(changeUserFioThunk({userFio: newUserFio})).then((res) => {
            if (res.meta.requestStatus === "fulfilled") {
                setReqStatus("fulfilled")
            } else if (res.meta.requestStatus === "rejected") {
                setReqStatus("rejected")
            }
        })
    } 

    const statusHadnler = (status : string) : {
            buttonColor: "primary" | "success" | "danger" | "default" | "secondary" | "warning" | undefined,
            buttonText: string
        } => {
        switch (status) {
            case "none": return {
                buttonColor : "primary",
                buttonText : "Сохранить изменения"
            }
            case "fulfilled": return {
                buttonColor : "success",
                buttonText : "Успешно изменено"
            }
            case "rejected": return {
                buttonColor : "danger",
                buttonText : "Не удалось сохранить"
            }
            default: return {
                buttonColor : "primary",
                buttonText : "Сохранить изменения"
            }
        }
    }

    return <form className="options-user-change" action="">
        <h3 className="options-user-change--title">Личные данные</h3>
        <div className="options-user-change--inputs">
            <Input label="ФИО" defaultValue={user.userFio} onChange={(e : ChangeEvent<HTMLInputElement>) => setNewUserFio(e.target.value)} />
            <Input isReadOnly label="Email" defaultValue={user.userLogin} />
        </div>
        <Button fullWidth radius="sm" color={statusHadnler(reqStatus).buttonColor} onPress={onChangeHandle}>{statusHadnler(reqStatus).buttonText}</Button>
    </form>
}