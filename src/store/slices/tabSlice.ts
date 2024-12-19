import { createSlice } from '@reduxjs/toolkit'

interface Tab {
  label: string
  key: string
  filter: string
  isActive: boolean
}

type FilterState = Tab[]

const initialState: FilterState = [
  {
    label: 'САМЫЙ БЫСТРЫЙ',
    key: '1',
    filter: 'fastest',
    isActive: true,
  },
  {
    label: 'САМЫЙ ДЕШЕВЫЙ',
    key: '2',
    filter: 'cheapest',
    isActive: false,
  },
  {
    label: 'ОПТИМАЛЬНЫЙ',
    key: '3',
    filter: 'optimal',
    isActive: false,
  },
]

const tabSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    changeTab: (state, action) => {
      const newActiveKey = action.payload

      state.forEach((tab) => {
        tab.isActive = tab.key === newActiveKey
      })
    },
  },
})

export const { changeTab } = tabSlice.actions

export default tabSlice.reducer
