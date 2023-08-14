import { JWTAdapter } from '../../outbound/services/jwt.js';
import { TokenOutboundPort } from '../../../domain/shared/token.outbound.port.js';
import { UserController } from '../controllers/user.controller.js';
import { UserOutboundPort } from '../../../domain/modules/user/user.outbound.port.js';
import { UserRepositoryAdapter } from '../../outbound/infrastructure/repositories/user.repository.adapter.js';
import { UserUsecase } from '../../../domain/modules/user/user.usecase.js';

const jwtAdapter = new JWTAdapter();
const tokenOutboundPort = new TokenOutboundPort(jwtAdapter);

const userRepositoryAdapter = new UserRepositoryAdapter();
const userOutboundPort = new UserOutboundPort(userRepositoryAdapter);

const userUseCase = new UserUsecase(userOutboundPort, tokenOutboundPort);
const userController = new UserController(userUseCase);

export const userRoutes = {
  POST: {
    '/signup': userController.createUser.bind(userController),
    '/signin': userController.connectUser.bind(userController),
  },
};
