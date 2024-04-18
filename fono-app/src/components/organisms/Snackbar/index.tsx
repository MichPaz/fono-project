import React, { useEffect, Fragment, ReactNode } from 'react'
import { SnackbarProvider, useSnackbar } from 'notistack'
import Alert, { IAlert } from '../../../services/alert'
import { CloseCircleOutlined } from "@ant-design/icons";
import { Button } from 'antd';

function MyApp () {
  const { enqueueSnackbar } = useSnackbar()

  const handleClickVariant = (
    message: string | React.ReactNode,
    config: IAlert
  ) => {
    if ((config?.archororigin) != null) {
      config.archororigin = {
        vertical: 'top',
        horizontal: 'left'
      }
    }
    enqueueSnackbar(message, config)
  }

  useEffect(() => {
    async function _onChange () {
      const message = Alert.getMessage()
      let msg: React.ReactNode | string
      if (message.title !== undefined) {
        msg = <p>
          <span style={{ fontSize: '18px' }}>
            {message.title}
          </span>
          <br />
          <span>
            {message.message}
          </span>
        </p>
      } else { msg = message.message }
      handleClickVariant(msg, message)
    }

    async function startValues () {
      Alert.addChangeListener(_onChange)
    }

    startValues()

    return function cleanup () {
      Alert.removeChangeListener(_onChange)
    }
    // eslint-disable-next-line
  }, [])
  return <></>
}

function IntegrationNotistack({ children }: { children: ReactNode | undefined} ) {
  const notistackRef = React.createRef<SnackbarProvider>()
  const onClickDismiss = (key: any) => () => {
    notistackRef?.current?.closeSnackbar(key)
  }

  return (
    <SnackbarProvider
      style={{
        margin: '.4rem 0',
        pointerEvents: 'all',
        maxWidth: 450
      }}
      preventDuplicate
      maxSnack={4}
      ref={notistackRef}
      action={(key) => (
        <Fragment>
          <Button
            icon={<CloseCircleOutlined />}
            type='text'
            style={{
              marginLeft: '2rem',
              color: 'white',
              backgroundColor: 'inherit'
            }}
            onClick={onClickDismiss(key)}
          >
            Fechar
          </Button>
        </Fragment>
      )}
    >
      <MyApp />
      {children}
    </SnackbarProvider>
  )
}

export default IntegrationNotistack
