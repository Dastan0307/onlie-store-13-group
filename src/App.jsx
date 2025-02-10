import './App.css'
import Header from './components/header/Header'
import RoutesApp from './routes/Routes'
import { ToastContainer } from 'react-toastify'

function App() {

  return (
    <>
      <ToastContainer />
      <Header />
      <RoutesApp />
    </>
  )
}

export default App
