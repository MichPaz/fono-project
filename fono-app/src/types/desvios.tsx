
import React from "react";
import { BsPatchMinus, BsPatchPlus } from "react-icons/bs";
import { TiFlowSwitch } from "react-icons/ti";
import { PiSwap } from "react-icons/pi";
import { BsPatchQuestion } from "react-icons/bs";
import { LuCircleEqual } from "react-icons/lu";

export type TipoDesvio = 'omissao' | 'adicao' | 'troca' | 'sequenciamento' | 'indefinido' | 'correspondente'

export type TipoDesvioEtiqueta = { [key in TipoDesvio]: string }

export const tiposEtiquetasDesvios: TipoDesvioEtiqueta = {
    troca: "Troca de letra",
    omissao: "Omissão de letra",
    adicao: "Adição de letra",
    sequenciamento: "Sequenciamento fonêmico",
    indefinido: "Indefinido",
    correspondente: "Correspondente"
}


export type TipoDesvioToIcon = { [key in TipoDesvio]: any }

export const tipoDesvioToIcon: TipoDesvioToIcon = {
    troca: <PiSwap />,
    omissao: <BsPatchMinus />,
    adicao: <BsPatchPlus />,
    indefinido: <BsPatchQuestion />,
    correspondente: <LuCircleEqual />,
    sequenciamento: <TiFlowSwitch />
};

export const tipoAcaoToLabel = {
    escrevi: "escrita",
    cantei: "canto",
    li: "leitura",
    compreendi: "compreensão",
    escutei: "escuta",
};

export interface IDesvio {
    indice: number
    tipo: TipoDesvio
    realizado: string
    idealizado: string
    corresp: boolean
    // erroFonologicoId: number
}