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
      // console.log(filterName)
      if (filterName === 'all') {
        // Включаем/выключаем фильтр "all"
        const allFilter = state.find((f) => f.name === 'all')
        if (allFilter) {
          allFilter.isActive = !allFilter.isActive
          // Если фильтр "all" активен, то отключаем остальные фильтры
          state.forEach((f) => {
            if (f.name !== 'all') f.isActive = allFilter.isActive
          })
        }
      } else {
        // Включаем/выключаем другие фильтры
        const filter = state.find((f) => f.name === filterName)
        if (filter) filter.isActive = !filter.isActive

        // Если фильтры "none", "one", "two", "three" все активированы, то делаем "all" активным
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
