import { Checkbox } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

import { filterTickets, sortTickets } from '../../../store/slices/ticketSlice'
import { RootState } from '../../../store'
import { toggleFilter } from '../../../store/slices/filterSlice'

import styles from './SideBar.module.scss'

function getFilterLabel(filterName: string): string {
  switch (filterName) {
    case 'all':
      return 'Все'
    case 'none':
      return 'Без пересадок'
    case 'one':
      return '1 пересадка'
    case 'two':
      return '2 пересадки'
    case 'three':
      return '3 пересадки'
    default:
      return filterName
  }
}

export default function Sidebar() {
  const filters = useSelector((state: RootState) => state.filters)
  const tabs = useSelector((state: RootState) => state.tabs)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(toggleFilter('all'))
  }, [])

  const handleFilterClick = (filterName: string) => {
    dispatch(toggleFilter(filterName))

    const activeFilters = filters
      .map((filter) => (filter.name === filterName ? { ...filter, isActive: !filter.isActive } : filter))
      .filter((filter) => filter.isActive)
      .map((filter) => filter.name)

    dispatch(filterTickets(activeFilters))

    const activeTab = tabs.find((tab) => tab.isActive)?.key || 'fastest'
    dispatch(sortTickets(activeTab))
  }

  return (
    <div className={styles.menu}>
      <div>
        <h3>Количество пересадок</h3>
      </div>
      {filters.map((filter) => (
        <div key={filter.name}>
          <Checkbox
            onChange={() => handleFilterClick(filter.name)}
            checked={filter.isActive} // Привязываем состояние к Redux
          >
            {getFilterLabel(filter.name)}
          </Checkbox>
        </div>
      ))}
    </div>
  )
}
