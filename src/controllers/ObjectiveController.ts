
import { ObjectiveRepository } from "../repositories/ObjectiveRepository";
import { Request, Response } from "express";
import prisma from "../database";

export default {
  async createObjective(request: Request, response: Response) {

    try{
      const { numeration, description, id_guideline } = request.body;

      const createObjective = new ObjectiveRepository();

      let objectiveExists = await prisma.objective.findFirst({
        where: {
            numeration,
        },
      });
      if (objectiveExists) {
        return response.status(400).json({ message: 'Número de objetivo já cadastrado!' });
      }
  
      const objective = await createObjective.create(
        numeration,
        description,
        id_guideline
      );
      return response.status(201).json({ objective });

    }catch(e){
      return response.status(400).json({message:e})
    }
   
  },
  async getObjectives(request: Request, response: Response) {
    try {

      //let take = request.query.limit ? parseInt(request.query.limit) : 10;
      const allobjectives = await prisma.objective.findMany({
       // take:10,
        orderBy: {
          numeration: 'asc', // Ordenar pelo campo 'nome' em ordem ascendente (alfabética)
        },
        include: {
          guideline: {
            select:{
              description:true,
              numeration:true
            }
          }
        }
      });

      return response.status(200).json({ data: allobjectives });
    } catch (error) {
      return response.status(400).json({message:error})
    }
  },
  async getObjectivesByGuideline(request: Request, response: Response) {

    try {
      const guidelineId = parseInt(request.params.id);
      //let take = request.query.limit ? parseInt(request.query.limit) : 10;
      const allobjectives = await prisma.objective.findMany({
        where:{
          id_guideline:guidelineId
        }
      });

      return response.status(200).json({ data: allobjectives });
    } catch (error) {
      return response.status(400).json({message:error})
    }
  },
  
  async getObjectiveById(request: Request, response: Response) {
    try {
      const objectiveId = parseInt(request.params.id);
      const objective = await prisma.objective.findUnique({
        where: {
          id: objectiveId,
        },
      });

      response.status(200).json({ data: objective });
    } catch (e) {
      return response.status(500).json({message:e})
    }
  },// updateUnit
   async updateObjective(request: Request, response: Response){
    try {
      const objectiveId = parseInt(request.params.id);
      const { numeration, description, id_guideline } = request.body;
  
      const objective = await prisma.objective.update({
        where: {
          id: objectiveId,
        },
        data: {
          numeration, description, id_guideline
        },
      });
  
      response.status(200).json({ data: objective });
    } catch (e) {
      return response.json({ message: e });
    }
  },
  
  // deleteUnit
  async deleteObjective(request: Request, response: Response){
    try {
      const ObjectiveId = parseInt(request.params.id);
      const Objective = await prisma.objective.delete({
        where: {
          id: ObjectiveId,
        },
      });
  
      response.status(200).json({ data: {message:"Objetivo Deletado!"} });
    } catch (e) {
      return response.status(500).json({message:e})
    }
  }
};