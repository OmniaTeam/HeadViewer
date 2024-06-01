import { useMemo, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Chip, Link, Select, SelectItem, Button } from "@nextui-org/react";
import { CandidateSkills } from "widgets";
import { Key } from '@react-types/shared';
import { useGetAllTemplatesQuery } from "entities/template/api/templateApi";
import { DeleteTemplate } from "futures/delete";

export const TemplatesTable = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(2)
    
    const { data: templates, isLoading: templatesLoading } = useGetAllTemplatesQuery({
        page: page,
        limit: limit
    })

    const [selectedKeys, setSelectedKeys] = useState<Set<Key>>(new Set());

    const selectedTemplates = Array.from(selectedKeys).map(templateId => {
        const template = templates.templates.find((template : any) => template.id === templateId);
        return {
            templateId: template ? Number(template.templateId) : 0,
            templateName: template ? String(template?.templateName) : ""
        };
    });

    const selectedTemplateIds = Array.from(selectedKeys)
        .map(key => Number(key))
        .filter(id => !isNaN(id));

    return (
        <Table aria-label="candidates-table" radius="sm" isHeaderSticky selectionMode="multiple"
            onSelectionChange={(keys) => {
                if (keys === "all") {
                    setSelectedKeys(new Set(templates.templates.map((template : any) => template.id)));
                } else {
                    setSelectedKeys(new Set(keys));
                }
            }}
            bottomContentPlacement="outside"
            bottomContent={
                <div style={{ minHeight: "42px" }} className="flex w-full gap-3 items-center">
                    {templatesLoading
                        ? "..."
                        : templates && <>
                            <Pagination isCompact showControls showShadow color="primary" page={page} total={Math.ceil(templates.total / limit)} onChange={(page) => setPage(page)} />
                            {selectedTemplateIds.length !== 0 && <DeleteTemplate templateIds={selectedTemplateIds}/> }
                        </>
                    }
                </div>
            }
            classNames={{ wrapper: "min-h-[222px]" }}>
            <TableHeader>
                <TableColumn>НАЗВАНИЕ</TableColumn>
                <TableColumn>ДОЛЖНОСТЬ</TableColumn>
                <TableColumn>НАВЫКИ</TableColumn>
                <TableColumn>ГРАЖДАНСТВО</TableColumn>
                <TableColumn>ГОРОД</TableColumn>
                <TableColumn>ЖЕЛАЕМАЯ ЗП</TableColumn>
                <TableColumn>ВОЗРАСТ</TableColumn>
                <TableColumn>ОПЫТ</TableColumn>
            </TableHeader>
            <TableBody emptyContent="Шаблоны пока ещё не созданы">
                {templatesLoading
                    ? <TableRow key="1">
                        <TableCell>Загрузка</TableCell>
                        <TableCell>Загрузка</TableCell>
                        <TableCell>Загрузка</TableCell>
                        <TableCell>Загрузка</TableCell>
                        <TableCell style={{ textWrap: "nowrap" }}>Загрузка</TableCell>
                        <TableCell style={{ textWrap: "nowrap" }}>Загрузка</TableCell>
                        <TableCell style={{ textWrap: "nowrap" }}>Загрузка</TableCell>
                        <TableCell style={{ textWrap: "nowrap" }}>Загрузка</TableCell>
                    </TableRow>
                    : templates && templates.templates.map((template: any) => 
                        <TableRow key={template.id}>
                            <TableCell>{template.name}</TableCell>
                            <TableCell>{template.position}</TableCell>
                            <TableCell><CandidateSkills candidateId={0}/></TableCell>
                            <TableCell>{template.sitizen}</TableCell>
                            <TableCell style={{ textWrap: "nowrap" }}>{template.sity}</TableCell>
                            <TableCell style={{ textWrap: "nowrap" }}>{template.salary_low}₽ - {template.salary_hight}₽</TableCell>
                            <TableCell style={{ textWrap: "nowrap" }}>{template.age_low} - {template.age_hight}</TableCell>
                            <TableCell style={{ textWrap: "nowrap" }}>{template.exp_low} - {template.exp_hight}</TableCell>
                        </TableRow>
                    )
                }
            </TableBody>
        </Table>
    );
};
