import { IErroFonologico } from "../../types/erroFonologico"
import { fonoAPI } from "../fonoAPI"

interface ResponseErroFonologico {
    message: string
    data: IErroFonologico[]
}

export const getErrosFonologicos: () => Promise<IErroFonologico[] | undefined> = async () => {
    let response: IErroFonologico[] | undefined = undefined
    console.log('fonoAPI aquii', fonoAPI.defaults.headers)
    await fonoAPI.get('/erroFonologico')
        .then((res) => {
            const body: ResponseErroFonologico = res.data
            response = body.data
        })
    // .catch(() => undefined)
    return response
}