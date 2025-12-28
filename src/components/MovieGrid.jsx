import MovieCard from './MovieCard'

export default function MovieGrid(props) {
    const movieElements = props.movies.map((movie, index) => {
        return (
            <MovieCard 
                key={movie.imdbID+index} 
                id={movie.imdbID+index} 
                title={movie.Title} 
                year={movie.Year} 
                poster={movie.Poster}
                watchList={props.watchList}
                setWatchList={props.setWatchList}
                onCardClick={props.onCardClick}
            />
        )
    })
    
    return (
        <>
            <p className='query-message'>Showing results for "{props.searchTerm}":</p>
            <section className="movie-grid">{movieElements}</section>
        </>
    )
}