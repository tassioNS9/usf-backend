import prisma from "../database"
import { GenerateTokenProvider } from "../provider/GenerateTokenProvider"
import { GenerateRefreshToken } from "../provider/GenerateRefreshToken"
import dayjs from "dayjs"

class RefreshTokenRepository {
    async execute(refresh_token : number){
        const refreshToken = await prisma.refreshToken.findFirst({
            where:{
                id: refresh_token
            }
        })
        if(!refreshToken){
            throw new Error("Refresh token invalid")
        }

        const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expiresIn));

        const generateTokenProvider = new GenerateTokenProvider();
        const token = await generateTokenProvider.execute(refreshToken.userId)
        


        if(refreshTokenExpired){
            await prisma.refreshToken.deleteMany({
                where:{
                    userId:refreshToken.userId
                }
            })
          
        const generateRefreshTokenProvider = new GenerateRefreshToken()
        const newRefreshToken = await generateRefreshTokenProvider.execute(refreshToken.userId)
        
        return { token, refreshToken: newRefreshToken}
    
    }

    return {token}

    }
}

export { RefreshTokenRepository}