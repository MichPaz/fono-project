import React, { useState, createContext, useContext, useEffect, ReactNode } from 'react'
import Alert from '../../services/alert'
import { fonoAPI } from '../../services/fonoAPI'
import { ISignIn, Session } from '../../types/session'

const USER_KEY_STORAGE = 'user'
const TOKEN_KEY_STORAGE = 'token'
const TOKEN_KEY_HEADER = 'Authorization'

interface IAuthContext {
  loading: boolean
  logged: boolean
  session: Session | undefined | null
  login: (data: ISignIn) => Promise<boolean>
  logout: () => void
  // authProfile: (profiles: IProfile | IProfile[]) => boolean
  fecthSession: () => Promise<void>
}
const AuthContext = createContext<IAuthContext | null>(null)
// const AuthContext = createContext<Partial<IAuthContext>>({} as Partial<IAuthContext>)

function AuthProvider({ children }: { children: ReactNode | undefined }) {
  let initSession = localStorage.getItem(USER_KEY_STORAGE) as string | Session | null
  if (initSession !== undefined && initSession !== null)
    initSession = JSON.parse(initSession as string) as Session

  const [loading, setLoading] = useState<boolean>(true)
  const [session, setSession] = useState<Session | undefined | null>(initSession)
  const logged = Boolean(session)

  async function login(data: ISignIn): Promise<boolean> {
    console.log('data: ', data)
    console.log('oii')
    await fonoAPI.post('/signIn', data)
      .then(function (response: any) {
        console.log('response: ', response)
        if (response.data?.status === 'notlogin') {
          Alert.push({
            variant: 'error',
            message: response.data?.data?.message,
            title: 'Erro',
            archororigin: {
              vertical: 'top',
              horizontal: 'left'
            }
          })
          return false
        }
        const dataSession = response.data.data as Session
        const token: string = dataSession.token as string

        localStorage.setItem(USER_KEY_STORAGE, JSON.stringify(dataSession.user))
        localStorage.setItem(TOKEN_KEY_STORAGE, token)

        setSession(dataSession)
        setAuthApiRequestsHeader(token)
        const name = session?.admin?.name
        Alert.push({
          variant: 'success',
          message: `Boas vindas, ${name as string}`,
          title: 'Sucesso',
          archororigin: {
            vertical: 'top',
            horizontal: 'left'
          }
        })
        return true
      })
      .catch((err: any) => {
        // console.log('err', err)
        // console.log('err', err.response.data.message)
        const message = err.response.data.message === 'Email and Password is not match' ?
          'Credenciais Inválidas' : 'Erro ao realizar o Login'
        cleanLocalSession()
        Alert.push({
          variant: 'error',
          message,
          title: 'Erro'
        })
        return false
      })
    console.log('pooooooooo')
    return true
  }

  async function getSession(): Promise<Session | null | undefined> {
    let userInfo: any
    const token = localStorage.getItem(TOKEN_KEY_STORAGE)
    if (token !== null) {
      setAuthApiRequestsHeader(token)
      await fonoAPI.get('/tokenVerify')
        .then((response: any) => {
          const { user, admin } = response.data.data
          const mySession = { token, user, admin }
          userInfo = mySession
          setSession(mySession)
          console.log('userInfo: ', userInfo)
          localStorage.setItem(USER_KEY_STORAGE, JSON.stringify(userInfo))
        })
        .catch((err: any) => {
          console.log('err', err)
        })
    }

    // console.log('userInfo', userInfo)
    return userInfo as Session | null | undefined
  }

  function setAuthApiRequestsHeader(token: string): void {
    fonoAPI.defaults.headers.common[TOKEN_KEY_HEADER] = 'Bearer ' + token
    console.log('fonoAPI', fonoAPI.defaults.headers)
  }

  function cleanLocalSession(): void {
    setSession(undefined)
    localStorage.removeItem(USER_KEY_STORAGE)
    localStorage.removeItem(TOKEN_KEY_STORAGE)
    // localStorage.removeItem('token')
    delete fonoAPI.defaults.headers.common[TOKEN_KEY_HEADER]
  }

  function logout() {
    cleanLocalSession()
  }

  // function authProfile(profiles: IProfile | IProfile[]): boolean {
  //   if (session != null) {
  //     if (Array.isArray(profiles)) {
  //       return profiles.includes(session.user.profile)
  //     } else {
  //       return profiles === session.user?.profile
  //     }
  //   } else {
  //     return false
  //   }
  // }

  async function fecthSession(): Promise<void> {
    setLoading(true)
    const teste = await getSession()
    console.log('teste', teste)
    if (teste != null)
      setSession(teste)
    setLoading(false)
  }

  useEffect(() => {
    void fecthSession()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AuthContext.Provider value={{ loading, logged, login, logout, session, /*authProfile,*/ fecthSession }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): IAuthContext {
  const context = useContext(AuthContext)
  return context as IAuthContext
}

export { AuthProvider, useAuth }
