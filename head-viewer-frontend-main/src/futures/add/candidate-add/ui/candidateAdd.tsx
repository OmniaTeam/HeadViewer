import { useState } from 'react';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { FileUploader } from 'futures';

export const CandidateAdd = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

    const handleFileSelect = (files: FileList) => {
        setSelectedFiles(files);
    };

    const handleAddCandidates = () => {
        if (selectedFiles) {
            console.log('Выбранные файлы:', selectedFiles);
        }
    };

    return (
        <>
            <Button onPress={onOpen} radius="sm" color="primary" size="lg">Добавить кандидатов</Button>
            <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Добавление новых кандидатов</ModalHeader>
                    <ModalBody>
                        <div className="flex flex-col gap-0">    
                            <p>Выберите файлы-резюме потенциальных кандидатов.</p>
                            <p>После запуска анализа система автоматически создаст профили кандидатов.</p>
                        </div>
                        <FileUploader onFileSelect={handleFileSelect} />
                    </ModalBody>
                    <ModalFooter>
                        <Button radius="sm" color="default" variant="light" onClick={onClose}>
                            Закрыть
                        </Button>
                        <Button disabled={selectedFiles?.length === 0} radius="sm" color={(selectedFiles?.length === 0 || selectedFiles === null) ? "default" : "primary"} onClick={handleAddCandidates}>
                            Добавить кандидатов
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};