import { Ticket } from '../slices/ticketSlice'

export const filterTicketsFn = (tickets: Ticket[], filters: { name: string; isActive: boolean }[]): Ticket[] => {
  const activeFilters = filters.filter((filter) => filter.isActive).map((filter) => filter.name)

  if (activeFilters.includes('all')) {
    return tickets
  }

  return tickets.filter((ticket) => {
    const stopsCounts = ticket.segments.map((segment) => segment.stops.length)

    return stopsCounts.every((stops) => {
      if (activeFilters.includes('none') && stops === 0) return true
      if (activeFilters.includes('one') && stops === 1) return true
      if (activeFilters.includes('two') && stops === 2) return true
      if (activeFilters.includes('three') && stops === 3) return true
      return false
    })
  })
}

export const sortTicketsFn = (tickets: Ticket[], tabs: { filter: string; isActive: boolean }[]): Ticket[] => {
  const activeTab = tabs.find((tab) => tab.isActive)
  const sortType = activeTab ? activeTab.filter : null

  return [...tickets].sort((a, b) => {
    if (sortType === 'cheapest') {
      return a.price - b.price
    }
    if (sortType === 'fastest') {
      const aDuration = a.segments[0].duration + a.segments[1].duration
      const bDuration = b.segments[0].duration + b.segments[1].duration
      return aDuration - bDuration
    }
    if (sortType === 'optimal') {
      const aDuration = a.segments[0].duration + a.segments[1].duration
      const aCostPerMinute = a.price / aDuration
      const bDuration = b.segments[0].duration + b.segments[1].duration
      const bCostPerMinute = b.price / bDuration
      return aCostPerMinute - bCostPerMinute
    }
    return 0
  })
}
