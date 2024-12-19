import logo from '@public/images/Logo.png'

import styles from './Header.module.scss'

export default function Header() {
  return (
    <div className={styles.header}>
      <img src={logo}></img>
    </div>
  )
}
