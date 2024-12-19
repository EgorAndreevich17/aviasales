import { useSelector } from 'react-redux'
import { Spin, Empty, Alert } from 'antd'

import { RootState } from '../../../store'
import TicketBox from '../TicketBox/TicketBox'

export default function TicketsList() {
  const filters = useSelector((state: RootState) => state.filters)
  const tickets = useSelector((state: RootState) => state.tickets.filteredTickets)
  const loading = useSelector((state: RootState) => state.tickets.loading)
  const error = useSelector((state: RootState) => state.tickets.error)

  // Проверяем, активен ли хотя бы один фильтр
  const isAnyFilterActive = filters.some((filter) => filter.isActive)

  if (loading) return <Spin />

  if (error) return <Alert type="error" message="Error" />

  return (
    <div>
      {!isAnyFilterActive || tickets.length === 0 ? (
        <Empty description="Рейсов, подходящих под заданные фильтры, не найдено" />
      ) : (
        tickets.map((ticket, index) => <TicketBox key={index} ticket={ticket} />)
      )}
    </div>
  )
}
