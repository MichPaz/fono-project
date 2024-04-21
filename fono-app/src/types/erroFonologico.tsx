import React from "react";
import { GiSing } from "react-icons/gi";
import { FaBookReader } from "react-icons/fa";
import { TfiWrite } from "react-icons/tfi";
import { PiEar } from "react-icons/pi";
import { IDesvio } from "./desvios";
import { UserOutput } from "./session";

export type TipoAcao = 'escrevi' | 'cantei' | 'li' | 'compreendi' | 'escutei'
export type TipoIteracao = 'entrada' | 'saida'

export type TipoAcaoToIcon = { [key in TipoAcao]: any }

export const tipoAcaoToIcon: TipoAcaoToIcon = {
    escrevi: <TfiWrite />,
    cantei: <GiSing />,
    li: <FaBookReader />,
    compreendi: <PiEar />,
    escutei: <PiEar />,
};

export type TipoInteracaoToLabel = { [key in TipoIteracao]: string }

export const tipoInteracaoToLabel: TipoInteracaoToLabel = {
    saida: "Saída",
    entrada: "Entrada",
};

export interface IErroFonologico {
    id: number
    tipo_interacao: TipoIteracao
    tipo_acao: TipoAcao
    realizado: string
    idealizado: string
    desvios: IDesvio[]
    userId?: number
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date

    user?: UserOutput
}

export interface IErroFonologicoInput {
    tipo_interacao: TipoIteracao
    tipo_acao: TipoAcao
    realizado: string
    idealizado: string
}

export interface IErroFonologicoUpdateInput {
    id: number
    tipo_interacao: TipoIteracao
    tipo_acao: TipoAcao
    realizado: string
    idealizado: string
}