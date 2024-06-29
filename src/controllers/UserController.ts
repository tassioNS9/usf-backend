import { UserRepository } from "../repositories/UserRepository";
import { Request, Response } from "express";
import prisma from "../database";
import { hash } from "bcrypt";
export default {
  async createUser(request: Request, response: Response) {

    try {
      const { name, cpf, password, id_unit, office, role } = request.body;

      const createUser = new UserRepository();

      let userExists = await prisma.user.findFirst({
        where: {
          cpf,
        },
      });
      if (userExists) {
        return response.status(400).json({ message: 'CPF já cadastrado!' });
      }

      if (role === "USER" && id_unit === null) {
        return response.status(400).json({ message: 'Unidade é obrigatória!' });
      }

      const user = await createUser.create(name, cpf, password, id_unit, office, role);

      return response.status(201).json({ user });

    } catch (e) {
      response.status(400).json({ message: e});
    }

  },
  async getUsers(request: Request, response: Response) {

   // page: a página atual desejada.
  //  pageSize: o número de itens por página.
  //  Por exemplo, /itens?page=2&pageSize=5

    try {
      //let take = request.query.limit ? parseInt(request.query.limit as string) : 5;
      //const page = request.query.page ? parseInt(request.query.page as string) : 1;
     // const pageSize = request.query.pageSize ? parseInt(request.query.pageSize as string) : 10; // Número de itens por página (padrão: 10)
      //const skip = (page - 1) * pageSize; // Calcular o valor de skip

      const allUsers = await prisma.user.findMany({
      //  take : pageSize,
      //  skip: skip,
        orderBy: {
          name: 'asc', // Ordenar pelo campo 'nome' em ordem ascendente (alfabética)
        },
        include: {
          unit: {
            select:{
              name:true
            }
          }
        }
      });

      return response.status(200).json({
        data:
          allUsers,
      });

    } catch (error) {
      response.status(400).json({ message: error});
    }
  },

  async getUserById(request: Request, response: Response) {
    try {

      const userId = parseInt(request.params.id);
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      response.status(200).json({ data: user });
    } catch (e) {
      return response.status(500).json({ message: e });
    }
  },
  async updateUser(request: Request, response: Response) {
    try {
      const userId = parseInt(request.params.id);
      const { name, cpf, password, id_unit, office, role } = request.body;

      const HashPassword = await hash(password, 8)

      const user = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          name, cpf, password: HashPassword, id_unit, office, role
        },
      });

      response.status(200).json({ data: user });
    } catch (e) {
      return response.status(500).json({ message: e });
    }
  },

  // deleteUser
  async deleteUser(request: Request, response: Response) {
    try {
      const userId = parseInt(request.params.id)
      const user = await prisma.user.delete({
        where: {
          id: userId,
        },
      });

      response.status(200).json({ data: { message: "Usuário Deletado!" } });
    } catch (e) {
      return response.status(500).json({ message: e });
    }
  }
};
