import { Model, DataTypes, Optional } from 'sequelize'
import { db } from '../../database/config'
import { PersonAttributes } from './Person'
import { UserOutput } from './User'

interface AdminAttributes extends PersonAttributes {
    id: number
    userId: number
    user?: UserOutput

    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
}

export type AdminInput = Required<Pick<AdminAttributes, 'user'>> & Optional<AdminAttributes, 'id'>
export type AdminInputUpdate = Optional<
    AdminAttributes,
    'id'
>
export type AdminOutput = AdminAttributes

class Admin extends Model<AdminAttributes, AdminInput> implements AdminAttributes {
    public id!: number
    public cpf!: string
    public username!: string
    public isValidEmail: boolean = false
    public email!: string
    public password!: string

    public name!: string
    public surname!: string
    public phoneNumber!: string
    public avatarPath?: string

    public userId!: number
    public user!: UserOutput

    public readonly createdAt!: Date
    public readonly updatedAt!: Date
    public readonly deletedAt!: Date
}

Admin.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cpf: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        name: {
            type: DataTypes.STRING
        },
        userId: {
            type: DataTypes.INTEGER
        },
        surname: {
            type: DataTypes.STRING
        },
        phoneNumber: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: true
        },
        avatarPath: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        tableName: 'admins',
        freezeTableName: true,
        timestamps: true,
        paranoid: true,
        sequelize: db
    }
)

// Admin.belongsTo(Person, {
//     foreignKey: 'personId',
//     as: 'person'
// })

export default Admin
