import { ECandidateStatuses } from "entities/candidate";

export const templates = () => {
    return [
        {
            templateId: 1,
            templateName: "Шаблон №1",
            templatePosition: "Аналитик данных",
            templateSkills: ["SQL", "Python", "Анализ данных"],
            templateSitizen: "Россия",
            templateSity: "Москва",
            templateSalary: [0, 100000],
            templateAge: [18, 30],
            templateExp: [3, 5]
        },
        {
            templateId: 2,
            templateName: "Шаблон №2",
            templatePosition: "Программист",
            templateSkills: ["JavaScript", "React", "Node.js"],
            templateSitizen: "Украина",
            templateSity: "Киев",
            templateSalary: [50000, 200000],
            templateAge: [22, 40],
            templateExp: [2, 10]
        },
        {
            templateId: 3,
            templateName: "Шаблон №3",
            templatePosition: "Системный администратор",
            templateSkills: ["Linux", "Networking", "Скриптинг"],
            templateSitizen: "Беларусь",
            templateSity: "Минск",
            templateSalary: [30000, 120000],
            templateAge: [25, 45],
            templateExp: [5, 15]
        },
        {
            templateId: 4,
            templateName: "Шаблон №4",
            templatePosition: "Дизайнер",
            templateSkills: ["Photoshop", "Illustrator", "UI/UX"],
            templateSitizen: "Казахстан",
            templateSity: "Алматы",
            templateSalary: [40000, 150000],
            templateAge: [20, 35],
            templateExp: [1, 8]
        },
        {
            templateId: 5,
            templateName: "Шаблон №5",
            templatePosition: "Менеджер проектов",
            templateSkills: ["Управление проектами", "Scrum", "Коммуникации"],
            templateSitizen: "Россия",
            templateSity: "Санкт-Петербург",
            templateSalary: [60000, 180000],
            templateAge: [28, 50],
            templateExp: [5, 20]
        }
    ];
};
