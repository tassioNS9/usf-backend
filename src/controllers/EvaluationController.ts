
import { Request, Response } from "express";
import { EvaluationRepository } from "../repositories/EvaluationRepository"
import prisma from "../database";

export default {
  async createEvaluation(request: Request, response: Response) {
    try {
      const { id_indicator, id_unit, date_evaluation, evaluator, valueNum, valueBol } = request.body;

      const createEvaluation = new EvaluationRepository();

      const evaluation = await createEvaluation.create(id_indicator, id_unit, date_evaluation, evaluator, valueNum, valueBol);

      return response.status(201).json({ evaluation });
    } catch (e) {
      return response.status(400).json({ message: 'Data Inválida ou já registrada!' });
    }

  },
  //getEvaluations
  async getEvaluationsByYear(request: Request, response: Response) {
    const year = parseInt(request.params.year);
    try {

      const allEvaluations = await prisma.evaluation.findMany({
        where:{
        AND:[
          {
            date_evaluation:{gt: new Date(`${year}-01-01`)}
          
          },{
            date_evaluation:{lt: new Date(`${year + 1}-01-01`)}
          }
        ]
        },
        include: {
          indicator: {
            select: {
              description: true,
              type_Indicator: true
            }
          },
        },
      });

      return response.status(200).json({
        data:
          allEvaluations
      });

    } catch (error) {
      return response.status(400).json({ message: error });
    }
  },
  async getEvaluationsByUnit(request: Request, response: Response) {
    const id_unit = parseInt(request.params.id_unit);
    const year = parseInt(request.params.year);
    try {

      const allEvaluationsByUnit = await prisma.evaluation.findMany({
        where:{
          id_unit:id_unit,
          AND:[
            {
              date_evaluation:{gt: new Date(`${year}-01-01`)}
            
            },{
              date_evaluation:{lt: new Date(`${year + 1}-01-01`)}
            }
          ]
        },
        include: {
          indicator: {
            select: {
              description: true,
              type_Indicator: true,                 
            }
          },
          
        },orderBy:[
          {id_indicator:'asc'},
          {date_evaluation:'asc'}
        ]
      });

      return response.status(200).json({
        data:
        allEvaluationsByUnit
      });

    } catch (error) {
      return response.status(500).json({ message: error });
    }
  },

  async getEvaluationsByIndicator(request: Request, response: Response) {

    const unitId = parseInt(request.params.id_unit);
    const indicatortId = parseInt(request.params.id_indicator);

    
    try {
      const allEvaluationsByUnit = await prisma.evaluation.findMany({
        where:{
          id_unit:unitId,
          id_indicator:indicatortId
        },
        include:{
          indicator:{
            select:{
              description:true
            }
          }
        },
        orderBy:[
          {date_evaluation:'asc'}
        ]
   
      });


      return response.status(200).json({
        data:
        allEvaluationsByUnit
      });

    } catch (error) {
      return response.status(400).json({ message: error });
    }
  },

  // getEvaluationById
  async getEvaluationtById(request: Request, response: Response) {
    try {
      const evaluationId = parseInt(request.params.id);

      const evaluation = await prisma.evaluation.findUnique({
        where: {
          id: evaluationId,
        },
      });

      response.status(200).json({ data: evaluation });
    } catch (e) {
      return response.status(400).json({ message: e });
    }
  },// updateEvaluation
  async updateEvaluation(request: Request, response: Response) {
    try {
      const evaluationId = parseInt(request.params.id);
      const { id_indicator, id_unit, date_evaluation, valueNum, valueBol } = request.body;

      const evaluation = await prisma.evaluation.update({
        where: {
          id: evaluationId,
        },
        data: {
          id_indicator, id_unit, date_evaluation, valueNum, valueBol
        },
      });

      response.status(200).json({ data: evaluation });
    } catch (e) {
      
      response.status(400).json({ message: e});
    }
  },

  // deleteEvaluation
  async deleteEvaluation(request: Request, response: Response) {
    try {
      const evaluationId = parseInt(request.params.id);
      await prisma.evaluation.delete({
        where: {
          id: evaluationId,
        },
      });

      response.status(200).json({ data: { message: "Avaliação Deletada!" } });
    } catch (e) {
      response.status(500).json({ message: e});
    }
  }
};

