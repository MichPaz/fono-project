import { Router } from 'express';
import AuthController from '../../controllers/AuthController';
import { Validate, Requirements } from '../../middlewares/validator';
import Auth from '../../middlewares/auth'

const mainRouter: Router = Router();

mainRouter
    .route('/signIn')
    .post(Validate(Requirements.login), AuthController.login);
mainRouter
    .route('/tokenVerify')
    .get(Auth.authenticate, AuthController.tokenVerify);
mainRouter
    .route('/signup')
    .post(Validate(Requirements.signup), AuthController.signUp);

export default mainRouter;
