// import './App.scss'
import { ConfigProvider } from 'antd'

import Body from '../Body/Body'
import Header from '../Header/Header'

function App() {
  return (
    <div className="app">
      <ConfigProvider
        theme={{
          components: {
            Tabs: {
              colorPrimary: 'white', // Основной цвет
              colorBgContainer: '#2196F3',
              fontFamily: 'Open Sans',
            },
            Checkbox: {
              // colorBgContainer: "white",
              colorPrimary: '#2196F3',
              // colorPrimaryBorder: '#2196F3'
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
