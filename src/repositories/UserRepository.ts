import { IUser } from "../interfaces/IUser";
import { Role, User } from "@prisma/client";
import prisma from "../database";
import { hash } from "bcrypt";

class UserRepository implements IUser {
  public async create(
    name: string,
    cpf: string,
    password: string,
    id_unit : number | null,
    office: string,
    role: Role,
): Promise<User> {
    let userExists = await prisma.user.findFirst({
      where: {
        cpf,
      },
    });
    if (userExists) {
      throw new Error("Erro: usuário/CPF ja existe!");
    }

    if( (role === Role.USER || role === Role.DIRECTOR) && id_unit === null){
      throw new Error("Erro: Unidade obrigatória!");
    }
    if( (role === Role.ADMIN || role === Role.MANAGER) && id_unit !== null){
      throw new Error("Erro ao cadastrar ADM ou Gerente");
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
