import { Outlet } from "react-router-dom"
import { AppSidebar } from "widgets"

import './styles.scss'

export const AppLayout = () => {

    return <div className="application">
        <AppSidebar/>
        <div className="application-content">
            <Outlet/>
        </div>
    </div>
}