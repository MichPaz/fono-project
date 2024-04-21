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
import { Theme, useMediaQuery } from "@mui/material";
import { DraggableModal } from "../organisms/DraggableModal";

const { Title } = Typography;

function ErrosFonologicos() {
  const { logout, session } = useAuth()
  const { errosFonologicos, refreshListOfErroFonologico } = useErroFonologico()
  const [erroFonologico, setErroFonologico] = useState<IErroFonologico | undefined>();
  const [openErro, setOpenErro] = useState(false);
  const [openCreateErro, setOpenCreateErro] = useState(false);
  const [init, setInit] = useState(true);
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));


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
        <Col span={hidden ? 24 : 12}>
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
                      <Button onClick={() => { setOpenErro(true); setErroFonologico(item) }}>
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
        {hidden ?
          <DraggableModal
            open={openErro}
            setOpen={setOpenErro}
            props={{
              title: "Erro Fonológico",
              footer: [
              ]
            }}
            // onOk={()=>handleCreate(values)}
            onCancel={() => setOpenErro(false)}
          >
            {
              erroFonologico && <UIErroFonologico
                erroFonologico={erroFonologico}
              />
            }
          </DraggableModal>
          :
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
        }
      </Row>
    </div>
  );
}

export default ErrosFonologicos;
