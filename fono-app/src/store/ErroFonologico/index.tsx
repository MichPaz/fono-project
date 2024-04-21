import React, { useState, createContext, useContext, ReactNode } from 'react'
import { getErrosFonologicos } from '../../services/ErroFonologico';
import { IErroFonologico } from '../../types/erroFonologico';

interface IErroFonologicoContext {
  errosFonologicos: IErroFonologico[]
  refreshListOfErroFonologico: () => Promise<IErroFonologico[] | undefined>
  loading: boolean
}
const ErroFonologicoContext = createContext<IErroFonologicoContext | null>(null)

function ErroFonologicoProvider({ children }: { children: ReactNode | undefined }) {

  const [loading, setLoading] = useState<boolean>(true)
  const [errosFonologicos, setErrosFonologicos] = useState<IErroFonologico[]>([])

  async function refreshListOfErroFonologico(): Promise<IErroFonologico[] | undefined> {
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
