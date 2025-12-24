import { useState } from 'react'
import { Link } from 'react-router'

import Pagination from '../components/Pagination'
import MovieCard from '/src/components/MovieCard'

export default function WatchList(props) {
    const [currentPage, setCurrentPage] = useState(1)

    const movieElements = props.watchList.map((movie) => {
        return (
            <MovieCard 
                key={movie.id} 
                id={movie.id} 
                title={movie.title} 
                year={movie.year} 
                poster={movie.poster}
                watchList={props.watchList}
                setWatchList={props.setWatchList}
            />
        )
    })

    return (
        <>
            <nav className='flex-center gap-3.5 p-2'>
                <Link to="/">
                    <button className='watchlist-btn-main'><i className="bi bi-arrow-return-left"></i> Home</button>
                </Link>
                <h1>My Watch List</h1>
            </nav>
            <section className="movie-grid">{movieElements.slice((currentPage - 1) * 10, ((currentPage - 1) * 10) + 10)}</section>
            {props.watchList.length > 10 &&
                <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalResults={props.watchList.length}/>
            }
        </>
    )
}