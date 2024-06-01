import { AppHeader, CandidatesTable, UsersTable } from "widgets";
import { CandidateAdd, CreateUserButton } from "futures";
import { useAppSelector } from "shared/index";
import { EUserRoles } from "entities/user";

import './styles.scss'

export default function IndexPage() {
    const user = useAppSelector((state) => state.user)

    const ButtonSwitcher = (role : EUserRoles) => {
        switch (role) {
            case EUserRoles.Admin: {
                return <CreateUserButton />
            }
            case EUserRoles.Recruiter: {
                return <CandidateAdd />
            }
            case EUserRoles.Manager: {
                return <CandidateAdd />
            }
            case EUserRoles.RManager: {
                return <></>
            }
        }
    }

    return <>
        <div className="users">
            <AppHeader headerTitle={user.userRole !== "Admin" ? "Кандидаты" : "Пользователи"}>
                {ButtonSwitcher(user.userRole)}
            </AppHeader>
            {user.userRole === "Admin"
                ? <UsersTable/>
                : <CandidatesTable/>
            }
        </div>
    </>
}