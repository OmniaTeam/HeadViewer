import { Chip } from "@nextui-org/react"

import './styles.scss'

interface CandidateSkillsProps {
    skills : Array<string>
}

export const CandidateSkillsWidget = (props: CandidateSkillsProps) => {
    return <div className="skills">
        <h3 className="skills--title">Навыки</h3>
        <div className="skills--cards">
            {props.skills.map((value, index) =>
                <Chip className="w-full" size="md" radius="sm" key={index}>{value}</Chip>
            )}
        </div>
    </div>
}