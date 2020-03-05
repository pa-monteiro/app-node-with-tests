import { Router } from 'express';
import authMiddleware from './app/middlewares/auth';
import UserController from './app/controllers/UserController';
import AuthController from './app/controllers/AuthController';
import BrandController from './app/controllers/BrandController';
import ModelController from './app/controllers/ModelController';
import VehicleController from './app/controllers/VehicleController';

const routes = Router();

// Autenticação para user ADMIN
routes.post('/register', UserController.store);
routes.post('/login', AuthController.store);

// Rotas Publicas
routes.get('/api/brands', BrandController.index);
routes.get('/api/models/:brandId', ModelController.index);
routes.get('/api/vehicles/:modelId', VehicleController.index);

// Rotas ADMIN
routes.use(authMiddleware);
routes.post('/api/brands', BrandController.store);
routes.get('/api/brands/:id', BrandController.show);
routes.put('/api/brands/:id', BrandController.update);
routes.delete('/api/brands/:id', BrandController.destroy);

routes.post('/api/models', ModelController.store);
routes.get('/api/models/:id', ModelController.show);
routes.put('/api/models/:id', ModelController.update);
routes.delete('/api/models/:id', ModelController.destroy);

routes.post('/api/vehicles', VehicleController.store);
routes.get('/api/vehicles/:id', VehicleController.show);
routes.put('/api/vehicles/:id', VehicleController.update);
routes.delete('/api/vehicles/:id', VehicleController.destroy);

export default routes;
