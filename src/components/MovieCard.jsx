export default function MovieCard(props) {
    const isWatchListed = props.watchList.some(movie => movie.id === props.id)

    console.log('Current watchList:', props.watchList)
    console.log('Current movie ID:', props.id)
    console.log('Is watchlisted:', isWatchListed)

    function editWatchList(movieId) {
        if (isWatchListed) {
            props.setWatchList((prev) => {
                return prev.filter((movie) => movie.id !== movieId)
            })
        }
        else {
            props.setWatchList((prev) => {
                return [
                    ...prev,
                    {
                        id: props.id,
                        title: props.title,
                        year: props.year,
                        poster: props.poster
                    }
                ]
            })
        }
    }

    return (
        <>
            <div className="card">
                <button className="watchlist-btn" onClick={() => editWatchList(props.id)} aria-label={isWatchListed ? "Remove from watchlist" : "Add to watchlist"}>
                    {isWatchListed ? <i className="bi bi-check-lg"></i> : <i className="bi bi-plus-lg"></i>}
                </button>
                <img src={props.poster !== 'N/A' ? props.poster : '/src/assets/default.jpg'} alt={'Poster of '+props.title} />
                <h5>{props.title} ({props.year})</h5>
            </div>
        </>
    )
}