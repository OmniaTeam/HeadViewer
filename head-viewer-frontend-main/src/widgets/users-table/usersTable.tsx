import { UserChange, UserDelete } from "futures";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from "@nextui-org/react";
import { useGetUsersQuery } from "entities/user/api/userApi";
import { useAppSelector } from "shared/index";

export const UsersTable = () => {
    const user = useAppSelector((state) => state.user)
    const { data, isLoading } = useGetUsersQuery({})

    const roleHandler = (role : string) => {
        switch (role) {
            case "Admin": return "Администратор системы"
            case "Recruiter": return "Рекрутер"
            case "Manager": return "Нанимающий менеджер"
            case "RManager": return "Ресурсный менеджер" 
        }
    }

    return (
        <Table aria-label="users-table" radius="sm">
            <TableHeader>
                <TableColumn>ФИО</TableColumn>
                <TableColumn>EMAIL</TableColumn>
                <TableColumn>ДОЛЖНОСТЬ</TableColumn>
                <TableColumn>ДЕЙСТВИЯ</TableColumn>
            </TableHeader>
            <TableBody emptyContent="В системе пока ещё нет пользователей">
                {isLoading
                    ? <TableRow key="1">
                        <TableCell>Загрузка</TableCell>
                        <TableCell>Загрузка</TableCell>
                        <TableCell>Загрузка</TableCell>
                        <TableCell>Загрузка</TableCell>
                    </TableRow>
                    : data.users.filter((elem: any) => elem.id !== user.userId).map((value : any, index: number) => 
                        <TableRow key={index}>
                            <TableCell>{value.fio}</TableCell>
                            <TableCell>{value.login}</TableCell>
                            <TableCell>
                                <Chip size="md" color="default" radius="sm" >{roleHandler(value.role)}</Chip>
                            </TableCell>
                            <TableCell>
                                <div className="relative flex items-center gap-4">
                                    <UserChange userFio={value.fio} userEmail={value.login} userId={value.id} userRole={value.role}/>
                                    <UserDelete userId={value.id} />
                                </div>
                            </TableCell>
                        </TableRow>
                    )
                }
            </TableBody>
        </Table>
    );
}