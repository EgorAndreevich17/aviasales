import { ConfigProvider } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchTickets } from '../../../store/slices/ticketSlice'
import { AppDispatch, RootState } from '../../../store'
import Body from '../Body/Body'
import Header from '../Header/Header'

import styles from './App.module.scss'

function App() {
  const dispatch = useDispatch<AppDispatch>()
  // const tickets = useSelector((state: RootState) => state.tickets.tickets)
  const stop = useSelector((state: RootState) => state.tickets.isStop)

  useEffect(() => {
    dispatch(fetchTickets())
    // dispatch(sortTickets('fastest'))
  }, [stop, dispatch])

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
