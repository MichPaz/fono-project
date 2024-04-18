import React from "react";
import {
    Typography,
    Tag,
} from "antd";

import { IDesvio, tipoAcaoToLabel } from '../../../types/desvios';
import { IErroFonologico, tipoInteracaoToLabel } from "../../../types/erroFonologico";
import { Grid } from "@mui/material";
import { Desvios } from "../Desvios";

const { Title, Text } = Typography;

interface IAErroFonologico { erroFonologico: IErroFonologico }

const textoOuPalavra = (txt: string) => {
    return txt.indexOf(" ") === -1 ? "Palavra" : "Texto";
};


export const UIErroFonologico: React.FC<IAErroFonologico> = ({
    erroFonologico,
}) => {

    const title = `${tipoInteracaoToLabel[erroFonologico.tipo_interacao]} - ${tipoAcaoToLabel[erroFonologico?.tipo_acao]}`
    const { realizado, idealizado, desvios } = erroFonologico
    const realizadoTitle = `${textoOuPalavra(realizado)} Destorcid${textoOuPalavra(realizado).slice(-1)}`
    const idealizadoTitle = `${textoOuPalavra(realizado)} Idealizad${textoOuPalavra(realizado).slice(-1)}`

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>

                <Text>
                    {title}
                </Text>
            </Grid>

            <Grid item xs={12}>
                <Title level={5} style={{ marginBottom: 0 }}>
                    {realizadoTitle}
                </Title>
                <Tag color="red" style={{ fontSize: 'x-large', padding: '14px' }}>
                    {realizado}
                </Tag>
            </Grid>

            <Grid item xs={12}>
                <Title level={5} style={{ marginBottom: 0 }}>
                    {idealizadoTitle}
                </Title>
                <Tag color="green" style={{ fontSize: 'x-large', padding: '14px' }}>
                    {idealizado}
                </Tag>
            </Grid>

            <Grid item xs={12}>
                <Title style={{ marginTop: "12px", marginBottom: 0 }} level={5}>
                    Comparação
                </Title>
            </Grid>
            <Grid item xs={12}>
                {desvios.map(
                    (desvio: IDesvio, index: number) => (
                        <Tag
                            key={index.toString()}
                            color={
                                desvio.corresp
                                    ? "green"
                                    : "yellow"
                            }
                            style={{ fontSize: 'large', padding: '12px' }}
                        >
                            {desvio.realizado}
                        </Tag>
                    )
                )}
            </Grid>
            <Grid item xs={12}>
                {desvios.map(
                    (desvio: IDesvio, index: number) => (
                        <Tag
                            key={index.toString()}
                            color={
                                desvio.corresp
                                    ? "green"
                                    : "yellow"
                            }
                            style={{ fontSize: 'large', padding: '12px' }}
                        >
                            {desvio.idealizado}
                        </Tag>
                    )
                )}
            </Grid>

            <Grid item xs={12}>
                <Title level={5}
                    style={{ marginBottom: 0 }}
                >
                    Desvios cognitivos
                </Title>
                <Desvios desvios={desvios} />
            </Grid>
        </Grid>
    );
}
