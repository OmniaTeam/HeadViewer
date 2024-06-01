import { Button, Chip, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from "@nextui-org/react"
import { companies } from "../lib/testData";

interface CandidateCompaniesProps {
    candidateId : number,
    candadateCompanies : {
        company_name : string,
        start_work : string,
        end_work : string,
        post : string,
        responsibilies : string;
        progress : string
    }
}

export const CandidateCompanies = (props: CandidateCompaniesProps) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    
    return <>
        <Chip style={{ cursor: "pointer" }} size="md" color="default" radius="sm" onClick={onOpen}>
            Посмотреть компании
        </Chip>
        <Modal size="3xl" isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1">Список компаний</ModalHeader>
                <ModalBody>
                    <Table aria-label="users-table" radius="sm">
                        <TableHeader>
                            <TableColumn>НАИМЕНОВАНИЕ</TableColumn>
                            <TableColumn>ДОЛЖНОСТЬ</TableColumn>
                            <TableColumn>ПЕРИОД</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {companies().map((company) =>
                                <TableRow key={company.companyId}>
                                    <TableCell>{company.companyName}</TableCell>
                                    <TableCell>
                                        <Chip size="sm" radius="sm" color="default">{company.companyCandidatePost}</Chip>
                                    </TableCell>
                                    <TableCell>{company.companyCandidatePerion}</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
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