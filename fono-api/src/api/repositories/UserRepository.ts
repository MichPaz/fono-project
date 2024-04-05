import User, { UserInput, UserInputUpdate, UserOutput } from '../models/User'

interface IUserRepository {
    create(payload: UserInput): Promise<UserOutput>
    get(): Promise<UserOutput[]>
    getDetail(userId: number): Promise<UserOutput | null>
    getByEmail(email: string): Promise<UserOutput | null>
    update(userId: number, payload: UserInputUpdate): Promise<boolean>
    delete(userId: number): Promise<boolean>
}

class UserRepository implements IUserRepository {
    create(payload: UserInput): Promise<UserOutput> {
        return User.create({...payload})
    }

    get(): Promise<UserOutput[]> {
        return User.findAll({
            attributes: ['id', 'email', 'username', 'isValidEmail']
        })
    }

    getDetail(userId: number): Promise<UserOutput | null> {
        return User.findByPk(userId, {
            attributes: ['id', 'email', 'username', 'isValidEmail'],
            include: [
                // {
                //     model: Role,
                //     as: 'role',
                //     required: false
                // }
            ]
        })
    }

    getByEmail(email: string): Promise<UserOutput | null> {
        return User.findOne({
            where: {
                email: email
            }
        })
    }

    async update(
        userId: number,
        payload: UserInputUpdate
    ): Promise<boolean> {
        const [updatedUserCount] = await User.update(payload, {
            where: {
                id: userId
            }
        })
        return !!updatedUserCount
    }

    async delete(userId: number): Promise<boolean> {
        const deletedUserCount = await User.destroy({
            where: {
                id: userId
            }
        })
        return !!deletedUserCount
    }
}

export default new UserRepository()
