import { baseApi } from "../../../shared/api";
import { ITemplateCreateReq } from "../model";

export const templateApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllTemplates : build.query<any, { page: number, limit: number }>({
            query: ( args ) => ({
                url : `/template?page=${args.page}&limit=${args.limit}`,
				headers : {
					"Content-Type": "application/json",
				},
				method : "GET",
				redirect : "follow"
            })
        }),
        deleteTemplateById : build.mutation<any, { templateId: number }>({
            query: ( args ) => ({
                url : `/template/${args.templateId}`,
				headers : {
					"Content-Type": "application/json",
				},
				method : "DELETE",
				redirect : "follow"
            })
        }),
        createTemplate : build.mutation<any, ITemplateCreateReq>({
            query: ( args ) => ({
                url : `/template`,
				headers : {
					"Content-Type": "application/json",
				},
				method : "POST",
				redirect : "follow",
                body : JSON.stringify({
                    "name" : args.templateName,
                    "position" : args.templatePosition,
                    "skills" : args.templateSkills,
                    "sitizen" : args.templateSitizen,
                    "city" : args.templateCity,
                    "salary_low" : args.templateSalary[0],
                    "salary_hight" : args.templateSalary[1],
                    "age_low" : args.templateAge[0],
                    "age_high" : args.templateAge[1],
                    "exp_low" : args.templateExp[0],
                    "exp_high" : args.templateExp[1]
                })
            })
        })
    }),
});

export const {
    useGetAllTemplatesQuery,
    useDeleteTemplateByIdMutation
} = templateApi;