import { baseApi } from "../../../shared/api";

export const candidateApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllCandidates : build.query<any, { page: number, limit: number }>({
            query: ( args ) => ({
                url : `/resume?page=${args.page}&limit=${args.limit}`,
				headers : {
					"Content-Type": "application/json",
				},
				method : "GET",
				redirect : "follow"
            })
        }),
        getCandidateInfoById : build.query<any, { candidateId: number }>({
            query: ( args ) => ({
                url : `/resume/${args.candidateId}`,
				headers : {
					"Content-Type": "application/json",
				},
				method : "GET",
				redirect : "follow"
            })
        })
    }),
});

export const {
    useGetAllCandidatesQuery,
    useGetCandidateInfoByIdQuery
} = candidateApi;