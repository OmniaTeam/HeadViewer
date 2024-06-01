import { useDisclosure, Tooltip, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react"
import { useAppDispatch } from "shared/index"
import { deleteUserThunk } from "../model"

interface UserDeleteProps {
    userId : number
}

export const UserDelete = (props: UserDeleteProps) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure()
    const dispatch = useAppDispatch()

    const onDeleteHandle = () => {
        dispatch(deleteUserThunk({userId: props.userId})).then((result) => {
            if (result.meta.requestStatus === "fulfilled") window.location.reload()
        })
    }
    
    return <>
        <Tooltip color="danger" content="Удалить">
            <span onClick={onOpen} className="text-lg text-danger cursor-pointer active:opacity-50">
                <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.75 4.98499C13.2525 4.73749 10.74 4.60999 8.235 4.60999C6.75 4.60999 5.265 4.68498 3.78 4.83499L2.25 4.98499" stroke="#F31260" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6.375 4.22752L6.54001 3.24501C6.66 2.53251 6.75 2.00002 8.0175 2.00002H9.98246C11.25 2.00002 11.3475 2.56252 11.46 3.25251L11.625 4.22752" stroke="#F31260" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14.1383 7.35498L13.6508 14.9075C13.5683 16.0849 13.5008 17 11.4083 17H6.59328C4.50078 17 4.43328 16.0849 4.35078 14.9075L3.86328 7.35498" stroke="#F31260" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7.74609 12.875H10.2436" stroke="#F31260" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7.125 9.87503H10.875" stroke="#F31260" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </span>
        </Tooltip>
        <Modal size="lg" isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1">Удалить</ModalHeader>
                <ModalBody>
                    <p> 
                        Вы уверены, что хотите удалить этого пользователя?
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Button radius="sm" color="default" variant="light" onPress={onClose}>
                        Закрыть
                    </Button>
                    <Button radius="sm" color="danger" disabled onPress={onDeleteHandle}>
                        Удалить
                    </Button>
                </ModalFooter>
                </>
            )}
            </ModalContent>
        </Modal>
    </>
}