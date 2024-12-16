// eslint-disable-next-line import/named
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Filter {
  name: string
  isActive: boolean
}

type FilterState = Filter[]

const initialState: FilterState = [
  { name: 'all', isActive: false },
  { name: 'none', isActive: false },
  { name: 'one', isActive: false },
  { name: 'two', isActive: false },
  { name: 'three', isActive: false },
]

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    toggleFilter: (state, action: PayloadAction<string>) => {
      const filterName = action.payload

      if (filterName === 'all') {
        // Если включается/выключается "Все"
        const allFilter = state.find((f) => f.name === 'all')
        if (allFilter) {
          allFilter.isActive = !allFilter.isActive
          state.forEach((f) => {
            if (f.name !== 'all') f.isActive = allFilter.isActive
          })
        }
      } else {
        // Если включается/выключается конкретный фильтр
        const filter = state.find((f) => f.name === filterName)
        if (filter) filter.isActive = !filter.isActive

        const allFilter = state.find((f) => f.name === 'all')
        if (allFilter) {
          const areAllFiltersActive = state.filter((f) => f.name !== 'all').every((f) => f.isActive)
          allFilter.isActive = areAllFiltersActive
        }
      }
    },
  },
})

export const { toggleFilter } = filterSlice.actions

export default filterSlice.reducer
