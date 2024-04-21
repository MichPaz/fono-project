import { IErroFonologico, IErroFonologicoInput, IErroFonologicoUpdateInput } from "../../types/erroFonologico"
import Alert from '../../services/alert'
import { fonoAPI } from "../fonoAPI"

interface ResponseErroFonologico {
    message: string
    data: IErroFonologico[]
}

export const getErrosFonologicos: () => Promise<IErroFonologico[] | undefined> = async () => {
    let response: IErroFonologico[] | undefined = undefined
    // console.log('fonoAPI aquii', fonoAPI.defaults.headers)
    await fonoAPI.get('/erroFonologico')
        .then((res: { data: ResponseErroFonologico }) => {
            const body: ResponseErroFonologico = res.data
            response = body.data
        })
    // .catch(() => undefined)
    return response
}

export const createErroFonologico: (values: IErroFonologicoInput) => Promise<IErroFonologico | undefined> = async (values) => {
    let response: IErroFonologico[] | undefined = undefined
    // console.log('fonoAPI aquii', fonoAPI.defaults.headers)
    await fonoAPI.post('/erroFonologico', {
        ...values
    })
        .then((res: { data: ResponseErroFonologico }) => {
            const body: ResponseErroFonologico = res.data
            response = body.data
            Alert.push({
                variant: 'success',
                message: `Registro criado com sucesso`,
                title: 'Sucesso',
                archororigin: {
                    vertical: 'top',
                    horizontal: 'left'
                }
            })
        })
    // .catch(() => undefined)
    return response
}

export const updateErroFonologico: (values: IErroFonologicoUpdateInput) => Promise<IErroFonologico | undefined> = async (values) => {
    let response: IErroFonologico[] | undefined = undefined
    // console.log('fonoAPI aquii', fonoAPI.defaults.headers)
    await fonoAPI.put(`/erroFonologico/${values.id}`, {
        ...values
    })
        .then((res: { data: ResponseErroFonologico }) => {
            const body: ResponseErroFonologico = res.data
            response = body.data
            Alert.push({
                variant: 'success',
                message: `Registro atualizado com sucesso`,
                title: 'Sucesso',
                archororigin: {
                    vertical: 'top',
                    horizontal: 'left'
                }
            })
        })
    // .catch(() => undefined)
    return response
}


export const deleteErroFonologico: (id: number) => Promise<IErroFonologico | undefined> = async (id) => {
    let response: IErroFonologico[] | undefined = undefined
    // console.log('fonoAPI aquii', fonoAPI.defaults.headers)
    await fonoAPI.delete(`/erroFonologico/${id}`, {
        data: 'void'
    })
        .then((res: { data: ResponseErroFonologico }) => {
            const body: ResponseErroFonologico = res.data
            response = body.data
            Alert.push({
                variant: 'success',
                message: `Registro deletado com sucesso`,
                title: 'Sucesso',
                archororigin: {
                    vertical: 'top',
                    horizontal: 'left'
                }
            })
        })
    // .catch(() => undefined)
    return response
}