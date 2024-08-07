import {Guideline} from "@prisma/client"

export interface IGuideline{
    create(numeration:number, description : string ):Promise<Guideline>
}