import React, { useState } from "react";
import {
    Typography,
    Tag,
    Button,
    Space,
} from "antd";

import { IDesvio, tipoAcaoToLabel } from '../../../types/desvios';
import { IErroFonologico, tipoInteracaoToLabel } from "../../../types/erroFonologico";
import { Grid } from "@mui/material";
import { Desvios } from "../Desvios";
import { UpdateErroModal } from "./update";
import { DeleteErroModal } from "./delete";

const { Title, Text } = Typography;

interface IAErroFonologico { erroFonologico: IErroFonologico }

const textoOuPalavra = (txt: string) => {
    return txt.indexOf(" ") === -1 ? "Palavra" : "Texto";
};


export const UIErroFonologico: React.FC<IAErroFonologico> = ({
    erroFonologico,
}) => {

    const [openUpdate, setOpenUpdate] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)

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

                <Space>

                    <Button type="primary" onClick={() => setOpenUpdate(true)}>
                        Editar
                    </Button>

                    <Button type="primary" onClick={() => setOpenDelete(true)}>
                        Apagar
                    </Button>

                </Space>

                <UpdateErroModal
                    erroFonologico={erroFonologico}
                    open={openUpdate}
                    setOpen={setOpenUpdate}
                />

                <DeleteErroModal
                    erroFonologico={erroFonologico}
                    open={openDelete}
                    setOpen={setOpenDelete}
                />

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
