import { Button, Input } from "@nextui-org/react"

import './styles.scss';
import { ChangeEvent, useState } from "react";
import { useAppDispatch } from "shared/index";
import { changeUserPasswordThunk } from "../model";

export const PasswordUserChange = () => {
    const dispatch = useAppDispatch()

    const [userOldPassword, setUserOldPassword] = useState<string>('')
    const [userNewPassword, setUserNewPassword] = useState<string>('')
    const [userConfirmPassword, setUserConfirmPassword] = useState<string>('')
    const [reqStatus, setReqStatus] = useState<"fulfilled" | "rejected" | "pending" | "none">("none")

    const onChangeHandle = () => {
        if (userConfirmPassword === userNewPassword) {
            dispatch(changeUserPasswordThunk({
                oldPassword : userOldPassword,
                newPassword : userNewPassword
            })).then((res) => {
                if (res.meta.requestStatus === "fulfilled") {
                    setReqStatus("fulfilled")
                } else if (res.meta.requestStatus === "rejected") {
                    setReqStatus("rejected")
                }
            })
        } else setReqStatus("rejected")
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


    return <form className="password-user-change" action="">
        <h3 className="password-user-change--title">Изменение пароля</h3>
        <div className="password-user-change--inputs">
            <Input radius="sm" label="Старый пароль" onChange={(e : ChangeEvent<HTMLInputElement>) => setUserOldPassword(e.target.value)} />
            <Input radius="sm" label="Новый пароль" onChange={(e : ChangeEvent<HTMLInputElement>) => setUserNewPassword(e.target.value)} />
            <Input radius="sm" label="Подтвердите новый пароль" onChange={(e : ChangeEvent<HTMLInputElement>) => setUserConfirmPassword(e.target.value)} />
        </div>
        <Button onPress={onChangeHandle} color={statusHadnler(reqStatus).buttonColor} radius="sm">{statusHadnler(reqStatus).buttonText}</Button>
    </form>
}