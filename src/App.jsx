import { useEffect, useState } from 'react'
import { Routes, Route } from "react-router";
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import MovieGrid from './components/MovieGrid'
import Pagination from './components/Pagination'
import WatchList from './pages/WatchList'
import MovieDetailsModal from './components/MovieDetailsModal'

function App() {
  const [searchTerm, setSearchTerm] = useState("")
  const [movies, setMovies] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [state, setState] = useState('idle')
  const [totalResults, setTotalResults] = useState(0)
  const [selectedMovie, setSelectedMovie] = useState(null)

  const [watchList, setWatchList] = useState(() => {
    const saved = localStorage.getItem('movieWatchlist')
    return saved ? JSON.parse(saved) : []
  })

  async function getMovies(searchTerm, currentPage) {
    setState('loading')
    const url = `https://www.omdbapi.com/?&apikey=${import.meta.env.VITE_omdb_apiKey}&s=${searchTerm}&page=${currentPage}`;

    try {
        const response = await fetch(url);
        if (response.ok === false) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();

        if (result.Response === "False") {
            throw new Error(`Invalid Query: ${result.Error}`);
        }

        console.log(result.Search);
        setMovies(result.Search);
        setTotalResults(parseInt(result.totalResults))
        setState('success')

    } catch (error) {
        console.error(error.message);
        setMovies([])
        setState('error')
    }
  }

  useEffect(() => {
    if (searchTerm && searchTerm.trim() !== "") {
      getMovies(searchTerm, currentPage)
    }
  }, [searchTerm, currentPage])

  useEffect(() => {
    localStorage.setItem('movieWatchlist', JSON.stringify(watchList))
  }, [watchList])

  return (
    <>
      <Routes>
        <Route 
          path="/watchlist" 
          element={
            <WatchList 
              watchList={watchList} 
              setWatchList={setWatchList} 
              onCardClick={setSelectedMovie} 
        />}/>
        <Route path="/" element={
          <>
            <Header setState={setState}/>
            <SearchBar setSearchTerm={setSearchTerm} setCurrentPage={setCurrentPage} />
            {state === 'loading' && 
              <div className="flex-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-black-600"></div>
              </div>
            }
            {state === 'success' &&
              <>
                <MovieGrid
                  searchTerm={searchTerm} 
                  movies={movies} 
                  watchList={watchList} 
                  setWatchList={setWatchList} 
                  onCardClick={setSelectedMovie}
                />
                <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalResults={totalResults}/>
              </>
            }
            {state === 'error' &&
              <>
                <p className='failed'>No movies found for "{searchTerm}".</p>
                <p className='opacity-50 -mt-1'>Please try a different keyword.</p>
              </>
            }
          </>
        } />
      </Routes>
      {selectedMovie && (
        <MovieDetailsModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          watchList={watchList}
          setWatchList={setWatchList}
        />
      )}
    </>
  )
}

export default App