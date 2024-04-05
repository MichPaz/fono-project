import { Model, DataTypes, Optional } from 'sequelize';
import { db } from '../../database/config';
import ErroFonologico from './ErroFonologico';

interface UserAttributes {
    id: number
    username?: string
    email: string
    isValidEmail: boolean
    password: string
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
}

export type UserInput = Optional<UserAttributes, 'id' | 'isValidEmail'>
export type UserInputUpdate = Optional<
    UserAttributes,
    'id' | 'isValidEmail' | 'password'
>;
export type UserOutput = Optional<UserAttributes, 'username' >

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
    public id!: number
    public username!: string
    public isValidEmail!: boolean
    public email!: string
    public password!: string

    public readonly createdAt!: Date
    public readonly updatedAt!: Date
    public readonly deletedAt!: Date
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING
        },
        isValidEmail: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        modelName: 'user',
        tableName: 'users',
        freezeTableName: true,
        timestamps: true,
        paranoid: true,
        sequelize: db
    }
);

// User.hasMany(ErroFonologico, {
//     foreignKey: 'userId',
//     as: 'errosFonologicos'
// });

export default User;
