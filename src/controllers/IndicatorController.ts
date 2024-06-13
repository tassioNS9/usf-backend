import { IndicatorRepository } from "../repositories/IndicatorRepository";
import { Request, Response } from "express";
import prisma from "../database";
import { TypeIndicators } from "@prisma/client";


export default {
  async createIndicator(request: Request, response: Response) {

    try{
      const {description , objective, dimension , type_Indicator, sources } = request.body;

      const createIndicator = new IndicatorRepository();
  
      const indicator = await createIndicator.create( description , objective, dimension , type_Indicator, sources);

      return response.status(201).json({ indicator });
    }catch(e){
      response.status(400).json({ message: e});
    }
    
  },
    //getEvaluations
    async getIndicators(request: Request, response: Response) {
      try {
  
        const allIndicators = await prisma.indicator.findMany({
      
        });
  
        return response.status(200).json({
          data:
            allIndicators
        });
  
      } catch (error) {
        return response.json({ message: error });
      }
    },

    async getIndicatorsNumericsByUnit(request: Request, response: Response) {

      const id_unit = parseInt(request.params.id_unit);
      const year = parseInt(request.params.year)
      try {
      const allIndicatorsTypeNum = await prisma.indicator.findMany({
          where:{
            type_Indicator:TypeIndicators.NUMERIC,
          },include:{
            evaluations:{
              where:{
                AND:[
                  {
                    id_unit:id_unit,
                  },
                  {
                    date_evaluation:{gte: new Date(`${year}-01-01`), lt: new Date(`${year + 1}-01-01`)},
                  },
              
                ]             
              },
              orderBy:{
                date_evaluation:'asc'
              }
            }
          }
        });


  
        return response.status(200).json({
          data:
           allIndicatorsTypeNum
        });
  
      } catch (error) {
        return response.json({ message: error });
      }
    },

    async getIndicatorsTypeBOL(request: Request, response: Response) {
      const unitId = parseInt(request.params.id);


      try {
        const allIndicatorsTypeBOOL = await prisma.indicator.findMany({
          where:{
            type_Indicator:TypeIndicators.BOOL
            
          },include:{
            evaluations:{
              where:{
                id_unit:unitId
                
              },
              orderBy:{
                date_evaluation:'asc'
              }
            }
          }
        });
  
        return response.status(200).json({
          data:
          allIndicatorsTypeBOOL
        });
  
      } catch (error) {
        return response.json({ message: error });
      }
    },
    async filteredIndicators(request: Request, response: Response) {
      const { searchString} = request.query;
  
      try{
        const filteredIndicators = await prisma.indicator.findMany({
          where: {      
                description:{contains: searchString.toString()}
          },
        }) 
        if(filteredIndicators.length === 0){
          return response.send({message:'Unidade não encontrada!'});
        }
  
        return response.json({data: filteredIndicators});
      } catch (error) {
        return response.status(500).json(error);
      }
    },
  // getIndicatorById
  async getIndicatorById(request: Request, response: Response) {
    try {
      const indicatorId = parseInt(request.params.id);

      const indicator = await prisma.indicator.findUnique({
        where: {
          id: indicatorId,
        },
      });

      response.status(200).json({ data: indicator });
    } catch (e) {
      response.status(400).json({ message: e});
    }
  },// updateUnit
  async updateIndicator(request: Request, response: Response) {
    try {
      const indicatorId = parseInt(request.params.id);
      const { description , objective, dimension , type_Indicator, sources } = request.body;

      const indicator = await prisma.indicator.update({
        where: {
          id: indicatorId,
        },
        data: {
          description , objective, dimension , type_Indicator, sources 
        },
      });

      response.status(200).json({ data: indicator });
    } catch (e) {
      response.status(400).json({ message: e});
    }
  },

  // deleteUnit
  async deleteIndicator(request: Request, response: Response) {
    try {
      const indicatorId = parseInt(request.params.id);
       await prisma.indicator.delete({
        where: {
          id: indicatorId,
        },
      });

      response.status(200).json({ data: { message: "Indicador Deletado!" } });
    } catch (e) {
      response.status(400).json({ message: e});
    }
  }
};