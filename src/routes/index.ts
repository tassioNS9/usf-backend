import { Router } from "express";
import UserController from "../controllers/UserController";
import UnitController from "../controllers/UnitController";
import AuthControler from "../controllers/AuthController";
import EvaluationController from "../controllers/EvaluationController";
import IndicatorController from "../controllers/IndicatorController";
import { AuthMiddlewares } from "../middlewares/auth";
import {RefreshTokenController}  from "../controllers/RefreshTokenController";
import GuidelineController from "../controllers/GuidelineController";
import ObjectiveController from "../controllers/ObjectiveController";
const router = Router();

const refreshTokenController = new RefreshTokenController()

//unit
router.post('/api/units', UnitController.createUnit)
router.get('/api/units', UnitController.getUnits)
// router.get('/api/units/search', UnitController.filteredUnits)
router.get('/api/units/:id', UnitController.getUnitById)
router.put('/api/units/:id', UnitController.updateUnit)
router.delete('/api/units/:id', UnitController.deleteUnit)


//users
router.post('/api/auth', AuthControler.authUser)
router.get('/api/auth/verify', AuthControler.authverifyUser)
router.post('/api/refresh-token', refreshTokenController.handle)
router.post('/api/users', UserController.createUser)
router.get('/api/users', UserController.getUsers)
// router.get('/api/users/search', UserController.filteredUsers)
router.get('/api/users/:id', UserController.getUserById)
router.put('/api/users/:id', UserController.updateUser)
router.delete('/api/users/:id', UserController.deleteUser)

//guidelines
router.post('/api/guidelines', GuidelineController.createGuideline )
router.get('/api/guidelines', GuidelineController.getGuildelines)
router.get('/api/guidelines/:id', GuidelineController.getGuidelineById)
router.put('/api/guidelines/:id', GuidelineController.updateGuideline)
router.delete('/api/guidelines/:id', GuidelineController.deleteGuideline)

//objectives
router.post('/api/objectives', ObjectiveController.createObjective )
router.get('/api/objectives', ObjectiveController.getObjectives)
router.get('/api/objectives/:id', ObjectiveController.getObjectiveById)
router.get('/api/objectives/guideline/:id',ObjectiveController.getObjectivesByGuideline)
router.put('/api/objectives/:id', ObjectiveController.updateObjective)
router.delete('/api/objectives/:id', ObjectiveController.deleteObjective)

//evaluations
router.post('/api/evaluations', EvaluationController.createEvaluation )
router.get('/api/evaluations/:year', EvaluationController.getEvaluationsByYear)
router.get('/api/evaluations/unit/:id_unit/indicator/:id_indicator', EvaluationController.getEvaluationsByIndicator)
router.get('/api/evaluations/unit/:id_unit/year/:year', EvaluationController.getEvaluationsByUnit)
router.get('/api/evaluations/:id', EvaluationController.getEvaluationtById)
router.put('/api/evaluations/:id', EvaluationController.updateEvaluation)
router.delete('/api/evaluations/:id', EvaluationController.deleteEvaluation)

//indicators
router.post('/api/indicators', IndicatorController.createIndicator )
router.get('/api/indicators', IndicatorController.getIndicators)
router.get('/api/indicators/search', IndicatorController.filteredIndicators)
router.get('/api/indicators-numerics/:id_unit/:year', IndicatorController.getIndicatorsNumericsByUnit)
router.get('/api/indicators-booleans/:id_unit/:year', IndicatorController.getIndicatorsBOLByUnit)
router.get('/api/indicators/:id', IndicatorController.getIndicatorById)
router.put('/api/indicators/:id', IndicatorController.updateIndicator)
router.delete('/api/indicators/:id', IndicatorController.deleteIndicator)

export default router;