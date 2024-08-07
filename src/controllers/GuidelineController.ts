
import { ObjectiveRepository } from "../repositories/ObjectiveRepository";
import { GuidelineRepository } from "../repositories/GuidelineRepository";
import { Request, Response } from "express";
import prisma from "../database";

export default {
  async createGuideline(request: Request, response: Response) {

    try{
      const { numeration, description } = request.body;

      const createGuildeline = new GuidelineRepository();

      let guidelineExists = await prisma.guideline.findFirst({
        where: {
            numeration,
        },
      });
      if (guidelineExists) {
        return response.status(400).json({ message: 'Número de diretriz já cadastrado!' });
      }
  
      const guildeline = await createGuildeline.create(
        numeration,
        description,
      );
      return response.status(201).json({ guildeline });

    }catch(e){
      return response.status(400).json({message:e})
    }
   
  },
  async getGuildelines(request: Request, response: Response) {
    try {

      //let take = request.query.limit ? parseInt(request.query.limit) : 10;
      const allguildelines = await prisma.guideline.findMany({
       // take:10,
        orderBy: {
          numeration: 'asc', // Ordenar pelo campo 'nome' em ordem ascendente (alfabética)
        },
      });

      return response.status(200).json({ data: allguildelines });
    } catch (error) {
      return response.status(400).json({message:error})
    }
  },
  
  async getGuidelineById(request: Request, response: Response) {
    try {
      const guidelineId = parseInt(request.params.id);
      const guideline = await prisma.guideline.findUnique({
        where: {
          id: guidelineId,
        },
      });

      response.status(200).json({ data: guideline });
    } catch (e) {
      return response.status(500).json({message:e})
    }
  },// updateUnit
  
   async updateGuideline(request: Request, response: Response){
    try {
      const guidelineId = parseInt(request.params.id);
      const { numeration, description} = request.body;
  
      const guideline = await prisma.guideline.update({
        where: {
          id: guidelineId,
        },
        data: {
          numeration, description
        },
      });
  
      response.status(200).json({ data: guideline });
    } catch (e) {
      return response.json({ message: e });
    }
  },
  
  // deleteUnit
  async deleteGuideline(request: Request, response: Response){
    try {
      const guidelineId = parseInt(request.params.id);
      const guideline = await prisma.guideline.delete({
        where: {
          id: guidelineId,
        },
      });
  
      response.status(200).json({ data: {message:"Diretriz Deletada!"} });
    } catch (e) {
      return response.status(500).json({message:e})
    }
  }
};