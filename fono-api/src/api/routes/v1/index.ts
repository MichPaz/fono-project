import { Router } from 'express'
import mainRouter from './main'
import adminsRouter from './admins'

const router: Router = Router()
router.use('/', mainRouter)
router.use('/admin', adminsRouter)

export default router
