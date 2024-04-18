import React, { useEffect, useState } from "react";
import {
  List,
  Typography,
  Avatar,
  Col,
  Row,
  Button,
} from "antd";

import { useAuth } from "../../store/session";
import { getErrosFonologicos } from "../../services/ErroFonologico";
import { IErroFonologico, tipoAcaoToIcon, tipoInteracaoToLabel } from "../../types/erroFonologico";
import { UIErroFonologico } from "../organisms/ErroFonologico";

const { Title } = Typography;

function ErrosFonologicos() {
  const { logout, session } = useAuth()
  const [errosFonologicos, setErrosFonologicos] = useState<IErroFonologico[]>([]);
  const [erroFonologico, setErroFonologico] = useState<IErroFonologico | undefined>();
  // const [mostarCorrespondentes, setMostarCorrespondentes] = useState<boolean>(false);




  useEffect(() => {
    const fetchData = async () => {
      const resp = await getErrosFonologicos()
      if (!!resp) {
        console.log(resp);
        setErrosFonologicos(resp as IErroFonologico[]);
        setErroFonologico(resp.at(0))
      }
    };

    fetchData();
  }, [setErrosFonologicos]);

  return (
    <div style={{ margin: '24px' }}>
      <Row>
        <Col span={24}>
          <Title level={4}>Registros de ocorrências de desvios de {session?.admin?.name}</Title>
          <Button onClick={logout}>sair</Button>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Row>
            <Title level={2}>Ocorrências</Title>
          </Row>
          <Row>
            <List
              style={{
                width: "90%",
                maxHeight: "70vh",
                overflow: "overlay",
              }}
              itemLayout={"horizontal"}
              dataSource={errosFonologicos}
              renderItem={(item: IErroFonologico, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        size={"large"}
                        icon={tipoAcaoToIcon[item.tipo_acao]}
                      />
                    }
                    title={
                      <Button onClick={() => setErroFonologico(item)}>
                        {item.realizado}
                      </Button>
                    }
                    description={item.idealizado}
                  />
                </List.Item>
              )}
            />
          </Row>
        </Col>
        <Col span={12}>
          <Row>
            <Title level={2}>Erro Fonológico selecionado</Title>
          </Row>
          <Row>
            {erroFonologico && <UIErroFonologico
              erroFonologico={erroFonologico}
            />
            }
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default ErrosFonologicos;
