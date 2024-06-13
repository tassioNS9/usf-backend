import jwt from "jsonwebtoken";


class GenerateTokenProvider{

    async execute(userId : number){
        const token =  jwt.sign({userId}, process.env.SECRET, {
          expiresIn: "1w",
        });

        return token;
    }

    

}

export { GenerateTokenProvider}