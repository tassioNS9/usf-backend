
import { IUserAuthenticate } from "../interfaces/IUserAuthenticate";
import prisma from "../database";
import { compare } from "bcrypt";
import { GenerateRefreshToken } from "../provider/GenerateRefreshToken";
import { GenerateTokenProvider } from "../provider/GenerateTokenProvider";

class AuthRepository implements IUserAuthenticate {
  public async auth(cpf: string, password: string) {
    const userAlreadyExists = await prisma.user.findFirst({
      where: { cpf }
    });

    if (!userAlreadyExists) {
      throw new Error("Error: cpf Inválido!");
    }

    const checkPassword = await compare(password, userAlreadyExists.password);

    if (!checkPassword) {
      throw new Error("Error: Senha Incorreta!");
    }

    const generateTokenProvider = new GenerateTokenProvider();
    const token = await generateTokenProvider.execute(userAlreadyExists.id) 
    
    await prisma.refreshToken.deleteMany({
      where:{
        userId:userAlreadyExists.id
      }
    })
    
    const generateRefreshToken = new GenerateRefreshToken();
    const refreshToken = await generateRefreshToken.execute(userAlreadyExists.id)

    return {token,refreshToken};
  }
}

export { AuthRepository }