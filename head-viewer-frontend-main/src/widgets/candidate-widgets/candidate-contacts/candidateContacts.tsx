import { Input, Button } from "@nextui-org/react"

import './styles.scss'

interface CandidateContactsProps {
    candidateEmail : string;
    candidatePhone : string
}

export const CandidateContacts = (props: CandidateContactsProps) => {
    return <form className="contact" action="">
        <h3 className="contact--title">Контактные данные</h3>
        <div className="contact--inputs">
            <Input radius="sm" label="Email" defaultValue={props.candidateEmail} />
            <Input radius="sm" label="Номер телефона" defaultValue={props.candidatePhone} />
        </div>
        <Button fullWidth radius="sm" color="primary">Сохранить</Button>
    </form>
}