import { Model, DataTypes, Optional } from 'sequelize';
import { db } from '../../database/config';
import appConfig from '../../config/appConfig';
// import { UserOutput } from './ErroFonologico';

type TipoDesvio = 'omissao' | 'adicao' | 'troca' | 'indefinido' | 'correspondente' | 'sequenciamento'

export const classificaTipoDesvio = (idealizado: string, realizado: string) => {
    let classificacao: TipoDesvio = "troca";
    // console.log(`${idealizado}.length: `, idealizado.length);
    // console.log(`${realizado}.length: `, realizado.length);]
    if (idealizado === realizado) {
        classificacao = "correspondente";
    } else {
        if (idealizado.length === 0) {
            classificacao = "adicao";
            if (realizado.length === 0) {
                classificacao = "indefinido";
            }
        } else {
            if (realizado.length === 0) {
                classificacao = "omissao";
            }
        }
    }
    return classificacao;
};

export interface Comparacao {
    blocos_realizado: string[]
    blocos_idealizado: string[]
    blocos_correspondencia: boolean[]
}

export interface DesvioAttributes {
    indice: number
    tipo: TipoDesvio
    realizado: string
    idealizado: string
    corresp: boolean
    // erroFonologicoId: number
}

export type DesvioInput = DesvioAttributes

export type DesvioOutput = DesvioAttributes

class Desvio implements DesvioAttributes {
    public indice!: number
    public tipo!: TipoDesvio
    public realizado!: string
    public idealizado!: string
    public corresp!: boolean
    // public erroFonologicoId!: number    
}

export const makeDesvios = async (idealizado: string, realizado: string) => {
    const desvios: Desvio[] = []
    const url = new URL(appConfig.comp.domain + '/comparacao');
    url.searchParams.append('realizado', realizado)
    url.searchParams.append('idealizado', idealizado)
    const options = {
        method: 'GET',
        headers: {
            'content-type': 'application/json; charset=utf-8'
        }
    };

    await fetch(url.toString(), options)
        .then(async (res) => {
            const comp: Comparacao = await res.json()
            // console.log('comp: ', comp)
            for (let i = 0; i < comp.blocos_realizado.length; i++) {
                const realizado = comp.blocos_realizado[i]
                const idealizado = comp.blocos_idealizado[i]
                const tipo = classificaTipoDesvio(idealizado, realizado)
                const desvio: Desvio = {
                    indice: i,
                    realizado,
                    idealizado,
                    corresp: comp.blocos_correspondencia[i],
                    tipo,
                }
                desvios.push(desvio)
            }
        })
        .catch(err => console.error('error:' + err));
    return desvios
}

export default Desvio;
