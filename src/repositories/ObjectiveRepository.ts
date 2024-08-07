import { IObjective } from './../interfaces/IObjective';
import {Objective} from "@prisma/client"
import prisma from "../database";

class ObjectiveRepository implements IObjective {
  public async create(
    numeration:number,
    description : string,
    id_guideline : number,

  ): Promise<Objective> {

    let objectiveExists = await prisma.objective.findFirst({
      where: {
        id_guideline,
        numeration,
      },
    });
    if (objectiveExists) {
      throw new Error("Erro: Objetivo já registrado com essa numeração!");
    }
   

    const objective = await prisma.objective.create({
      data: {
        numeration,
        description,
        id_guideline,
      }
    });

    return objective;
  }
}

export { ObjectiveRepository };
