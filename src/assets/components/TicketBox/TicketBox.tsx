import logo from '@public/images/S7_Logo.png'

import styles from './TicketBox.module.scss'

export default function TicketBox(ticket: any) {
  // console.log(ticket)
  const imgPath = `https://pics.avs.io/99/36/${ticket.ticket.carrier}.png`
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.price}>{Number(ticket.ticket.price).toLocaleString('ru-RU')} Р</div>
        <img className={styles.logo} src={imgPath || logo}></img>
      </div>
      <div className={styles.body}>
        <div className={styles.body_wrapper}>
          <div className={styles.body_time}>
            <div>
              {ticket.ticket.segments[0].origin} - {ticket.ticket.segments[0].destination}
            </div>
            <div>{formatFlightTime(ticket.ticket.segments[0].date, ticket.ticket.segments[0].duration)}</div>
          </div>
          <div>
            <div>В ПУТИ</div>
            <div>{formatDuration(ticket.ticket.segments[0].duration)}</div>
          </div>
          <div>
            <div>{getStopsText(ticket.ticket.segments[0].stops.length)}</div>
            <div>{ticket.ticket.segments[0].stops.map((stop: any) => `${stop} `)}</div>
          </div>
        </div>
        <div className={styles.body_wrapper}>
          <div className={styles.body_time}>
            <div>
              {ticket.ticket.segments[1].origin} - {ticket.ticket.segments[1].destination}
            </div>
            <div>{formatFlightTime(ticket.ticket.segments[1].date, ticket.ticket.segments[1].duration)}</div>
          </div>
          <div>
            <div>В ПУТИ</div>
            <div>{formatDuration(ticket.ticket.segments[1].duration)}</div>
          </div>
          <div>
            <div>{getStopsText(ticket.ticket.segments[1].stops.length)}</div>
            <div>{ticket.ticket.segments[1].stops.map((stop: any) => `${stop} `)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function formatDuration(minutes: any) {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours}ч ${mins}м`
}

function formatFlightTime(startDate: any, durationInMinutes: any) {
  const start = new Date(startDate)

  // Конечное время: добавляем длительность в миллисекундах
  const end = new Date(start.getTime() + durationInMinutes * 60 * 1000)

  // Преобразуем в формат HH:MM
  const formatTime = (date: any) =>
    `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`

  // Возвращаем строку в формате "HH:MM - HH:MM"
  return `${formatTime(start)} - ${formatTime(end)}`
}

const getStopsText = (stopsCount: any) => {
  if (stopsCount === 0) {
    return <span>0 ПЕРЕСАДОК</span>
  } else if (stopsCount === 1) {
    return <span>1 ПЕРЕСАДКА</span>
  }
  return <span>{stopsCount} ПЕРЕСАДКИ</span>
}
