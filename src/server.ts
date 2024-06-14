import "express-async-errors";
import  Express, { NextFunction, Request, Response } from "express";
import cors from "cors"
import router from "./routes";
import UserController from "./controllers/UserController";
import prisma from "./database";
const app = Express();


const port = process.env.PORT ?? 3333

app.use(Express.json())
app.use(cors())
app.use(router)

//router.get('/api/users', UserController.getUsers)

app.get('/userslist', async (request, response) => {
    const users= await prisma.user.findMany()
    return response.json(users)
  })

app.use((error: Error, request: Request, response: Response, next:NextFunction)=>{
    return response.json({
        status: "Error",
        message: error.message
    });
})

app.listen(port, ()=> console.log(`server listen on PORT ${port}`) );