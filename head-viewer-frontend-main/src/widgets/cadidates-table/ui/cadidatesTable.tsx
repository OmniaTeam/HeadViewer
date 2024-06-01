import { useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Chip, Link, Select, SelectItem, Button } from "@nextui-org/react";
import { CompareCandidates, CandidateSummary, Combobox, CustomSlider } from "futures";
import { CandidateCompanies, CandidateSkills } from "widgets";
import { positions, skillsData, statusHandler, yearHandler } from "../lib";
import { Key } from '@react-types/shared';
import { useGetAllCandidatesQuery } from "entities/candidate/api/candidateApi";
import { ECandidateStatuses } from "entities/candidate";

export const CandidatesTable = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(2)

    const { data: candidates, isLoading: candidatesLoading } = useGetAllCandidatesQuery({
        page: page,
        limit: limit
    })

    const [selectedKeys, setSelectedKeys] = useState<Set<Key>>(new Set());
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const selectedCandidates = Array.from(selectedKeys).map(candidateId => {
        const candidate = candidates.resume.find((candidate : any) => candidate.id === candidateId);
        return {
            candidateId: candidate ? Number(candidate.id) : 0,
            candidateFio: candidate ? String(candidate.fio) : ""
        };
    });

    const [priceValues, setPriceValues] = useState<number[]>([0, 100000]);
    const [yearValues, setYearValues] = useState<number[]>([0, 100]);
    const [expValues, setExpValues] = useState<number[]>([0, 50]);

    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
    const [selectedPositions, setSelectedPositions] = useState<string[]>([]);
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [selectedCitizenship, setSelectedCitizenship] = useState<string[]>([]);
    const [selectedCities, setSelectedCities] = useState<string[]>([]);
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>('');

    const handleTemplateChange = (value: string) => {
        setSelectedTemplate(value);
    };

    const handleApplyFilter = () => {
        console.log("Filter values:", priceValues, yearValues, expValues);
        console.log("Selected Statuses:", selectedStatuses);
        console.log("Selected Positions:", selectedPositions);
        console.log("Selected Skills:", selectedSkills);
        console.log("Selected Citizenship:", selectedCitizenship);
        console.log("Selected Cities:", selectedCities);
    };

    const handleComboboxChange = (value: string) => {
        console.log("Combobox selected value:", value);
    };

    const handleCompareClick = () => {
        setIsVisible(true)
        console.log(selectedTemplate)
    };

    return (
        <Table aria-label="candidates-table" radius="sm" isHeaderSticky selectionMode="multiple"
            onSelectionChange={(keys) => {
                if (keys === "all") {
                    setSelectedKeys(new Set(candidates.resume.map((candidate : any) => candidate.id)));
                } else {
                    setSelectedKeys(new Set(keys));
                }
            }}
            topContentPlacement="outside"
            bottomContentPlacement="outside"
            topContent={
                <div className="flex flex-col gap-4 items-start">
                    <div className="flex w-full gap-3 items-start">
                        <Combobox items={positions} label="Инициатор" actionLabel="Выберите инициатора" onChangeHandler={handleComboboxChange} />
                        <Select size="sm" radius="sm" label="Статусы" placeholder="Выберите статусы"
                            selectionMode="multiple" selectedKeys={selectedStatuses}
                            onSelectionChange={(keys) => {
                                if (keys === "all") {
                                    setSelectedStatuses(["Принят", "Отклонён", "В ожидании"]);
                                } else {
                                    setSelectedStatuses(Array.from(keys) as string[]);
                                }
                            }}>
                            {["Принят", "Отклонён", "В ожидании"].map((status, index) => (
                                <SelectItem key={index} value={status}>{status}</SelectItem>
                            ))}
                        </Select>
                        <Select size="sm" radius="sm" label="Должности" placeholder="Выберите должности"
                            selectionMode="multiple" selectedKeys={selectedPositions}
                            onSelectionChange={(keys) => {
                                if (keys === "all") {
                                    setSelectedPositions(positions.map(position => position.label));
                                } else {
                                    setSelectedPositions(Array.from(keys).map((val) => val) as string[]);
                                }
                            }}>
                            {positions.map((position) => (
                                <SelectItem key={position.key} value={position.label}>{position.label}</SelectItem>
                            ))}
                        </Select>
                        <Select size="sm" radius="sm" label="Навыки" placeholder="Выберите навыки"
                            selectionMode="multiple" selectedKeys={selectedSkills}
                            onSelectionChange={(keys) => {
                                if (keys === "all") {
                                    setSelectedSkills(skillsData.map(skill => skill.label));
                                } else {
                                    setSelectedSkills(Array.from(keys) as string[]);
                                }
                            }}>
                            {skillsData.map((skill) => (
                                <SelectItem key={skill.key} value={skill.label}>{skill.label}</SelectItem>
                            ))}
                        </Select>
                        <Select size="sm" radius="sm" label="Гражданство" placeholder="Выберите гражданство"
                            selectionMode="multiple" selectedKeys={selectedCitizenship}
                            onSelectionChange={(keys) => {
                                if (keys === "all") {
                                    setSelectedCitizenship(skillsData.map(citizenship => citizenship.label));
                                } else {
                                    setSelectedCitizenship(Array.from(keys) as string[]);
                                }
                            }}>
                            {skillsData.map((citizenship) => (
                                <SelectItem key={citizenship.key} value={citizenship.label}>{citizenship.label}</SelectItem>
                            ))}
                        </Select>
                        <Select size="sm" radius="sm" label="Город" placeholder="Выберите город"
                            selectionMode="multiple" selectedKeys={selectedCities}
                            onSelectionChange={(keys) => {
                                if (keys === "all") {
                                    setSelectedCities(skillsData.map(city => city.label));
                                } else {
                                    setSelectedCities(Array.from(keys) as string[]);
                                }
                            }}>
                            {skillsData.map((city) => (
                                <SelectItem key={city.key} value={city.label}>{city.label}</SelectItem>
                            ))}
                        </Select>
                    </div>
                    <div className="flex w-full gap-3 items-start wrap">
                        <CustomSlider minValue={0} maxValue={500000} step={10000} defaultValues={priceValues}
                            onChange={(values) => setPriceValues(values)} labels={["Начальная ЗП", "Конечная ЗП"]} />
                        <CustomSlider minValue={0} maxValue={50} step={1} defaultValues={expValues}
                            onChange={(values) => setExpValues(values)} labels={["Минимальный опыт", "Максимальный опыт"]} />
                        <CustomSlider minValue={0} maxValue={100} step={1} defaultValues={yearValues}
                            onChange={(values) => setYearValues(values)} labels={["Минимальный возраст", "Максимальный возраст"]} />
                    </div>
                    <Button className="max-w-[200px]" onPress={handleApplyFilter} size="md" variant="faded" color="default" radius="sm">Применить</Button>
                </div>
            }
            bottomContent={
                <div style={{ minHeight: "42px" }} className="flex w-full gap-3 items-center">
                    {candidatesLoading
                        ? "..."
                        : candidates && <>
                            <Pagination isCompact showControls showShadow color="primary" page={page} total={Math.ceil(candidates.total / limit)} onChange={(page) => setPage(page)} />
                            {selectedKeys.size >= 2 && <CompareCandidates candidates={selectedCandidates} onChangeHadnle={handleTemplateChange} onClickHandle={handleCompareClick} />}
                            {selectedKeys.size !== 0 && <CandidateSummary />}
                        </>
                    }
                </div>
            }
            classNames={{ wrapper: "min-h-[222px]" }}>
            <TableHeader>
                <TableColumn style={{ display: isVisible ? "auto" : "none" }}>ПРОЦЕНТ СОВПАДЕНИЯ</TableColumn>
                <TableColumn width={300}>ФИО</TableColumn>
                <TableColumn>EMAIL</TableColumn>
                <TableColumn>НОМЕР ТЕЛЕФОНА</TableColumn>
                <TableColumn>СТАТУС</TableColumn>
                <TableColumn>ЖЕЛАЕМАЯ ЗП</TableColumn>
                <TableColumn>ЖЕЛАЕМАЯ ДОЛЖНОСТЬ</TableColumn>
                <TableColumn>ОПЫТ РАБОТЫ</TableColumn>
                <TableColumn>КОЛ-ВО КОМПАНИЙ</TableColumn>
                <TableColumn>ГРАЖДАНСТВО</TableColumn>
                <TableColumn>ГОРОД</TableColumn>
                <TableColumn>ВОЗРАСТ</TableColumn>
                <TableColumn>НАВЫКИ</TableColumn>
                <TableColumn>ИНИЦИАТОР ЗАПИСИ</TableColumn>
            </TableHeader>
            <TableBody emptyContent="Кандидатов пока ещё нет">
                {candidatesLoading
                    ? <TableRow key="1">
                        <TableCell style={{ display: isVisible ? "auto" : "none" }}>Загрузка</TableCell>
                        <TableCell>Загрузка</TableCell>
                        <TableCell>Загрузка</TableCell>
                        <TableCell>Загрузка</TableCell>
                        <TableCell>Загрузка</TableCell>
                        <TableCell>Загрузка</TableCell>
                        <TableCell>Загрузка</TableCell>
                        <TableCell>Загрузка</TableCell>
                        <TableCell>Загрузка</TableCell>
                        <TableCell>Загрузка</TableCell>
                        <TableCell style={{ textWrap: "nowrap" }}>Загрузка</TableCell>
                        <TableCell>Загрузка</TableCell>
                        <TableCell>Загрузка</TableCell>
                        <TableCell style={{ textWrap: "nowrap" }}>Загрузка</TableCell>
                    </TableRow>
                    : candidates && candidates.resume.map((candidate: any) =>
                        <TableRow key={candidate.id}>
                            <TableCell style={{ display: isVisible ? "auto" : "none" }}>13%</TableCell>
                            <TableCell>
                                <Link style={{ textWrap: "nowrap" }} href={`/application/candidate/${candidate.id}`}>{candidate.fio}</Link>
                            </TableCell>
                            <TableCell>{candidate.email}</TableCell>
                            <TableCell>{candidate.phone}</TableCell>
                            <TableCell>
                                <Chip size="md" color={statusHandler(ECandidateStatuses.awaiting)} radius="sm">В ожидании</Chip>
                            </TableCell>
                            <TableCell>{candidate.salary_expectations_low}₽ - {candidate.salary_expectations_hight}₽</TableCell>
                            <TableCell>
                                <Chip size="md" color="default" radius="sm">{candidate.desired_position}</Chip>
                            </TableCell>
                            <TableCell>{yearHandler(candidate.experience_year)}</TableCell>
                            <TableCell>
                                <CandidateCompanies candidateId={candidate.candidateId} candadateCompanies={{
                                    company_name: "",
                                    start_work: "",
                                    end_work: "",
                                    post: "",
                                    responsibilies: "",
                                    progress: ""
                                }}/>
                            </TableCell>
                            <TableCell>{candidate.citizenship}</TableCell>
                            <TableCell style={{ textWrap: "nowrap" }}>{candidate.residence}</TableCell>
                            <TableCell>{yearHandler(candidate.year_old)}</TableCell>
                            <TableCell>
                                <CandidateSkills candidateId={candidate.candidateId}/>
                            </TableCell>
                            <TableCell style={{ textWrap: "nowrap" }}>Фамилия Имя Отчество</TableCell>
                        </TableRow>
                    )}
            </TableBody>
        </Table>
    );
};
