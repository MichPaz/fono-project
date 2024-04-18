import { Request } from 'express';
import { Model, DataTypes, Optional } from 'sequelize';
import { db } from '../../database/config';
import { UserOutput } from './User';
import Desvios /*, { classificaTipoDesvio, Comparacao, makeDesvios } */ from './Desvios';
// import appConfig from '../../config/appConfig';
// import Desvio from './Desvios';
// import fetch from 'node-fetch';
// import {Agent} from 'http'

// const fetch = () => import('node-fetch').then(({default: fetch}) => fetch(...args));

type TipoIteracao = 'entrada' | 'saida'
type TipoAcao = 'escrevi' | 'cantei' | 'li' | 'compreendi' | 'escutei'

interface ErroFonologicoAttributes {
    id: number
    tipo_interacao: TipoIteracao
    tipo_acao: TipoAcao
    realizado: string
    idealizado: string
    desvios: Desvios[]
    userId?: number
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date

    user?: UserOutput
}

export type ErroFonologicoInput = Optional<ErroFonologicoAttributes, 'id'>
export type ErroFonologicoInputUpdate = Optional<
    ErroFonologicoAttributes,
    'id'
>;
export type ErroFonologicoOutput = ErroFonologicoAttributes

class ErroFonologico extends Model<ErroFonologicoAttributes, ErroFonologicoInput> implements ErroFonologicoAttributes {
    public id!: number
    public tipo_interacao!: TipoIteracao
    public tipo_acao!: TipoAcao
    public realizado!: string
    public idealizado!: string
    public desvios: Desvios[] = []
    public userId!: number

    public readonly createdAt!: Date
    public readonly updatedAt!: Date
    public readonly deletedAt!: Date
}

ErroFonologico.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tipo_interacao: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tipo_acao: {
            type: DataTypes.STRING,
            allowNull: false
        },
        realizado: {
            type: DataTypes.STRING,
            allowNull: false
        },
        idealizado: {
            type: DataTypes.STRING,
            allowNull: false
        },
        desvios: {
            type: DataTypes.VIRTUAL,
            allowNull: false,
            // get: () => {
            //     const desvios = makeDesvios(this.idealizado, this.realizado)
            //     return desvios
            // },
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        modelName: 'erro_fonologico',
        tableName: 'erros_fonologicos',
        freezeTableName: true,
        timestamps: true,
        paranoid: true,
        sequelize: db
    }
);

// ErroFonologico.belongsTo(User, {
//     foreignKey: 'userId',
//     as: 'user'
// });

export default ErroFonologico;
