import { useSelector, useDispatch } from 'react-redux'
import { Checkbox } from 'antd'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'

import { RootState } from '../../../store'
import { toggleFilter } from '../../../store/slices/filterSlice'

// Функция для получения читабельного названия фильтра
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
  const filters = useSelector((state: RootState) => state.filter)
  const dispatch = useDispatch()

  const onChange = (e: CheckboxChangeEvent, filterName: string) => {
    dispatch(toggleFilter(filterName)) // Диспатчим экшен для изменения состояния
  }

  return (
    <div className="sidebar-menu">
      <div>
        <h3>Количество пересадок</h3>
      </div>
      {filters.map((filter) => (
        <div key={filter.name}>
          <Checkbox
            onChange={(e) => onChange(e, filter.name)}
            checked={filter.isActive} // Привязываем состояние к Redux
          >
            {getFilterLabel(filter.name)}
          </Checkbox>
        </div>
      ))}
    </div>
  )
}
