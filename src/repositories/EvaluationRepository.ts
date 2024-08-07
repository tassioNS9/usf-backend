import { IEvaluation } from "../interfaces/IEvaluation"
import { Evaluation } from "@prisma/client";
import prisma from "../database";

class EvaluationRepository implements IEvaluation {
  public async create(
    id_indicator: number,
    id_unit: number,
    date_evaluation: Date,
    evaluator: string,
    valueNum: number | null,
    valueBol: boolean | null

  ): Promise<Evaluation> {
    let evaluationExists = await prisma.evaluation.findFirst({
      where: {
        date_evaluation,
        AND: [
          {
            id_indicator
          },
          {
            id_unit
          }
        ]
      },
    });
    if (evaluationExists) {
      console.log(date_evaluation)
      console.log('error')
      throw new Error("Erro: Avaliação ja existente!");
    }

    if(date_evaluation > new Date()){
      throw new Error("Erro: Avaliação Inválida!");
    }
    const evaluation = await prisma.evaluation.create({
      data: {
        id_indicator,
        id_unit,
        evaluator,
        date_evaluation,
        valueNum,
        valueBol
      }
    });

    return evaluation;
  }
}

export { EvaluationRepository };
