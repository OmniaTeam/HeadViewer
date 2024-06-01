import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react"
import { Combobox } from "futures";
import { useState } from "react";

interface CandidateCompaniesProps {
    candidates : {
        candidateId : number;
        candidateFio : string
    }[],
    onChangeHadnle : (value: string) => void;
    onClickHandle : () => void
}

export const CompareCandidates = (props: CandidateCompaniesProps) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure()
    
    return <>
        <Button variant="faded" radius="sm" onPress={onOpen} color="default">Сравнить</Button>
        <Modal radius="sm" isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1">Сравнение</ModalHeader>
                <ModalBody>
                    <p>Выберите шаблон для сравнения кандидатов</p>
                    <Combobox items={[
                        {key: 1, label: "Шаблон №1"},
                        {key: 2, label: "Шаблон №2"},
                        {key: 3, label: "Шаблон №3"}
                    ]} label="Шаблон" actionLabel="Выберите шаблон" onChangeHandler={props.onChangeHadnle} />
                </ModalBody>
                <ModalFooter>
                    <Button radius="sm" color="default" variant="light" onPress={onClose}>
                        Закрыть
                    </Button>
                    <Button radius="sm" color="primary" disabled onPress={props.onClickHandle}>
                        Сравнить
                    </Button>
                </ModalFooter>
                </>
            )}
            </ModalContent>
        </Modal>
    </>
}