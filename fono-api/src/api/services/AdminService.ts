import * as bcrypt from 'bcrypt'
import AdminRepository from '../repositories/AdminRepository'
import { AdminInput, AdminInputUpdate, AdminOutput } from '../models/Admin'
import UserRepository from '../repositories/UserRepository'
import { RESPONSE_MESSSAGES } from '../../constants/messages'

interface IAdminService {
    create(payload: AdminInput): Promise<AdminOutput>
    get(): Promise<AdminOutput[]>
    getDetail(adminId: number): Promise<AdminOutput>
    update(adminId: number, data: AdminInputUpdate): Promise<boolean>
    delete(adminId: number): Promise<boolean>
}

class AdminService implements IAdminService {
    async create(payload: AdminInput): Promise<AdminOutput> {

        const user = await UserRepository.getByEmail(payload.user.email)

        if (user) {
            throw new Error(RESPONSE_MESSSAGES.UNIQUE('email'))
        }

        let admin = await AdminRepository.getByCPF(payload.cpf)

        if (admin) {
            throw new Error(RESPONSE_MESSSAGES.UNIQUE('cpf'))
        }

        admin = await AdminRepository.getByPhoneNumber(payload.phoneNumber)

        if (admin) {
            throw new Error(RESPONSE_MESSSAGES.UNIQUE('phoneNumber'))
        }


        const hashedPassword = bcrypt.hashSync(payload.user.password, 5)
        payload.user.password = hashedPassword

        const userPayload = payload.user
        const userOutput = await UserRepository.create({
            ...userPayload
        })

        return AdminRepository.create({
            ...payload,
            userId: userOutput.id
        })
    }

    get(): Promise<AdminOutput[]> {
        return AdminRepository.get()
    }

    async getDetail(adminId: number): Promise<AdminOutput> {
        const admin = await AdminRepository.getDetail(adminId)

        if (!admin) {
            throw new Error(RESPONSE_MESSSAGES.NOT_FOUNT('Admin'))
        }

        return admin
    }

    async update(
        adminId: number,
        payload: AdminInputUpdate
    ): Promise<boolean> {
        const admin = await AdminRepository.getDetail(adminId)

        if (!admin) {
            throw new Error(RESPONSE_MESSSAGES.NOT_FOUNT('Admin'))
        }

        return AdminRepository.update(adminId, payload)
    }

    async delete(adminId: number): Promise<boolean> {
        const admin = await AdminRepository.getDetail(adminId)

        if (!admin) {
            throw new Error(RESPONSE_MESSSAGES.NOT_FOUNT('Admin'))
        }

        return AdminRepository.delete(adminId)
    }
}

export default new AdminService()
