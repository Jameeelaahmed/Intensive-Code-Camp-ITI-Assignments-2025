
import './App.css'
import RoutesPage from './routes/RoutesPages'
import MoviesContextProvider from './store/FetchingMoviesContext'
function App() {

  return (
    <>
      <MoviesContextProvider>
        <RoutesPage />
      </MoviesContextProvider>
    </>
  )
}

export default App
