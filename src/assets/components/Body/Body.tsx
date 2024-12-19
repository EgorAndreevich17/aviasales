import Sidebar from '../Sidebar/Sidebar'
import Filters from '../Filters/Filters'

import styles from './Body.module.scss'

export default function Body() {
  return (
    <div className={styles.wrapper}>
      <Sidebar></Sidebar>
      <Filters></Filters>
    </div>
  )
}
