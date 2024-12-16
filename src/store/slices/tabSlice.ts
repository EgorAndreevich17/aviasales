import { createSlice } from '@reduxjs/toolkit'

interface Tab {
  label: string
  key: string
  filter: string
}

type FilterState = Tab[]

const initialState: FilterState = [
  {
    label: 'Самый быстрый',
    key: '1',
    filter: 'fastest',
  },
  {
    label: 'Самый дешевый',
    key: '2',
    filter: 'cheapest',
  },
  {
    label: 'Оптимальный',
    key: '3',
    filter: 'optimal',
  },
]

const tabSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    changeTab: (state, action) => {
      // Можете обработать изменение таба, если нужно
      console.log(`Текущий таб: ${action.payload}`)
    },
  },
})

export const { changeTab } = tabSlice.actions

export default tabSlice.reducer
