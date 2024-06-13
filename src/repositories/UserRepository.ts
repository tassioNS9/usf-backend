import { IUser } from "../interfaces/IUser";
import { Role, User } from "@prisma/client";
import prisma from "../database";
import { hash } from "bcrypt";

class UserRepository implements IUser {
  public async create(
    name: string,
    cpf: string,
    password: string,
    id_unit : number,
    office: string,
    role: Role,
): Promise<User> {
    let userExists = await prisma.user.findFirst({
      where: {
        cpf,
      },
    });
    if (userExists) {
      throw new Error("Erro: usuário ja existe!");
    }

    const HashPassword = await hash(password, 8)

    const user = await prisma.user.create({
      data: {
        name,
        cpf,
        id_unit,
        office,    
        role,
        password : HashPassword,
      },
    });

    return user;
  }

}

export {UserRepository}
