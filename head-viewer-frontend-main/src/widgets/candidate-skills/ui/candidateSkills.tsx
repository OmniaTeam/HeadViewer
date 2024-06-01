import { Button, Chip, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react"

interface CandidateSkillsProps {
    candidateId : number
}

export const CandidateSkills = (props: CandidateSkillsProps) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    
    return <>
        <Chip style={{ cursor: "pointer" }} size="md" color="default" radius="sm" onClick={onOpen}>
            Посмотреть навыки
        </Chip>
        <Modal size="lg" isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1">Навыки кадидата</ModalHeader>
                <ModalBody>
                    <div className="flex gap-2">
                        <Chip size="md" radius="sm">React</Chip>
                        <Chip size="md" radius="sm">Vue</Chip>
                        <Chip size="md" radius="sm">Redux</Chip>
                        <Chip size="md" radius="sm">Vuex</Chip>
                    </div>
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