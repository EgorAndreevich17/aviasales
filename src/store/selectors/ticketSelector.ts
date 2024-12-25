import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '../index'
import { filterTicketsFn, sortTicketsFn } from '../utils/ticketUtils'
import { Ticket } from '../slices/ticketSlice'

export const selectFilteredTickets = createSelector(
  [
    (state: RootState) => state.tickets.tickets, // Все билеты
    (state: RootState) => state.filters, // Фильтры
  ],
  (tickets: Ticket[], filters): Ticket[] => {
    return filterTicketsFn(tickets, filters)
  }
)

export const selectSortedTickets = createSelector(
  [
    selectFilteredTickets, // Уже отфильтрованные билеты
    (state: RootState) => {
      return state.tabs
    }, // Табы сортировки
  ],
  (filteredTickets: Ticket[], tabs): Ticket[] => {
    return sortTicketsFn(filteredTickets, tabs)
  }
)

export const selectVisibleTickets = createSelector(
  [selectSortedTickets],
  (sortedTickets: Ticket[]): Ticket[] => sortedTickets
)
