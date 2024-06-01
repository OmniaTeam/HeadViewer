import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Tooltip, useDisclosure } from "@nextui-org/react"
import { ChangeEvent, useState } from "react";
import { useAppDispatch } from "shared/index";
import { changeUserByIdThunk } from "../model/changeUserByIdThunk";

interface UserChangeProps {
    userId : number;
    userFio : string;
    userEmail : string;
    userRole : string
}

export const UserChange = (props: UserChangeProps) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure()
    const dispatch = useAppDispatch()

    const [newUserFio, setNewUserFio] = useState<string>(props.userFio)
    const [newUserEmail, setNewUserEmail] = useState<string>(props.userEmail)
    const [newUserRole, setNewUserRole] = useState<string>(props.userRole)
    const [newPassword, setNewPassword] = useState<string>('')

    const onChangeHandle = () => {
        dispatch(changeUserByIdThunk({
            userId: props.userId,
            userFio: newUserFio,
            userLogin: newUserEmail,
            userPassword: newPassword,
            userRole: newUserRole
        })).then((res) => {
            if (res.meta.requestStatus === "fulfilled") {
                console.log(res)
            }
        })
    }

    return <>
        <Tooltip radius="sm" content="Редактировать" closeDelay={100} >
            <span onClick={onOpen} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.94353 3.19992L3.78604 9.71743C3.55354 9.96493 3.32854 10.4525 3.28354 10.79L3.00605 13.22C2.90854 14.0975 3.53854 14.6974 4.40854 14.5475L6.82354 14.1349C7.16104 14.075 7.63354 13.8275 7.86604 13.5724L14.0236 7.05492C15.0886 5.92992 15.5685 4.64742 13.911 3.07992C12.261 1.52742 11.0086 2.07492 9.94353 3.19992Z" stroke="#A1A1AA" strokeWidth="1.35" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8.91797 4.2876C9.2405 6.3576 10.9204 7.9401 13.0055 8.1501" stroke="#A1A1AA" strokeWidth="1.35" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2.25 17H15.75" stroke="#A1A1AA" strokeWidth="1.35" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </span>
        </Tooltip>
        <Modal size="lg" isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1">Редактировать</ModalHeader>
                <ModalBody>
                    <Input radius="sm" label="ФИО" type="text" defaultValue={props.userFio} onChange={(e : ChangeEvent<HTMLInputElement>) => setNewUserFio(e.target.value)} />
                    <Input radius="sm" label="Email" type="email" defaultValue={props.userEmail} onChange={(e : ChangeEvent<HTMLInputElement>) => setNewUserEmail(e.target.value)} />
                    <Input radius="sm" label="Новый пароль" type="password" onChange={(e : ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)} />
                    <Select
                        label="Роль пользователя"
                        placeholder="Роль пользователя"
                        defaultSelectedKeys={[props.userRole]}
                        className="max-w-xs"
                        fullWidth
                        >
                        {[
                            {
                                key: "Admin",
                                label: "Администратор системы"
                            },
                            {
                                key: "Recruiter",
                                label: "Рекрутер"
                            },
                            {
                                key: "Manager",
                                label: "Нанимающий менеджер"
                            },
                            {
                                key: "RManager",
                                label: "Ресурсный менеджер"
                            }
                        ].map((userRole : { key: string; label: string }) => (
                            <SelectItem key={userRole.key} onClick={() => setNewUserRole(userRole.key)}>
                                {userRole.label}
                            </SelectItem>
                        ))}
                    </Select>
                </ModalBody>
                <ModalFooter>
                    <Button radius="sm" color="default" variant="light" onPress={onClose}>
                        Закрыть
                    </Button>
                    <Button radius="sm" color="primary" disabled onPress={onChangeHandle}>
                        Сохранить
                    </Button>
                </ModalFooter>
                </>
            )}
            </ModalContent>
        </Modal>
    </>
}