import { Button } from "@nextui-org/react";
import { AppHeader, CandidateCompaniesWidget, CandidateContacts, CandidateEducation, CandidateLanguages, CandidatePersonal, CandidateProffesional, CandidateSkillsWidget } from "widgets";

import './styles.scss'

export default function CandidatePage() {
    return <>
        <div className="candidate">
            <AppHeader headerTitle={"Фамилия Имя Отчество"}>
                <div className="flex items-center gap-2">
                    <Button radius="sm" size="lg" color="success">Принять</Button>
                    <Button radius="sm" size="lg" color="danger">Отклонить</Button>
                </div>
            </AppHeader>
            <div className="candidate--widgets">
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                    <CandidatePersonal 
                        candidateFio={"Фамилия Имя Отчество"}
                        candidateAge={29}
                        candidateCitizen={"Россия"}
                        candidateCity={"Москва"}
                        candidateDescription={"Какая-то информация о себе"}                    
                    />
                    <CandidateContacts candidateEmail={"candidate-email@mail.ru"} candidatePhone={"8 900 000 00 00"}/>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                    <CandidateProffesional
                        candidatePosition={"ИТ Директор"}
                        candidateSalary={100000}
                        candidateGrade={"Сеньoр"}
                    />
                    <CandidateSkillsWidget 
                        skills={["React", "Redux", "Vue", "Vuex"]}                        
                    />
                </div>
                <div className="candidate--tables">
                    <CandidateCompaniesWidget 
                        candidateCompanies={[
                            {
                                companyId: 0,
                                companyName: "Компания №1",
                                companyPeriod: "18.04.2023 - 30.01.2024",
                                companyPosition: "ИТ Директор",
                                candidateDuties: "Руководил",
                                candidateAchivments: "Ачивка №1, Ачивка№2"
                            },
                            {
                                companyId: 1,
                                companyName: "Компания №2",
                                companyPeriod: "18.04.2023 - 30.01.2024",
                                companyPosition: "ИТ Директор",
                                candidateDuties: "Руководил",
                                candidateAchivments: "Ачивка №1"
                            }
                        ]}
                    />
                    <CandidateEducation 
                        candidateEducation={[
                            {
                                educationId: 0,
                                educationName: "Липецкий Государственный Технический университет",
                                educationFaculty: "Институт Компьютерных Наук",
                                eduactionPeriod: "25.08.2021 - 25.08.2025",
                                educationGrade: "Бакалавриат"
                            }
                        ]}
                    />
                    <CandidateLanguages
                        candidateLanguages= {[
                            {
                                languageId: 1,
                                languageName: "Английский",
                                languageLevel: "C1"
                            },
                            {
                                languageId: 2,
                                languageName: "Русский",
                                languageLevel: "C3"
                            }
                        ]}
                    />
                </div>
            </div>
        </div>
    </>
}