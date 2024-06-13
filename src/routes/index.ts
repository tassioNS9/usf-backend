import { Router } from "express";
import UserController from "../controllers/UserController";
import UnitController from "../controllers/UnitController";
import AuthControler from "../controllers/AuthController";
import EvaluationController from "../controllers/EvaluationController";
import IndicatorController from "../controllers/IndicatorController";
import { AuthMiddlewares } from "../middlewares/auth";
import {RefreshTokenController}  from "../controllers/RefreshTokenController";
const router = Router();

const refreshTokenController = new RefreshTokenController()

//unit
router.post('/api/units', AuthMiddlewares, UnitController.createUnit)
router.get('/api/units', AuthMiddlewares, UnitController.getUnits)
router.get('/api/units/search', AuthMiddlewares, UnitController.filteredUnits)
router.get('/api/units/:id', AuthMiddlewares, UnitController.getUnitById)
router.put('/api/units/:id', AuthMiddlewares, UnitController.updateUnit)
router.delete('/units/:id', AuthMiddlewares, UnitController.deleteUnit)


//users
router.post('/api/auth', AuthControler.authUser)
router.get('/api/auth/verify', AuthControler.authverifyUser)
router.post('/api/refresh-token', refreshTokenController.handle)
router.post('/api/users', AuthMiddlewares, UserController.createUser)
router.get('/api/users', AuthMiddlewares, UserController.getUsers)
router.get('/api/users/search', AuthMiddlewares, UserController.filteredUsers)
router.get('/api/users/:id', AuthMiddlewares, UserController.getUserById)
router.put('/api/users/:id', AuthMiddlewares, UserController.updateUser)
router.delete('/users/:id', AuthMiddlewares, UserController.deleteUser)

//evaluations
router.post('/api/evaluations', AuthMiddlewares, EvaluationController.createEvaluation )
router.get('/api/evaluations/:year', AuthMiddlewares, EvaluationController.getEvaluationsByYear)
router.get('/api/evaluations/unit/:id_unit/:id_indicator', AuthMiddlewares, EvaluationController.getEvaluationsByIndicator)
router.get('/api/evaluations/unit/:id_unit/year/:year', AuthMiddlewares, EvaluationController.getEvaluationsByUnit)

router.get('/api/evaluations/:id', AuthMiddlewares, EvaluationController.getEvaluationtById)
router.put('/api/evaluations/:id', AuthMiddlewares, EvaluationController.updateEvaluation)
router.delete('/evaluations/:id', AuthMiddlewares, EvaluationController.deleteEvaluation)

//indicators
router.post('/api/indicators',AuthMiddlewares, IndicatorController.createIndicator )
router.get('/api/indicators', AuthMiddlewares, IndicatorController.getIndicators)
router.get('/api/indicators/search', AuthMiddlewares, IndicatorController.filteredIndicators)
router.get('/api/indicators-numerics/:id_unit/:year', AuthMiddlewares, IndicatorController.getIndicatorsNumericsByUnit)
router.get('/api/indicators/:id', AuthMiddlewares, IndicatorController.getIndicatorById)
router.put('/api/indicators/:id', AuthMiddlewares, IndicatorController.updateIndicator)
router.delete('/api/indicators/:id', AuthMiddlewares, IndicatorController.deleteIndicator)

export default router;