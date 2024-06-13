import {Evaluation} from "@prisma/client"


export interface IEvaluation{
    create(id_indicator : number, id_unit: number, date_evaluation : Date, evaluator: string, valueNum : number | null, valueBol: boolean | null ):Promise<Evaluation>
}
