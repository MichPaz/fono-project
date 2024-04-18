import { ReactNode } from 'react'
import EventEmitter from 'events'

const CHANGE_EVENT = 'CHANGE'

export interface IAlert {
  title?: string
  message?: string | ReactNode
  variant?: 'success' | 'error' | 'info' | 'warning'
  action?: ReactNode
  autoHideDuration?: number
  archororigin?: {
    vertical: string
    horizontal: string
  }
}

class FeedbackMessageStores extends EventEmitter {
  constructor () {
    super()
    this.message = {}
  }

  message: IAlert

  push (message: IAlert) {
    this.message = message
    this.emit(CHANGE_EVENT)
  }

  getMessage () {
    return this.message
  }

  addChangeListener (callback: any) {
    this.on(CHANGE_EVENT, callback)
  }

  removeChangeListener (callback: any) {
    this.removeListener(CHANGE_EVENT, callback)
  }
}
export default new FeedbackMessageStores()
