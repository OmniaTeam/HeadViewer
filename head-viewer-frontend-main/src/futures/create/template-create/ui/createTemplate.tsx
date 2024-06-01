import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from "@nextui-org/react";
import { Combobox, CustomSlider } from "futures";
import { ChangeEvent, useState } from "react";
import { useAppDispatch } from "shared/lib";
import { positions } from "widgets/cadidates-table/lib/positionsData";
import { skillsData } from "widgets/cadidates-table/lib/skillsData";
import { createTemplateThunk } from "../model";

export const CreateTemplate = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const dispacth = useAppDispatch()

    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);;
    const [selectedCities, setSelectedCities] = useState<string | null>('');
    const [selectedPosition, setSelectedPosition] = useState<string | null>('');
    const [selectedCitizenship, setSelectedCitizenship] = useState<string | null>('');

    const [templateName, setTemplateName] = useState<string>('')

    const [priceValues, setPriceValues] = useState<number[]>([0, 100000]);
    const [yearValues, setYearValues] = useState<number[]>([0, 100]);
    const [expValues, setExpValues] = useState<number[]>([0, 50]);

    const onCreateHandler = () => {
        dispacth(createTemplateThunk({
            templateName: templateName,
            templatePosition: String(selectedPosition),
            templateSitizen: String(selectedCitizenship),
            templateCity: String(selectedCities),
            templateSkills: selectedSkills.map(skill => Number(skill)),
            templateSalary: priceValues,
            templateAge: yearValues,
            templateExp: expValues
        })).then((res) => console.log(res))
    };

    const handlePositionChange = (value: string) => {
        setSelectedPosition(value);
    };

    const handleSitizenChange = (value: string) => {
        setSelectedCitizenship(value);
    };

    const handleSityChange = (value: string) => {
        setSelectedCities(value);
    };

    return (
        <>
            <Button onPress={onOpen} size="lg" color="primary" radius="sm">Новый шаблон</Button>
            <Modal size="lg" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Добавление нового шаблона</ModalHeader>
                            <ModalBody className="flex flex-col gap-3">
                                <Input isRequired size="sm" radius="sm" label="Название шаблона" onChange={(e: ChangeEvent<HTMLInputElement>) => setTemplateName(e.target.value)} />
                                <Combobox items={positions} label="Должность" actionLabel="Выберите должность" onChangeHandler={handlePositionChange} />
                                <Combobox items={positions} label="Гражданство" actionLabel="Выберите гражданство" onChangeHandler={handleSitizenChange} />
                                <Combobox items={positions} label="Город" actionLabel="Выберите город" onChangeHandler={handleSityChange} />
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
                                <CustomSlider minValue={0} maxValue={500000} step={10000} defaultValues={priceValues}
                                    onChange={(values) => setPriceValues(values)} labels={["Начальная ЗП", "Конечная ЗП"]} />
                                <CustomSlider minValue={0} maxValue={50} step={1} defaultValues={expValues}
                                    onChange={(values) => setExpValues(values)} labels={["Минимальный опыт", "Максимальный опыт"]} />
                                <CustomSlider minValue={0} maxValue={100} step={1} defaultValues={yearValues}
                                    onChange={(values) => setYearValues(values)} labels={["Минимальный возраст", "Максимальный возраст"]} />
                            </ModalBody>
                            <ModalFooter>
                                <Button radius="sm" color="default" variant="light" onPress={onClose}>
                                    Закрыть
                                </Button>
                                <Button radius="sm" color="primary" onPress={onCreateHandler}>
                                    Добавить
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
