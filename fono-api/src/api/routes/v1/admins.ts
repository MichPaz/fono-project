import { Router } from 'express'
import AdminController from '../../controllers/AdminController'
import Auth from '../../middlewares/auth'
import { Validate, Requirements } from '../../middlewares/validator'

const usersRouter: Router = Router()

usersRouter
    .route('/')
    .post(
        Auth.authenticate,
        Validate(Requirements.createAdmins),
        AdminController.create
    )
    .get(
        Auth.authenticate,
        AdminController.get
    )

usersRouter
    .route('/:id')
    .get(
        Auth.authenticate,
        Validate(Requirements.getAdminDetail),
        AdminController.getDetail
    )
    .put(
        Auth.authenticate,
        Validate(Requirements.updateAdmin),
        AdminController.update
    )
    .delete(
        Auth.authenticate,
        Validate(Requirements.deleteAdmin),
        AdminController.delete
    )

export default usersRouter
