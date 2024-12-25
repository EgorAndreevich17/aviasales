// import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Spin, Empty, Alert } from 'antd'

import { RootState } from '../../../store'
import TicketBox from '../TicketBox/TicketBox'
// import { sortTickets, filterTickets } from '../../../store/slices/ticketSlice'
import { selectVisibleTickets } from '../../../store/selectors/ticketSelector'

export default function TicketsList() {
  // const dispatch = useDispatch<AppDispatch>()
  const filters = useSelector((state: RootState) => state.filters)
  const tickets = useSelector((state: RootState) => state.tickets.tickets)
  // const filteredTickets = useSelector((state: RootState) => state.tickets.filteredTickets)
  // const activeTab = useSelector((state: RootState) => state.tabs).find((tab) => tab.isActive)
  const loading = useSelector((state: RootState) => state.tickets.loading)
  const error = useSelector((state: RootState) => state.tickets.error)
  const visibleTickets = useSelector(selectVisibleTickets).slice(0, 5)

  // Проверяем, активен ли хотя бы один фильтр
  const isAnyFilterActive = filters.some((filter) => filter.isActive)

  if (loading) return <Spin />

  if (error) return <Alert type="error" message="Error" />

  return (
    <div>
      {!isAnyFilterActive || tickets.length === 0 ? (
        <Empty description="Рейсов, подходящих под заданные фильтры, не найдено" />
      ) : (
        visibleTickets.map((ticket, index) => <TicketBox key={index} ticket={ticket} />)
      )}
    </div>
  )
}
