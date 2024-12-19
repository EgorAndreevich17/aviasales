import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface Segment {
  origin: string
  destination: string
  date: string
  stops: string[]
  duration: number
}

export interface Ticket {
  price: number
  carrier: string
  segments: [Segment, Segment]
}

interface TicketState {
  searchID: string | null
  tickets: Ticket[]
  filteredTickets: Ticket[] // Отфильтрованные билеты
  loading: boolean
  error: string | null
}

const initialState: TicketState = {
  searchID: null,
  tickets: [],
  filteredTickets: [],
  loading: false,
  error: null,
}

// Асинхронное действие для получения searchID
export const fetchSearchID = createAsyncThunk('tickets/fetchSearchID', async () => {
  const res = await fetch('https://aviasales-test-api.kata.academy/search')
  if (!res.ok) {
    throw new Error('Ошибка получения searchID')
  }
  const data = await res.json()
  return data.searchId // Возвращаем searchId, чтобы его использовал редуктор
})

// Асинхронное действие для получения билетов
export const fetchTickets = createAsyncThunk('tickets/fetchTickets', async (_, { getState, dispatch }) => {
  // console.log('внутри fetchTickets')

  // Получаем searchID, если его нет
  let searchID = (getState() as { tickets: TicketState }).tickets.searchID
  if (!searchID) {
    // console.log('searchID не найден, запрашиваем его...')
    const result = await dispatch(fetchSearchID()).unwrap()
    searchID = result
  }
  // console.log(searchID)

  // Делаем запрос на билеты с полученным searchID
  const res = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchID}`)
  if (!res.ok) {
    throw new Error('Ошибка загрузки данных')
  }
  const data = await res.json()

  // Возвращаем полученные билеты
  return data.tickets
})

const ticketSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    filterTickets: (state, action) => {
      const activeFilters = action.payload

      // Если ни один фильтр не активен или включен фильтр "all", показываем все билеты
      if (activeFilters.length === 0 || activeFilters.includes('all')) {
        state.filteredTickets = [...state.tickets]
        return
      }

      // Фильтруем билеты по количеству пересадок
      state.filteredTickets = state.tickets.filter((ticket) => {
        // Получаем количество пересадок в каждом сегменте билета
        const stopsCounts = ticket.segments.map((segment) => segment.stops.length)

        // Проверяем, подходит ли хотя бы один сегмент билета под активные фильтры
        return stopsCounts.every((stops) => {
          // Проверка каждого фильтра для соответствия количеству пересадок
          if (activeFilters.includes('none') && stops === 0) return true // Билеты без пересадок
          if (activeFilters.includes('one') && stops === 1) return true // Билеты с одной пересадкой
          if (activeFilters.includes('two') && stops === 2) return true // Билеты с двумя пересадками
          if (activeFilters.includes('three') && stops === 3) return true // Билеты с тремя пересадками
          return false
        })
      })
    },

    sortTickets: (state, action) => {
      const filter = action.payload

      state.filteredTickets.sort((a, b) => {
        if (filter === 'cheapest') {
          return a.price - b.price // Сортировка по цене (дешевле)
        }
        if (filter === 'fastest') {
          const aDuration = a.segments[0].duration + a.segments[1].duration
          const bDuration = b.segments[0].duration + b.segments[1].duration
          return aDuration - bDuration // Сортировка по времени (быстрее)
        }
        if (filter === 'optimal') {
          const aDuration = a.segments[0].duration + a.segments[1].duration
          const aCostPerMinute = a.price / aDuration
          const bDuration = b.segments[0].duration + b.segments[1].duration
          const bCostPerMinute = b.price / bDuration
          return aCostPerMinute - bCostPerMinute // Сортировка по "оптимальности"
        }
        return 0 // Если filter некорректен
      })
    },
  },
  extraReducers: (builder) => {
    builder
      // Получение searchID
      .addCase(fetchSearchID.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchSearchID.fulfilled, (state, action) => {
        state.searchID = action.payload // Обновляем searchID через action.payload
        state.loading = false
      })
      .addCase(fetchSearchID.rejected, (state, action) => {
        state.error = action.error.message || 'Ошибка при получении searchID'
        state.loading = false
      })

      // Получение билетов
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.tickets = [...state.tickets, ...action.payload] // Добавляем новые билеты к существующим
        state.filteredTickets = [...state.filteredTickets, ...action.payload] // Добавляем новые билеты к существующим
        state.loading = false
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.error = action.error.message || 'Ошибка при получении билетов'
        state.loading = false
      })
  },
})

export default ticketSlice.reducer
export const { sortTickets, filterTickets } = ticketSlice.actions
