import * as bcrypt from 'bcrypt'
import UserRepository from '../repositories/UserRepository'
import { UserInput, UserOutput } from '../models/User'
import JWT from '../../utils/jwt'
import { LoginType, SignUpType } from '../types/auth'
import { AdminOutput } from '../models/Admin'
import AdminRepository from '../repositories/AdminRepository'

interface LoginOutput {
    user: UserOutput
    token: string
    admin?: AdminOutput
}

interface SignUpOutput {
    user: UserOutput
}

interface IAuthService {
    login(payload: LoginType): Promise<LoginOutput>
    signUp(payload: SignUpType): Promise<SignUpOutput>
}

class AuthService implements IAuthService {
    async login(payload: LoginType): Promise<LoginOutput> {
        const user = await UserRepository.getByEmail(payload.email)

        if (!user) {
            throw new Error('User not found')
        }

        const isValid = bcrypt.compareSync(payload.password, user.password)

        if (!isValid) {
            throw new Error('Email and Password is not match')
        }

        const token = await JWT.signToken(user.id)

        if (!token) {
            throw new Error('Invalid token')
        }

        console.log('token aaaaaaaaa2: ', token)
        const aaa = await JWT.verifyToken(token)
        console.log('token decoded: ', aaa)
        console.log('token decoded: ', new Date(aaa?.iat as number), new Date(aaa?.exp as number))

        const response: LoginOutput = {
            user,
            token
        }

        const admin = await AdminRepository.getByUserId(user.id)
        if(admin) response.admin = admin

        return response
    }

    async tokenVerify(user: UserOutput): Promise<Omit<LoginOutput, 'token'>> {


        const response: Omit<LoginOutput, 'token'> = {
            user
        }

        const userOfSession = await UserRepository.getDetail(user.id)
        if(userOfSession) response.user = userOfSession

        return response
    }

    async signUp(payload: SignUpType): Promise<SignUpOutput> {
        const userPayload = payload.user
        const user = await UserRepository.getByEmail(userPayload.email)

        if (user) {
            throw new Error('email must be unique')
        }


        const hashedPassword = bcrypt.hashSync(userPayload.password, 5)

        const userOutput = await UserRepository.create({
            ...userPayload,
            password: hashedPassword
        })


        let output: SignUpOutput = {
            user: userOutput,
        }

        return output
    }
}

export default new AuthService()
