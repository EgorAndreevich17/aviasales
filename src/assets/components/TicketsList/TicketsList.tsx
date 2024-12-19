import { useSelector } from 'react-redux'
import { Spin, Empty, Alert } from 'antd'

import { RootState } from '../../../store'
import TicketBox from '../TicketBox/TicketBox'

export default function TicketsList() {
  const tickets = useSelector((state: RootState) => state.tickets.filteredTickets)
  const loading = useSelector((state: RootState) => state.tickets.loading)
  const error = useSelector((state: RootState) => state.tickets.error)

  if (loading) return <Spin />

  if (error) return <Alert type="error" message="Error" />

  return (
    <div>
      {tickets.length === 0 ? (
        <Empty description="Informational Notes" />
      ) : (
        tickets.map((ticket, index) => <TicketBox key={index} ticket={ticket} />)
      )}
    </div>
  )
}
