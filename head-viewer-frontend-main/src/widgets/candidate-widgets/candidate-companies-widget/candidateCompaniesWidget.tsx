import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from "@nextui-org/react"

interface CandidateCompaniesWidgetProps {
    candidateCompanies : {
        companyId : number;
        companyName : string;
        companyPeriod : string;
        companyPosition : string;
        candidateDuties : string;
        candidateAchivments : string;
    }[]
}

export const CandidateCompaniesWidget = (props: CandidateCompaniesWidgetProps) => {
    return <div className="education">
    <h3 className="education--title">Данные о предыдущих местах работы</h3>
    <Table aria-label="users-table" radius="sm">
        <TableHeader>
            <TableColumn>НАИМЕНОВАНИЕ</TableColumn>
            <TableColumn>ДОЛЖНОСТЬ</TableColumn>
            <TableColumn>ПЕРИОД</TableColumn>
            <TableColumn>ОБЯЗАННОСТИ</TableColumn>
            <TableColumn>ДОСТИЖЕНИЯ</TableColumn>
        </TableHeader>
        <TableBody>
            {props.candidateCompanies.map((company) =>
                <TableRow key={company.companyId}>
                    <TableCell>{company.companyName}</TableCell>
                    <TableCell>
                        <Chip size="sm" radius="sm" color="default">{company.companyPosition}</Chip>
                    </TableCell>
                    <TableCell style={{ textWrap: "nowrap" }}>{company.companyPeriod}</TableCell>
                    <TableCell style={{ textWrap: "nowrap" }}>{company.candidateDuties}</TableCell>
                    <TableCell style={{ textWrap: "nowrap" }}>{company.candidateAchivments}</TableCell>
                </TableRow>
            )}
        </TableBody>
    </Table>
</div>
}