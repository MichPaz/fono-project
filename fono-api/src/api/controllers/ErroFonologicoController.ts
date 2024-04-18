import { NextFunction, Request, Response } from 'express'
import ErroFonologico, { ErroFonologicoInput, ErroFonologicoInputUpdate } from '../models/ErroFonologico'
import ErroFonologicoService from '../services/ErroFonologicoService'
import { makeDesvios } from '../models/Desvios'

class UserController {
    async create(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const payload: ErroFonologicoInput = { ...req.body, userId: req.userdata.id }
            const erroFonologico = await ErroFonologicoService.create(payload)
            // console.log('payload: ', payload)
            // console.log('erroFonologico: ', erroFonologico)
            // await erroFonologico.criarDesvios()
            res.status(200).send({
                message: 'Erro Fonológico created successfully',
                data: erroFonologico
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
            const errosFonologicos = await ErroFonologicoService.get()
            for (const erroFonologico of errosFonologicos) {
                erroFonologico.desvios = await makeDesvios(erroFonologico.idealizado, erroFonologico.realizado)
            }
            res.status(200).send({
                message: 'Erro Fonológico fetched successfully',
                data: errosFonologicos
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
            const id = Number(req.params.id)
            const erroFonologico = await ErroFonologicoService.getDetail(id)
            res.status(200).send({
                message: 'Erro Fonológico details fetched successfully',
                data: erroFonologico
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
            const id = Number(req.params.id)
            const payload: ErroFonologicoInputUpdate = req.body
            await ErroFonologicoService.update(id, payload)
            res.status(200).send({
                message: 'Erro Fonológico updated successfully'
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
            const id = Number(req.params.id)
            await ErroFonologicoService.delete(id)
            res.status(200).send({
                message: 'Erro Fonológico deleted successfully'
            })
        } catch (error) {
            next(error)
        }
    }
}

export default new UserController()
