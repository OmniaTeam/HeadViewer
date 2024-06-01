import { useDisclosure, Tooltip, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Chip } from "@nextui-org/react"
import { EUserRoles } from "entities";

interface UserViewProps {
    userId : number;
    userFio : string;
    userEmail : string;
    userRole : EUserRoles
}

export const UserView = (props: UserViewProps) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure()
    
    return <>
        <Tooltip content="Подробности">
            <span onClick={onOpen} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.6864 9.49995C11.6864 10.9849 10.4864 12.1849 9.00141 12.1849C7.51641 12.1849 6.31641 10.9849 6.31641 9.49995C6.31641 8.01495 7.51641 6.81494 9.00141 6.81494C10.4864 6.81494 11.6864 8.01495 11.6864 9.49995Z" stroke="#A1A1AA" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8.9989 15.7025C11.6464 15.7025 14.1139 14.1425 15.8314 11.4425C16.5064 10.385 16.5064 8.60754 15.8314 7.55004C14.1139 4.85004 11.6464 3.29004 8.9989 3.29004C6.35141 3.29004 3.8839 4.85004 2.16641 7.55004C1.49141 8.60754 1.49141 10.385 2.16641 11.4425C3.8839 14.1425 6.35141 15.7025 8.9989 15.7025Z" stroke="#A1A1AA" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </span>
        </Tooltip>
        <Modal size="lg" isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1">{props.userFio}</ModalHeader>
                <ModalBody>
                    <ModalBody>
                        <Chip size="md" color="primary">Email: {props.userEmail}</Chip>
                        <p>Должность: {props.userRole}</p>
                    </ModalBody>
                </ModalBody>
                <ModalFooter>
                    <Button radius="sm" color="default" variant="light" onPress={onClose}>
                        Закрыть
                    </Button>
                </ModalFooter>
                </>
            )}
            </ModalContent>
        </Modal>
    </>
}