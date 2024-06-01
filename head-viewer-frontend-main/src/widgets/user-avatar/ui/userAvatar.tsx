import { Avatar, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { LogoutButton } from "futures";

interface UserAvatarProps {
    userId: number;
    userFio: string
}

export const UserAvatar = (props: UserAvatarProps) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure()

    return <>
        <Avatar onClick={onOpen} name={props.userFio.split(' ')[1]} size='md'/>
        <Modal size="lg" isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
            {(onClose) => (
                <>
                    <ModalHeader className="flex flex-col gap-1">{props.userFio}</ModalHeader>
                    <ModalBody>
                        <p>Здесь должна быть информация о вас :)</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button radius="sm" color="default" variant="light" onPress={onClose}>
                            Закрыть
                        </Button>
                        <LogoutButton/>
                    </ModalFooter>
                </>
            )}
            </ModalContent>
        </Modal>
    </>
}