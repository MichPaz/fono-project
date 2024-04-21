import React, { useState } from 'react';
import { Button, Input, Select, Space } from 'antd';
import { Form, Formik } from 'formik';
import * as Yup from 'yup'
import { IErroFonologicoInput } from '../../../types/erroFonologico';
import { createErroFonologico } from '../../../services/ErroFonologico';
import { useErroFonologico } from '../../../store/ErroFonologico';
import { DraggableModal } from '../DraggableModal';


interface UIModalCreateErroFonologico {
  open: boolean
  setOpen: Function
}

const SignInSchema = Yup.object().shape({
  tipo_interacao: Yup.string()
    .required('Preencha este campo')
    .required('Preencha este campo'),
  tipo_acao: Yup.string()
    .required('Preencha este campo')
    .min(3, 'Digite no mínimmo 3 caracteres'),
  realizado: Yup.string()
    .required('Preencha este campo'),
  idealizado: Yup.string()
    .required('Preencha este campo')
})

const initialValues: IErroFonologicoInput = {
  tipo_interacao: 'saida',
  tipo_acao: 'escrevi',
  realizado: '',
  idealizado: ''
}

const optionsTipoInteração = [
  { value: 'saida', label: 'Saída' },
  { value: 'entrada', label: 'Entrada' },
]

const optionsTipoAcao = [
  { value: 'escrevi', label: 'Escrevi' },
  { value: 'cantei', label: 'Cantei' },
  { value: 'li', label: 'Li' },
  { value: 'compreendi', label: 'Compreendi' },
  { value: 'escutei', label: 'Escutei' }
]


export const CreateErroModal: React.FC<UIModalCreateErroFonologico> = (
  {
    open,
    setOpen
  }
) => {
  const [loading, setLoading] = useState(false);
  const { refreshListOfErroFonologico } = useErroFonologico()

  const handleCancel = () => {
    setOpen(false);
  };

  function onKeyDown(handleSubmit: any, keyEvent: any) {
    if ((keyEvent.key) === 'Enter') {
      handleSubmit()
      keyEvent.preventDefault()
    }
  }

  const handleCreate = async (values: IErroFonologicoInput, { resetForm }: { resetForm: () => void }) => {
    setLoading(true);
    const res = await createErroFonologico(values)
    setLoading(false)
    if (res) {
      refreshListOfErroFonologico()
      setOpen(false)
      resetForm();
    }
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={
          SignInSchema
        }
        onSubmit={handleCreate}
        enableReinitialize
      >
        {({
          handleSubmit,
          values,
          handleChange,
          handleBlur,
          touched,
          errors,
          isSubmitting,
          resetForm,
          handleReset
        }) => {

          // const tipoInteracaoError = (Boolean(touched.tipo_interacao) ?? false) && Boolean(errors.tipo_interacao) ? 'error' : undefined
          // const tipoAcaoError = (Boolean(touched.tipo_acao) ?? false) && Boolean(errors.tipo_acao) ? 'error' : undefined
          const realizadoError = (Boolean(touched.realizado) ?? false) && Boolean(errors.tipo_acao) ? 'error' : undefined
          const idealizadoError = (Boolean(touched.idealizado) ?? false) && Boolean(errors.idealizado) ? 'error' : undefined

          // console.log('errors: ', errors)
          // console.log('touched: ', touched)

          return (
            <DraggableModal
              open={open}
              props={{
                title: 'Criar Erro  Fonológico',
                footer: [
                  <Button key="back" onClick={() => { handleCancel(); resetForm() }}>
                    Cancelar
                  </Button>,
                  <Button key="submit" type="primary" loading={loading} onClick={() => handleCreate(values, { resetForm })}>
                    Registrar
                  </Button>
                ]
              }}
              // onOk={()=>handleCreate(values)}
              setOpen={setOpen}
            >
              <Form onKeyDown={(e: any) => onKeyDown(handleSubmit, e)}>
                <Space
                  direction="vertical"
                  align="center"
                  style={{ width: '100%' }}
                >
                  <Select
                    rootClassName='tipo_interacao'
                    defaultValue={optionsTipoInteração[0].value}
                    // style={{ width: 120 }}
                    onChange={handleChange}
                    options={optionsTipoInteração}
                  />
                  <Select
                    rootClassName='tipo_acao'
                    defaultValue={optionsTipoAcao[0].value}
                    // style={{ width: 120 }}
                    onChange={handleChange}
                    options={optionsTipoAcao}
                  />
                  <Input
                    name='realizado'
                    type='text'
                    status={realizadoError}
                    value={values.realizado}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Digite o que foi realizado"
                  />
                  <Input
                    name='idealizado'
                    type='text'
                    status={idealizadoError}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.idealizado}
                    placeholder="Digite o que foi idealizado"
                  />
                </Space>
              </Form>
            </DraggableModal>
          )
        }}
      </Formik>
    </>
  );
};