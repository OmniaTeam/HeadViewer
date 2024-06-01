import { createSlice } from "@reduxjs/toolkit";
import { ICandidate } from "./interfaces";

const initialState: ICandidate = {
    candidateId: 0,
    candidateFio: "",
    candidateEmail: "",
    candidatePhone: "",
    candidateSalary: 0,
    candidatePosition: "",
    candidateExperience: 0,
    candidateCompanies: [],
    candidateEducation: [],
    candidateLanguages: [],
    candidateCitizen: "",
    candidateCity: "",
    candidateAge: 0,
    candidateSkills: [],
    candidateInitiatorId: 0,
    candidateGrade: "",
    candidateAbout: ""
}

export const ICandidateSlice = createSlice({
    name: "candidate",
    initialState,
    reducers: {}
})

// export const {
// } = ICandidateSlice.actions