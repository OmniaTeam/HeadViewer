import { AppHeader } from "widgets";
import { OptionsUserChange, PasswordUserChange } from "futures/change";

import './styles.scss'

export default function OptionsPage() {
    return <>
        <AppHeader headerTitle={"Настройки"}/>
        <div className="options">
            <OptionsUserChange/>
            <PasswordUserChange/>
        </div>
    </>
}