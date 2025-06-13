
import './App.css'
import store from './redux/store'
import { Provider } from 'react-redux'
import RoutesPage from './routes/RoutesPages'
import MoviesContextProvider from './store/FetchingMoviesContext'
function App() {

  return (
    <>
      <Provider store={store}>
        <MoviesContextProvider>
          <RoutesPage />
        </MoviesContextProvider>
      </Provider>
    </>
  )
}

export default App
