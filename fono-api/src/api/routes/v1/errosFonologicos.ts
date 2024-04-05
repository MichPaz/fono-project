import { Router } from 'express'
import ErroFonologicoController from '../../controllers/ErroFonologicoController'
import Auth from '../../middlewares/auth'
import { Validate, Requirements } from '../../middlewares/validator'

const usersRouter: Router = Router()

usersRouter
    .route('/')
    .post(
        Auth.authenticate,
        Validate(Requirements.createErroFonologico),
        ErroFonologicoController.create
    )
    .get(
        Auth.authenticate,
        ErroFonologicoController.get
    )

usersRouter
    .route('/:id')
    .get(
        Auth.authenticate,
        Validate(Requirements.getErroFonologicoDetail),
        ErroFonologicoController.getDetail
    )
    .put(
        Auth.authenticate,
        Validate(Requirements.updateErroFonologico),
        ErroFonologicoController.update
    )
    .delete(
        Auth.authenticate,
        Validate(Requirements.deleteErroFonologico),
        ErroFonologicoController.delete
    )

export default usersRouter
