import React from "react";

import { IDesvio } from '../../../types/desvios';
import Card from "antd/es/card/Card";
import { UIDesvio } from "../../molecules/Desvio";

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
