import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// import { useSelector } from 'react-redux'
import { RootState } from '..'
import { filterTicketsFn, sortTicketsFn } from '../utils/ticketUtils'

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
  isStop: boolean
}

const initialState: TicketState = {
  searchID: null,
  tickets: [],
  filteredTickets: [],
  loading: false,
  error: null,
  isStop: false,
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
  let searchID = (getState() as { tickets: TicketState }).tickets.searchID
  if (!searchID) {
    const result = await dispatch(fetchSearchID()).unwrap()
    searchID = result
  }

  const MAX_RETRIES = 7 // Количество попыток повторения
  const DELAY_MS = 300 // Задержка между запросами
  const tickets: Ticket[] = []
  let stop = false

  // Функция с таймаутом
  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

  while (!stop) {
    let attempt = 0
    let success = false

    while (attempt < MAX_RETRIES && !success) {
      try {
        const res = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchID}`)

        if (!res.ok) {
          throw new Error(`Ошибка загрузки данных, статус: ${res.status}`)
        }

        const data = await res.json()
        if (data) {
          const activeTab = (getState() as RootState).tabs.find((tab) => tab.isActive)?.filter
          const filters = (getState() as RootState).filters
          tickets.push(...data.tickets)
          stop = data.stop
          // console.log(data)
          success = true
          dispatch(updateTickets({ tickets: data.tickets, filters, activeTab }))
        }
      } catch (error) {
        attempt++
        if (attempt === MAX_RETRIES) {
          throw new Error('Превышено количество попыток загрузки данных')
        }
        // Ждем перед повторной попыткой
        await delay(DELAY_MS)
      }
    }

    // Если запрос был успешен, добавляем задержку перед следующим запросом
    if (!stop) {
      await delay(DELAY_MS)
    }
  }
  return { tickets, stop }
})

const ticketSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    updateTickets: (state, action) => {
      const { tickets } = action.payload
      state.tickets = [...state.tickets, ...tickets]
      // console.log(filters)
      // console.log(activeTab)
      // state.filteredTickets = [...state.tickets]
      // console.log(state.tickets.length)
      // filterTickets(filters) // не вызывается
      // sortTickets(activeTab) // не вызывается
    },
    filterTickets: (state, action) => {
      state.filteredTickets = filterTicketsFn(state.tickets, action.payload)
      // const activeFilters = action.payload

      // // Если включен фильтр "all", показываем все билеты
      // if (activeFilters.includes('all')) {
      //   state.filteredTickets = [...state.tickets]
      //   return
      // }

      // // Фильтруем билеты по количеству пересадок
      // state.filteredTickets = state.tickets.filter((ticket) => {
      //   // Получаем количество пересадок в каждом сегменте билета
      //   const stopsCounts = ticket.segments.map((segment) => segment.stops.length)

      //   // Проверяем, подходит ли хотя бы один сегмент билета под активные фильтры
      //   return stopsCounts.every((stops) => {
      //     // Проверка каждого фильтра для соответствия количеству пересадок
      //     if (activeFilters.includes('none') && stops === 0) return true // Билеты без пересадок
      //     if (activeFilters.includes('one') && stops === 1) return true // Билеты с одной пересадкой
      //     if (activeFilters.includes('two') && stops === 2) return true // Билеты с двумя пересадками
      //     if (activeFilters.includes('three') && stops === 3) return true // Билеты с тремя пересадками
      //     return false
      //   })
      // })
    },

    sortTickets: (state, action) => {
      state.filteredTickets = sortTicketsFn(state.filteredTickets, action.payload)
      // console.log(state.filteredTickets)
      // const filter = action.payload

      // state.filteredTickets.sort((a, b) => {
      //   if (filter === 'cheapest') {
      //     return a.price - b.price // Сортировка по цене (дешевле)
      //   }
      //   if (filter === 'fastest') {
      //     const aDuration = a.segments[0].duration + a.segments[1].duration
      //     const bDuration = b.segments[0].duration + b.segments[1].duration
      //     return aDuration - bDuration // Сортировка по времени (быстрее)
      //   }
      //   if (filter === 'optimal') {
      //     const aDuration = a.segments[0].duration + a.segments[1].duration
      //     const aCostPerMinute = a.price / aDuration
      //     const bDuration = b.segments[0].duration + b.segments[1].duration
      //     const bCostPerMinute = b.price / bDuration
      //     return aCostPerMinute - bCostPerMinute // Сортировка по "оптимальности"
      //   }
      //   return 0 // Если filter некорректен
      // })
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
        // state.tickets = [...state.tickets, ...action.payload.tickets] // Добавляем новые билеты к существующим
        // state.filteredTickets = [...state.filteredTickets, ...action.payload.tickets] // Добавляем новые билеты к существующим
        state.isStop = action.payload.stop
        state.loading = false
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.error = action.error.message || 'Ошибка при получении билетов'
        state.loading = false
      })
  },
})

export default ticketSlice.reducer
export const { sortTickets, filterTickets, updateTickets } = ticketSlice.actions
