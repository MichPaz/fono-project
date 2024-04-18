import React from "react";
import {
  Typography,
  Avatar,
  Row,
  Tag,
} from "antd";

import { HiArrowNarrowRight } from "react-icons/hi";
import { IDesvio, tipoDesvioToIcon, tiposEtiquetasDesvios } from '../../../types/desvios';
import { Grid } from "@mui/material";
import Card from "antd/es/card/Card";
import { getQwertyDistance } from "../../../features/keyboardDistance";
import { UIDesvio } from "../../molecules/Desvio";

const { Title, Text } = Typography;

interface UIDesvios { desvios: IDesvio[] }

export const Desvios: React.FC<UIDesvios> = ({
  desvios,
}) => {

  return (
    <Card>
      {desvios.filter(e => !e.corresp).map((desvio: IDesvio, index: number) => {

        return (
          <UIDesvio desvio={desvio} key={index} />
        )
      }
      )}
    </Card>
  );
}
