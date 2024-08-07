import { IIndicator } from "../interfaces/IIndicator";
import { Indicator, TypeIndicators } from "@prisma/client";
import prisma from "../database";

class IndicatorRepository implements IIndicator {
  public async create(
    description : string,
    id_objective : number,
    type_Indicator : TypeIndicators,
    sources : string
  ): Promise<Indicator> {

    let IndicatorExists = await prisma.indicator.findFirst({
      where: {
        description,
      },
    });
    if (IndicatorExists) {
      throw new Error("Erro: Indicador já registrado com esse nome!");
    }
   

    const indicator = await prisma.indicator.create({
      data: {
        description,
        id_objective,
        type_Indicator,
        sources
      }
    });

    return indicator;
  }
}

export { IndicatorRepository };