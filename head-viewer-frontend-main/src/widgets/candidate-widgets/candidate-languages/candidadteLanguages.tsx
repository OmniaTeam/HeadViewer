import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import './styles.scss';

interface LanguageProficiencyProps {
    candidateLanguages: {
        languageId: number;
        languageName: string;
        languageLevel: string;
    }[]
}

export const CandidateLanguages = (props: LanguageProficiencyProps) => {
    return (
        <div className="languages">
            <h3 className="languages--title">Языки и уровень владения</h3>
            <Table aria-label="languages-table" radius="sm">
                <TableHeader>
                    <TableColumn>ЯЗЫК</TableColumn>
                    <TableColumn>УРОВЕНЬ ВЛАДЕНИЯ</TableColumn>
                </TableHeader>
                <TableBody>
                    {props.candidateLanguages.map((language) => (
                        <TableRow key={language.languageId}>
                            <TableCell>{language.languageName}</TableCell>
                            <TableCell>{language.languageLevel}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}