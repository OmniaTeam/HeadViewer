import { createSlice } from "@reduxjs/toolkit";
import { ITemplate } from "./interfaces";

const initialState: ITemplate = {
    templateId: 0,
    templateName: "",
    templatePosition: "",
    templateSkills: [],
    templateSitizen: "",
    templateSity: "",
    templateSalary: [],
    templateAge: [],
    templateExp: []
}

export const ITemplateSlice = createSlice({
    name: "template",
    initialState,
    reducers: {}
})

// export const {
// } = ITemplateSlice.actions