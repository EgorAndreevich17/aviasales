import { configureStore } from '@reduxjs/toolkit'

import filterReducer from './slices/filterSlice'
import tabSlice from './slices/tabSlice.ts'
import ticketReducer from './slices/ticketSlice'

export const store = configureStore({
  reducer: {
    filters: filterReducer,
    tabs: tabSlice,
    tickets: ticketReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
