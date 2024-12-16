import logo from '@public/images/S7_Logo.png'

export default function TicketBox() {
  return (
    <div className="ticket-box--wrapper">
      <div className="ticket-box--header">
        <div className="ticket--price">13 000 Р</div>
        <img className="ticket--logo" src={logo}></img>
      </div>
      <div className="ticket-box--body">
        <div className="ticket-box--time">
          <div>MOW - HCT</div>
          <div>10:45 - 08:00</div>
        </div>
        <div className="ticket-box--duracity">
          <div>В ПУТИ</div>
          <div>21ч 15м</div>
        </div>
        <div className="ticket-box--transfers">
          <div>2 ПЕРЕСАДКИ</div>
          <div>HKG, JNB</div>
        </div>
      </div>
    </div>
  )
}
