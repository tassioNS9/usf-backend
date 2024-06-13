import {Role, User , Evaluation} from "@prisma/client"


export interface IUser{
    create(name : string, cpf : string, password : string, id_unit: number, office: string, role:Role ):Promise<User>
  

}