import React from "react";
import {
  Typography,
  Avatar,
  Tag,
} from "antd";

import { HiArrowNarrowRight } from "react-icons/hi";
import { IDesvio, tipoDesvioToIcon, tiposEtiquetasDesvios } from '../../../types/desvios';
import { Grid } from "@mui/material";
import { getQwertyDistance } from "../../../features/keyboardDistance";

const { Title, Text } = Typography;

interface UIDesvio { desvio: IDesvio }

export const UIDesvio: React.FC<UIDesvio> = ({
  desvio,
}) => {

  let qwertyDistance: number | undefined = undefined

  const { realizado, idealizado } = desvio

  if (realizado.length === idealizado.length && idealizado.length === 1) {
    qwertyDistance = getQwertyDistance(realizado, idealizado)
  }


  return (
    <Grid container spacing={0} style={{ padding: "12px" }}>
      <Grid item xs={6}>

        <Grid container>

          <Grid item xs={12}>
            <Grid container justifyContent='center' direction={'row'}>
              <Avatar
                size={"default"}
                style={{ backgroundColor: "#87d068" }}
                icon={tipoDesvioToIcon[desvio.tipo]}
              />
              <Title
                style={{ marginTop: "4px", paddingLeft: "8px" }}
                level={5}
              >
                {tiposEtiquetasDesvios[desvio.tipo]}
              </Title>
            </Grid>
          </Grid>

          <Grid container justifyContent='center' direction='row'>
            <Tag style={{ marginRight: "0px" }} color="green">
              {desvio.idealizado}
            </Tag>
            <HiArrowNarrowRight />
            <Tag style={{ marginRight: "0px" }} color="red">
              {desvio.realizado}
            </Tag>
          </Grid>
        </Grid>

      </Grid>

      {!!qwertyDistance && <Grid item xs={6}>
        <Grid container>
          <Text
          // style={{ marginTop: "4px", paddingLeft: "8px" }}
          >
            Distância de {qwertyDistance} no teclado qwerty
          </Text>
        </Grid>
      </Grid>
      }
    </Grid>
  )
}
