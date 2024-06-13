import { IUnit } from "../interfaces/IUnit";
import { Unit } from "@prisma/client";
import prisma from "../database";

class UnitRepository implements IUnit {
  public async create(
    name: string,
    tel: string,
    address: string,
    neighborhood: string,
    city: string,
    state: string
  ): Promise<Unit> {
    let unitExists = await prisma.unit.findFirst({
      where: {
        name,
      },
    });
    if (unitExists) {
      throw new Error("Erro: Unidade ja existe!");
    }

    const unit = await prisma.unit.create({
      data: {
        name,
        tel,
        address,
        neighborhood,
        city,
        state,
      }
    });

    return unit;
  }
}


export { UnitRepository };

