import { ReactNode } from "react";

import './styles.scss'

interface AppHeaderProps {
    headerTitle : string;
    children? : ReactNode
}

export const AppHeader = (props : AppHeaderProps) => {
    return <header className="app-header">
        <div className="app-header--container">
            <h2 className="app-header--title">{props.headerTitle}</h2>
            {props.children}
        </div>
    </header>
}