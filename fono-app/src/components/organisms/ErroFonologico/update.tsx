import React, { useState } from 'react';
import { Button, Input, Select, Space } from 'antd';
import { Form, Formik } from 'formik';
import * as Yup from 'yup'
import { IErroFonologicoUpdateInput } from '../../../types/erroFonologico';
import { updateErroFonologico } from '../../../services/ErroFonologico';
import { useErroFonologico } from '../../../store/ErroFonologico';
import { DraggableModal } from '../DraggableModal';

interface UIModalUpdateErroFonologico {
  open: boolean
  setOpen: Function
  erroFonologico: IErroFonologicoUpdateInput
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


export const UpdateErroModal: React.FC<UIModalUpdateErroFonologico> = (
  {
    open,
    setOpen,
    erroFonologico
  }
) => {
  const [loading, setLoading] = useState(false);
  const { refreshListOfErroFonologico } = useErroFonologico()

  const initialValues: IErroFonologicoUpdateInput = erroFonologico

  const handleCancel = () => {
    setOpen(false);
  };

  function onKeyDown(handleSubmit: any, keyEvent: any) {
    if ((keyEvent.key) === 'Enter') {
      handleSubmit()
      keyEvent.preventDefault()
    }
  }

  const handleUpdate = async (values: IErroFonologicoUpdateInput, { resetForm }: { resetForm: () => void }) => {
    setLoading(true);
    const res = await updateErroFonologico(values)
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
        onSubmit={handleUpdate}
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

          const realizadoError = (Boolean(touched.realizado) ?? false) && Boolean(errors.tipo_acao) ? 'error' : undefined
          const idealizadoError = (Boolean(touched.idealizado) ?? false) && Boolean(errors.idealizado) ? 'error' : undefined

          // console.log('errors: ', errors)
          // console.log('touched: ', touched)

          return (
            <DraggableModal
              setOpen={setOpen}
              open={open}
              // onOk={()=>handleUpdate(values)}
              onCancel={handleCancel}
              props={{
                title: 'Editar Erro  Fonológico',
                footer: [
                  <Button key="back" onClick={() => { handleCancel(); resetForm() }}>
                    Cancelar
                  </Button>,
                  <Button key="submit" type="primary" loading={loading} onClick={() => handleUpdate(values, { resetForm })}>
                    Confirmar
                  </Button>
                ]
              }}
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
                  {/* <Button
                    loading={loadingSignIn}
                    style={{ width: 80, marginTop: '18px' }}
                    type="primary"
                    htmlType="submit"
                  // onClick={siginAction}
                  // onClick={() => handleSubmit()}
                  >
                    Entrar
                  </Button> */}
                </Space>
              </Form>
            </DraggableModal>
          )
        }}
      </Formik>
    </>
  );
};