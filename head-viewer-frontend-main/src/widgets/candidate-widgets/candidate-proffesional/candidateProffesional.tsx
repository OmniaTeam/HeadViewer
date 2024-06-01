import { Button, Input } from "@nextui-org/react"

import './styles.scss'

interface CandidateProffesionalProps {
    candidatePosition : string;
    candidateSalary : number;
    candidateGrade : string;
}

export const CandidateProffesional = (props : CandidateProffesionalProps) => {
    return <form className="proffesional" action="">
        <h3 className="proffesional--title">Проффесиональные данные</h3>
        <div className="proffesional--inputs">
            <Input radius="sm" label="Желаемая должность" defaultValue={props.candidatePosition} />
            <Input radius="sm" label="Категория умения" defaultValue={props.candidateGrade} />
            <Input radius="sm" label="Зарплатные ожидания" defaultValue={String(props.candidateSalary)} />
        </div>
        <Button fullWidth radius="sm" color="primary">Сохранить</Button>
    </form>
}