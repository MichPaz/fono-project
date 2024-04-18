import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Session } from '../../types/session'

const initialState = {
    token: undefined,
    user: undefined,
} as Session

export const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        updateSession: (state, action: PayloadAction<Session>) => {
            state.token = action.payload.token
            state.user = action.payload.user
        },
    },
})

export const { updateSession } = sessionSlice.actions

export default sessionSlice.reducer