import { ICandidateCompanies } from "./ICandidateCompanies";
import { ICandidateEducation } from "./ICandidateEducation";
import { ICandidateLanguages } from "./ICandidateLanguages";
import { ICandidateSkills } from "./ICandidateSkills";

export interface ICandidate {
    candidateId: number;
    candidateFio: string;
    candidateEmail: string;
    candidatePhone: string;
    candidateSalary: number;
    candidatePosition: string;
    candidateExperience: number;
    candidateCompanies: ICandidateCompanies[];
    candidateEducation: ICandidateEducation[];
    candidateLanguages: ICandidateLanguages[];
    candidateCitizen: string;
    candidateCity: string;
    candidateAge: number;
    candidateSkills: ICandidateSkills[];
    candidateInitiatorId: number;
    candidateGrade: string;
    candidateAbout: string;
}