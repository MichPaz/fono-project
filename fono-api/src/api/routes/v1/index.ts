import { Router } from 'express'
import mainRouter from './main'
import adminsRouter from './admins'
import errosFonologicosRouter from './errosFonologicos'

const router: Router = Router()
router.use('/', mainRouter)
router.use('/admin', adminsRouter)
router.use('/erroFonologico', errosFonologicosRouter)

export default router
