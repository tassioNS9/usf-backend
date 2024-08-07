
import { IGuideline } from '../interfaces/IGuideline';
import {Guideline} from "@prisma/client"
import prisma from "../database";

class GuidelineRepository implements IGuideline {
  public async create(
    numeration:number,
    description : string,

  ): Promise<Guideline> {

    let guidelineExists = await prisma.guideline.findFirst({
      where: {
        numeration,
      },
    });
    if (guidelineExists) {
      throw new Error("Erro: Diretriz já registrada com essa numeração!");
    }
   

    const guideline = await prisma.guideline.create({
      data: {
        numeration,
        description,
      }
    });

    return guideline;
  }
}

export { GuidelineRepository };