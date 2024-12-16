import { configureStore } from '@reduxjs/toolkit'

import filterReducer from './slices/filterSlice'
import tabSlice from './slices/tabSlice.ts'

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    tab: tabSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
