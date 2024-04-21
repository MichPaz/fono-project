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
// import { getErrosFonologicos } from "../../services/ErroFonologico";
import { IErroFonologico, tipoAcaoToIcon } from "../../types/erroFonologico";
import { UIErroFonologico } from "../organisms/ErroFonologico";
import { CreateErroModal } from "../organisms/ErroFonologico/create";
import { useErroFonologico } from "../../store/ErroFonologico";

const { Title } = Typography;

function ErrosFonologicos() {
  const { logout, session } = useAuth()
  const { errosFonologicos, refreshListOfErroFonologico } = useErroFonologico()
  const [erroFonologico, setErroFonologico] = useState<IErroFonologico | undefined>();
  const [openCreateErro, setOpenCreateErro] = useState(false);
  const [init, setInit] = useState(true);
  // const [mostarCorrespondentes, setMostarCorrespondentes] = useState<boolean>(false);


  const showModalCreateErro = () => {
    setOpenCreateErro(true)
  }

  useEffect(() => {
    const fetchData = async () => {
      if (init) {
        const resp = await refreshListOfErroFonologico()
        if (!!resp) {
          console.log('resp: ', resp);
          setInit(false)
          // setErrosFonologicos(resp as IErroFonologico[]);
          setErroFonologico(resp.at(0))
        }
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errosFonologicos, init]);

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
          <Button type="primary" onClick={showModalCreateErro}>
            Criar Erro fonológico
          </Button>
          <CreateErroModal open={openCreateErro} setOpen={setOpenCreateErro} />
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
