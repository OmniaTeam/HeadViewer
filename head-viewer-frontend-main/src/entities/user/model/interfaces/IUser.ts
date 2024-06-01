import { EUserRoles } from "../enums";

export interface IUser {
    userId: number;
    userFio: string;
    userLogin: string;
    userRole: EUserRoles
}