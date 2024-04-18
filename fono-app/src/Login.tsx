import React, { useState } from "react";
import {
  Typography,
  Col,
  Row,
  Button,
  Space,
  Input,
} from "antd";
import { KeyOutlined, UserOutlined } from '@ant-design/icons';
import "./App.css";
import * as Yup from 'yup'
import { Form, Formik } from "formik";
import { ISignIn } from "./types/session";
import { useAuth } from "./store/session";


const { Title } = Typography;


const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Digite um endereço de e-mail válido')
    .required('Preencha este campo')
    .min(3, 'Digite no mínimmo 3 caracteres'),
  password: Yup.string()
    .required('Preencha este campo')
    .min(3, 'Digite no mínimmo 3 caracteres')
})

function SignIn() {
  const { login } = useAuth()
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [loadingSignIn, setLoadingSignIn] = useState(false)

  const handleSignIn = async (values: ISignIn) => {
    console.log('values', values)
    setLoadingSignIn(true)
    console.log('values', values)
    await login(values)
    setLoadingSignIn(false)
  }

  function onKeyDown(handleSubmit: any, keyEvent: any) {
    if ((keyEvent.key) === 'Enter') {
      handleSubmit()
      keyEvent.preventDefault()
    }
  }


  return (
    <>
      <Row style={{ height: '30vh' }} />
      <Row>
        <Col span={8}></Col>
        <Col span={8}>
          <Formik
            initialValues={{
              email: 'lemoneres.lima@gmail.com',
              password: 'melhorsenha'
            }}
            validationSchema={
              SignInSchema
            }
            onSubmit={handleSignIn}
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
              handleReset
            }) => {

              const emailError = (Boolean(touched.email) ?? false) && Boolean(errors.email) ? 'error' : undefined
              const passwordError = (Boolean(touched.password) ?? false) && Boolean(errors.password) ? 'error' : undefined

              // console.log('errors: ', errors)
              // console.log('touched: ', touched)

              return (
                <Form onKeyDown={(e: any) => onKeyDown(handleSubmit, e)}>
                  <Space
                    direction="vertical"
                    align="center"
                    style={{ width: '100%' }}
                  >
                    <Title level={3}>
                      Desvios Fonológicos
                    </Title>
                    <Input
                      name='email'
                      type='text'
                      status={emailError}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      prefix={<UserOutlined />}
                      placeholder="Digite seu e-mail"
                    />
                    <Input.Password
                      name='password'
                      type='password'
                      status={passwordError}
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      prefix={<KeyOutlined />}
                      placeholder="Digite sua senha"
                      visibilityToggle={
                        {
                          visible: passwordVisible,
                          onVisibleChange: setPasswordVisible
                        }}
                    />
                    <Button
                      loading={loadingSignIn}
                      style={{ width: 80, marginTop: '18px' }}
                      type="primary"
                      htmlType="submit"
                      // onClick={siginAction}
                      // onClick={() => handleSubmit()}
                    >
                      Entrar
                    </Button>
                  </Space>
                </Form>
              )
            }}
          </Formik>
        </Col>
        <Col span={8}></Col>
      </Row>
    </>
  );
}

export default SignIn;
