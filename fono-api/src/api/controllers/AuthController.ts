import { NextFunction, Request, Response } from 'express'
import AuthService from '../services/AuthService'
import { LoginType, SignUpType } from '../types/auth'
import JWT from '../../utils/jwt'

class AuthController {
    async login(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const payload: LoginType = req.body
            const token = await AuthService.login(payload)
            res.status(200).send({
                message: 'Logged in successfully',
                data: token
            })
        } catch (error) {
            next(error)
        }
    }

    async tokenVerify(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const user = req.userdata

            // console.log("req.headers", req.headers)
            const authorization = String(req.headers.authorization)
            if (!authorization || !authorization.includes('Bearer')) {
                res.sendStatus(401)
                return
            }
            // const token = authorization?.slice(7)
            // const payload = await JWT.verifyToken(token)
            // if (payload) {
            //     console.log('payload: ', payload)
            //     console.log('payload time: ', new Date(payload.iat as number), new Date(payload.exp as number))
            // }
    

            const body = await AuthService.tokenVerify(user)
            res.status(200).send({
                message: 'Logged in successfully',
                data: body
            })
        } catch (error) {
            next(error)
        }
    }

    async signUp(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const payload: SignUpType = req.body
            const result = await AuthService.signUp(payload)
            const payloadLogin: LoginType = {
                email: payload.user.email,
                password: payload.user.password,
            }
            const token = await AuthService.login(payloadLogin)
            res.status(200).send({
                message: 'Signed up successfully',
                data: result,
                token
            })
        } catch (error) {
            next(error)
        }
    }
}

export default new AuthController()
