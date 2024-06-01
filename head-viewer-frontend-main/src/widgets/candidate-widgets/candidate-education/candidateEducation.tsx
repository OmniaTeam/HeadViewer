import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"

import './styles.scss'

interface CandidateEducationProps {
    candidateEducation : {
        educationId : number;
        educationName : string;
        educationFaculty : string;
        eduactionPeriod : string;
        educationGrade : string
    }[]
}

export const CandidateEducation = (props : CandidateEducationProps) => {
    return <div className="education">
        <h3 className="education--title">Данные об образовании</h3>
        <Table aria-label="users-table" radius="sm">
            <TableHeader>
                <TableColumn>НАИМЕНОВАНИЕ</TableColumn>
                <TableColumn>ФАКУЛЬТЕТ</TableColumn>
                <TableColumn>ПЕРИОД ОБУЧЕНИЯ</TableColumn>
                <TableColumn>СТЕПЕНЬ ОБУЧЕНИЯ</TableColumn>
            </TableHeader>
            <TableBody>
                {props.candidateEducation.map((education) =>
                    <TableRow key={education.educationId}>
                        <TableCell>{education.educationName}</TableCell>
                        <TableCell>{education.educationFaculty}</TableCell>
                        <TableCell>{education.eduactionPeriod}</TableCell>
                        <TableCell>{education.educationGrade}</TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    </div>
}