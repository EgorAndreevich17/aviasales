import { Tabs } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import { changeTab } from '../../../store/slices/tabSlice'
import { sortTickets } from '../../../store/slices/ticketSlice'
import { RootState } from '../../../store'
import TicketsList from '../TicketsList/TicketsList'

import styles from './Filters.module.scss'

export default function Filters() {
  const tabs = useSelector((state: RootState) => state.tabs)
  const dispatch = useDispatch()

  const activeTab = tabs.find((tab) => tab.isActive)?.key

  const onTabClick = (key: string) => {
    const activeTab = tabs.find((tab) => tab.key === key)
    const filter = activeTab?.filter || 'fastest'
    dispatch(changeTab(key))
    dispatch(sortTickets(filter))
  }

  return (
    <div className={styles.wrapper}>
      <Tabs
        onTabClick={onTabClick}
        type="card"
        size="large"
        activeKey={activeTab}
        items={tabs.map((tab) => ({
          label: tab.label,
          key: tab.key,
        }))}
      />
      <TicketsList />
    </div>
  )
}
