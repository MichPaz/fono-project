import Admin, { AdminInput, AdminInputUpdate, AdminOutput } from '../models/Admin'
import { PersonRepository } from './PersonRepository'

interface IAdminRepository {
    create(payload: AdminInput): Promise<AdminOutput>
    get(): Promise<AdminOutput[]>
    getDetail(adminId: number): Promise<AdminOutput | null>
    update(adminId: number, payload: AdminInputUpdate): Promise<boolean>
    delete(adminId: number): Promise<boolean>
}

class AdminRepository extends PersonRepository<InstanceType<typeof Admin>> implements IAdminRepository {

    constructor() {
        super(Admin)
    }

    create(payload: AdminInput): Promise<AdminOutput> {
        return Admin.create(payload)
    }

    get(): Promise<AdminOutput[]> {
        return Admin.findAll({
            attributes: ['id', 'cpf']
        })
    }

    getDetail(adminId: number): Promise<AdminOutput | null> {
        return Admin.findByPk(adminId, {
            attributes: ['id', 'cpf'],
            include: [
                // {
                //     model: Role,
                //     as: 'role',
                //     required: false
                // }
            ]
        })
    }

    async update(
        adminId: number,
        payload: AdminInputUpdate
    ): Promise<boolean> {
        const [updatedAdminCount] = await Admin.update(payload, {
            where: {
                id: adminId
            }
        })
        return !!updatedAdminCount
    }

    async delete(adminId: number): Promise<boolean> {
        const deletedAdminCount = await Admin.destroy({
            where: {
                id: adminId
            }
        })
        return !!deletedAdminCount
    }
}

export default new AdminRepository()
