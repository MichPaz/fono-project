import { Model, DataTypes, Optional } from 'sequelize';
import { db } from '../../database/config';
// import { UserOutput } from './ErroFonologico';

type TipoDesvio = 'omissao' | 'adicao' | 'troca'

export interface DesvioAttributes {
    indice: number
    tipo: TipoDesvio
    errado: string
    idealizado: string
    corresp:  boolean
    // erroFonologicoId: number
}

export type DesvioInput = DesvioAttributes

export type DesvioOutput = DesvioAttributes

class Desvio implements DesvioAttributes {
    public indice!: number
    public tipo!: TipoDesvio
    public errado!: string
    public idealizado!: string
    public corresp!:  boolean
    // public erroFonologicoId!: number    
}

export default Desvio;
