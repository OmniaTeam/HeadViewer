import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from "@nextui-org/react"
import { ChangeEvent, useState } from "react";
import { useAppDispatch } from "shared";
import { createUserThunk } from "../model";

export const CreateUserButton = () => {
    const dispatch = useAppDispatch()

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const [userFio, setUserFio] = useState<string>("")
    const [userEmail, setUserEmail] = useState<string>("")
    const [userPassword, setUserPassword] = useState<string>("")
    const [userConfirtPassword, setUserConfirmPassword] = useState<string>("")
    const [userRole, setUserRole] = useState<string>("")

    const onCreateHandler = () => {
        if (userFio && userEmail && userPassword && userConfirtPassword && userRole && userConfirtPassword === userPassword) {
            dispatch(createUserThunk({
                userFio: userFio,
                userLogin: userEmail,
                userPassword: userPassword,
                userRole: userRole
            })).then((res) => {
                if (res.meta.requestStatus === "fulfilled") window.location.reload()
            })
        }
    }
    
    return <>
        <Button onPress={onOpen} radius="sm" color="primary" size="lg">Новый пользователь</Button>
        <Modal size="lg" isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1">Добавление нового пользователя</ModalHeader>
                <ModalBody>
                    <Input radius="sm" label="ФИО" type="text" onChange={(e : ChangeEvent<HTMLInputElement>) => setUserFio(e.target.value)} />
                    <Input radius="sm" label="Email" type="email" onChange={(e : ChangeEvent<HTMLInputElement>) => setUserEmail(e.target.value)} />
                    <Input radius="sm" label="Пароль" type="password" onChange={(e : ChangeEvent<HTMLInputElement>) => setUserPassword(e.target.value)} />
                    <Input radius="sm" label="Подтвердите пароль" type="password" onChange={(e : ChangeEvent<HTMLInputElement>) => setUserConfirmPassword(e.target.value)} />
                    <Select
                        isRequired
                        label="Роль пользователя"
                        placeholder="Роль пользователя"
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
                            <SelectItem key={userRole.key} onClick={() => setUserRole(userRole.key)}>
                                {userRole.label}
                            </SelectItem>
                        ))}
                    </Select>
                </ModalBody>
                <ModalFooter>
                    <Button radius="sm" color="default" variant="light" onPress={onClose}>
                        Закрыть
                    </Button>
                    <Button radius="sm" color="primary" onPress={onCreateHandler}>
                        Зарегистрировать пользователя
                    </Button>
                </ModalFooter>
                </>
            )}
            </ModalContent>
        </Modal>
    </>
}