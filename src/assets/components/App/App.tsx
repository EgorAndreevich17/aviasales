import { ConfigProvider } from 'antd'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { fetchTickets, sortTickets } from '../../../store/slices/ticketSlice'
import Body from '../Body/Body'
import Header from '../Header/Header'

import styles from './App.module.scss'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTickets())
    dispatch(sortTickets('fastest'))
  }, [dispatch])

  return (
    <div className={styles.app}>
      <ConfigProvider
        theme={{
          components: {
            Tabs: {
              colorPrimary: 'white', // Основной цвет
              colorBgContainer: '#2196F3',
              fontFamily: 'Open Sans',
            },
            Checkbox: {
              colorPrimary: '#2196F3',
            },
          },
        }}
      >
        <Header></Header>
        <Body></Body>
      </ConfigProvider>
    </div>
  )
}

export default App
