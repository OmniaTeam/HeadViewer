import { Button, Checkbox, Input, Link } from "@nextui-org/react"
import { useNavigate } from "react-router-dom"
import { ChangeEvent, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "shared"
import { signInUserThunk } from "../model"
import { EUserRoles } from "entities"

import './styles.scss'

export const SignInForm = () => {
    const dispatch = useAppDispatch()
    const navigator = useNavigate()

    const user = useAppSelector((state) => state.user)

    const [userLogin, setUserLogin] = useState<string>('')
    const [userPassword, setUserPassword] = useState<string>('')

    useEffect(() => {
        if (user.userRole !== EUserRoles.Guest) navigator('/application')
    }, [user.userRole])
    
    const signInHandler = (e : ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (userLogin.length && userPassword.length !== 0) {
            dispatch(signInUserThunk({
                userLogin: userLogin,
                userPassword: userPassword
            })).then((result) => {
                if (result.meta.requestStatus === "fulfilled") navigator('/application')
            })
        }
    }

    return <form className="sign-in-form" onSubmit={signInHandler}>
        <div className="sign-in-form--heading">
            <h2 className="sign-in-form--title">Добро пожаловать</h2>
            <p className="sign-in-form--description">Войдите в систему, чтобы начать работу</p>
        </div>
        <div className="sign-in-form--inputs">
            <Input onChange={(e : ChangeEvent<HTMLInputElement>) => setUserLogin(e.target.value)} radius="sm" label="Email" />
            <Input onChange={(e : ChangeEvent<HTMLInputElement>) => setUserPassword(e.target.value)} type="password" radius="sm" label="Пароль" />
        </div>
        <div className="sign-in-form--info">
            <Checkbox radius="sm" defaultSelected>Запомнить меня</Checkbox>
            <Link href="/">Забыли пароль?</Link>
        </div>
        <Button fullWidth color="primary" type="submit" radius="sm">Войти</Button>
    </form>
}