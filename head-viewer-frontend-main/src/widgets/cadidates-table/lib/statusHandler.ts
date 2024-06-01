import { ECandidateStatuses } from "entities/candidate";

export const statusHandler = (status : ECandidateStatuses) => {
    switch (status) {
        case ECandidateStatuses.accept: return "success";
        case ECandidateStatuses.rejected: return "danger";
        case ECandidateStatuses.awaiting: return "warning";
        default: return "warning"
    }
}