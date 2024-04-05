import { NextFunction, Request, Response } from 'express'
import { AdminInput, AdminInputUpdate } from '../models/Admin'
import AdminService from '../services/AdminService'

class UserController {
    async create(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const payload: AdminInput = req.body
            const admin = await AdminService.create(payload)
            res.status(200).send({
                message: 'User created successfully',
                data: admin
            })
        } catch (error) {
            next(error)
        }
    }

    async get(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const user = await AdminService.get()
            res.status(200).send({
                message: 'Users fetched successfully',
                data: user
            })
        } catch (error) {
            next(error)
        }
    }

    async getDetail(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const userId = Number(req.params.id)
            const user = await AdminService.getDetail(userId)
            res.status(200).send({
                message: 'User details fetched successfully',
                data: user
            })
        } catch (error) {
            next(error)
        }
    }

    async update(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const userId = Number(req.params.id)
            const payload: AdminInputUpdate = req.body
            await AdminService.update(userId, payload)
            res.status(200).send({
                message: 'User updated successfully'
            })
        } catch (error) {
            next(error)
        }
    }

    async delete(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const userId = Number(req.params.id)
            await AdminService.delete(userId)
            res.status(200).send({
                message: 'User deleted successfully'
            })
        } catch (error) {
            next(error)
        }
    }
}

export default new UserController()
