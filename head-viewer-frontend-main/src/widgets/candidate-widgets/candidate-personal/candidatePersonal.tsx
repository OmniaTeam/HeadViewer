import { Button, Input, Textarea } from "@nextui-org/react"

import './styles.scss'

interface CandidatePersonalProps {
    candidateFio : string;
    candidateAge : number;
    candidateCitizen : string;
    candidateCity : string;
    candidateDescription : string
}

export const CandidatePersonal = (props : CandidatePersonalProps) => {
    return <form className="personal" action="">
        <h3 className="personal--title">Личные данные</h3>
        <div className="personal--inputs">
            <Input radius="sm" label="ФИО" defaultValue={props.candidateFio} />
            <Input radius="sm" label="Возраст" defaultValue={String(props.candidateAge)} />
            <Input radius="sm" label="Гражданство" defaultValue={props.candidateCitizen} />
            <Input radius="sm" label="Город" defaultValue={props.candidateCity} />
            <Textarea radius="sm" label="Описание" defaultValue={props.candidateDescription}></Textarea>
        </div>
        <Button fullWidth radius="sm" color="primary">Сохранить</Button>
    </form>
}