import React, { useState, createContext, useContext, ReactNode } from 'react'
import { ErroFonologicoAttributes, ErroFonologicoOutput } from '../../../../fono-api/src/api/models/ErroFonologico';
import { getErrosFonologicos } from '../../services/ErroFonologico';

interface IErroFonologicoContext {
  errosFonologicos: ErroFonologicoOutput[]
  refreshListOfErroFonologico: () => Promise<ErroFonologicoAttributes[] | undefined>
  loading: boolean
}
const ErroFonologicoContext = createContext<IErroFonologicoContext | null>(null)

function ErroFonologicoProvider({ children }: { children: ReactNode | undefined }) {

  const [loading, setLoading] = useState<boolean>(true)
  const [errosFonologicos, setErrosFonologicos] = useState<ErroFonologicoOutput[]>([])

  async function refreshListOfErroFonologico(): Promise<ErroFonologicoAttributes[] | undefined> {
    setLoading(true)
    const data = await getErrosFonologicos()
    setLoading(false)
    if (data) {
      setErrosFonologicos(data)
      return data
    }
  }

  return (
    <ErroFonologicoContext.Provider value={{ refreshListOfErroFonologico, errosFonologicos, loading }}>
      {children}
    </ErroFonologicoContext.Provider>
  )
}

function useErroFonologico(): IErroFonologicoContext {
  const context = useContext(ErroFonologicoContext)
  return context as IErroFonologicoContext
}

export { ErroFonologicoProvider, useErroFonologico }
