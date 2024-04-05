import * as bcrypt from 'bcrypt'
import UserRepository from '../repositories/UserRepository'
import { UserInput, UserInputUpdate, UserOutput } from '../models/User'
import { RESPONSE_MESSSAGES } from '../../constants/messages'

interface IUserService {
    create(payload: UserInput): Promise<UserOutput>
    get(): Promise<UserOutput[]>
    getDetail(userId: number): Promise<UserOutput>
    update(userId: number, data: UserInputUpdate): Promise<boolean>
    delete(userId: number): Promise<boolean>
}

class UserService implements IUserService {
    async create(payload: UserInput): Promise<UserOutput> {
        const user = await UserRepository.getByEmail(payload.email)

        if (user) {
            throw new Error(RESPONSE_MESSSAGES.UNIQUE('email'))
        }

        const hashedPassword = bcrypt.hashSync(payload.password, 5)

        return UserRepository.create({
            ...payload,
            password: hashedPassword
        })
    }

    get(): Promise<UserOutput[]> {
        return UserRepository.get()
    }

    async getDetail(userId: number): Promise<UserOutput> {
        const user = await UserRepository.getDetail(userId)

        if (!user) {
            throw new Error(RESPONSE_MESSSAGES.NOT_FOUNT('User'))
        }

        return user
    }

    async update(
        userId: number,
        payload: UserInputUpdate
    ): Promise<boolean> {
        const user = await UserRepository.getDetail(userId)

        if (!user) {
            throw new Error(RESPONSE_MESSSAGES.NOT_FOUNT('User'))
        }

        return UserRepository.update(userId, payload)
    }

    async delete(userId: number): Promise<boolean> {
        const user = await UserRepository.getDetail(userId)

        if (!user) {
            throw new Error(RESPONSE_MESSSAGES.NOT_FOUNT('User'))
        }

        return UserRepository.delete(userId)
    }
}

export default new UserService()
