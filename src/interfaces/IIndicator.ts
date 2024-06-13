import {Indicator, TypeIndicators, Unit, User} from "@prisma/client"


export interface IIndicator{
    create(description : string, objective: number , dimension : string, type_indicator: TypeIndicators, sources: string, id_unit : number  ):Promise<Indicator>
}
