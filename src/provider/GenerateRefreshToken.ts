import prisma  from "../database"
import dayjs  from "dayjs"

class GenerateRefreshToken{
    async execute(userId : number){
        const expiresIn = dayjs().add(7, "days").unix()
        
        const generateRefreshToken = await  prisma.refreshToken.create({
            data:{
                userId,
                expiresIn: expiresIn
            }
        })

        return generateRefreshToken
    }
}

export { GenerateRefreshToken}