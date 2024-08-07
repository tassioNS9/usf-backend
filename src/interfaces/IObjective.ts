import {Objective} from "@prisma/client"

export interface IObjective{
    create(numeration:number, description : string , id_guideline:number ):Promise<Objective>
}