import { Tabs } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import { changeTab } from '../../../store/slices/tabSlice'
import TicketsList from '../TicketsList/TicketsList'
import { RootState } from '../../../store'

export default function Filters() {
  const tabs = useSelector((state: RootState) => state.tab)
  const dispatch = useDispatch()

  const onTabClick = (key: string) => {
    dispatch(changeTab(key))
  }
  return (
    <div className="tabs-wrapper">
      <Tabs
        onTabClick={onTabClick}
        type="card"
        size="large"
        items={tabs.map((tab) => ({
          label: tab.label,
          key: tab.key,
          children: <TicketsList filter={tab.filter} />, // Рендерим компонент по фильтру
        }))}
      />
    </div>
  )
}
