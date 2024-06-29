import { UnitRepository } from "../repositories/UnitRepository";
import { Request, Response } from "express";
import prisma from "../database";

export default {
  async createUnit(request: Request, response: Response) {

    try{
      const { name, tel, address, neighborhood, city, state } = request.body;

      const createUnit = new UnitRepository();

      let unitExists = await prisma.unit.findFirst({
        where: {
          name,
        },
      });
      if (unitExists) {
        return response.status(400).json({ message: 'Nome de unidade já cadastrada!' });
      }
  
      const unit = await createUnit.create(
        name,
        tel,
        address,
        neighborhood,
        city,
        state
      );
      return response.status(201).json({ unit });

    }catch(e){
      return response.status(400).json({message:e})
    }
   
  },
  async getUnits(request: Request, response: Response) {
    try {

      //let take = request.query.limit ? parseInt(request.query.limit) : 10;
      const allUnits = await prisma.unit.findMany({
       // take:10,
        orderBy: {
          name: 'desc', // Ordenar pelo campo 'nome' em ordem ascendente (alfabética)
        },
        include:{
          users:true
        }
      });

      return response.status(200).json({ data: allUnits });
    } catch (error) {
      return response.status(400).json({message:error})
    }
  },
  
  // async filteredUnits(request: Request, response: Response) {
  //   const { searchString} = request.query;

  //   try{
  //     const filteredUnits = await prisma.unit.findMany({
  //       where: {      
  //             name:{contains: searchString.toString()}
  //       },
  //       orderBy: {
  //         name: 'asc', // Ordenar pelo campo 'nome' em ordem ascendente (alfabética)
  //       },
  //     }) 
  //     if(filteredUnits.length === 0){
  //       return response.send({message:'Unidade não encontrada!'});
  //     }

  //     return response.json({data: filteredUnits});
  //   } catch (error) {
  //     return response.status(500).json(error);
  //   }
  // },
  // getUnitById
  async getUnitById(request: Request, response: Response) {
    try {
      const unitId = parseInt(request.params.id);
      const unit = await prisma.unit.findUnique({
        where: {
          id: unitId,
        },
        include: {
          users: true,
        },
      });

      response.status(200).json({ data: unit });
    } catch (e) {
      return response.status(500).json({message:e})
    }
  },// updateUnit
   async updateUnit(request: Request, response: Response){
    try {
      const unitId = parseInt(request.params.id);
      const {name, tel, address, neighborhood, city , state } = request.body;
  
      const unit = await prisma.unit.update({
        where: {
          id: unitId,
        },
        data: {
          name, tel, address, neighborhood, city , state
        },
      });
  
      response.status(200).json({ data: unit });
    } catch (e) {
      return response.json({ message: e });
    }
  },
  
  // deleteUnit
  async deleteUnit(request: Request, response: Response){
    try {
      const unitId = parseInt(request.params.id);
      const unit = await prisma.unit.delete({
        where: {
          id: unitId,
        },
      });
  
      response.status(200).json({ data: {message:"unidade Deletada!"} });
    } catch (e) {
      return response.status(500).json({message:e})
    }
  }
};