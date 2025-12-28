import { useEffect, useState } from 'react'

export default function MovieDetailsModal({ movie, onClose, watchList, setWatchList }) {
    const [details, setDetails] = useState(null)
    const [loading, setLoading] = useState(true)

    const isWatchListed = watchList.some(m => m.id === movie.id)

    useEffect(() => {
        async function fetchDetails() {
            try {
                const response = await fetch(
                    `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_omdb_apiKey}&i=${movie.id.slice(0, -1)}`
                )
                const data = await response.json()
                
                if (data.Response === "False") {
                    throw new Error(data.Error)
                }
                
                setDetails(data)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching details:', error)
                setLoading(false)
            }
        }
        fetchDetails()
    }, [movie.id])

    function toggleWatchlist() {
        if (isWatchListed) {
            setWatchList(prev => prev.filter(m => m.id !== movie.id))
        } else {
            setWatchList(prev => [...prev, movie])
        }
    }

    useEffect(() => {
        function handleEscape(e) {
            if (e.key === 'Escape') {
                onClose()
            }
        }
        window.addEventListener('keydown', handleEscape)
        return () => window.removeEventListener('keydown', handleEscape)
    }, [onClose])

    return (
        <div className="modal-overlay" onClick={onClose}>
          <p className='close-msg'>-- Press anywhere else to close --</p>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>

            {loading ? (
                    <div className="flex-center py-20">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-black-600"></div>
                    </div>
                ) : details ? (
                    <div className="modal-body">
                        <img
                            src={details.Poster !== 'N/A' ? details.Poster : '/src/assets/default.jpg'}
                            alt={details.Title}
                            className="modal-poster"
                        />
                        <div className="modal-info">
                            <h2 className="modal-title">{details.Title}</h2>
                            <p className="modal-year">{details.Year}</p>

                            <div className="modal-stats">
                                <div className="stat">
                                    <span className="stat-label">Rating</span>
                                    <span className="stat-value"><i className="bi bi-star-fill text-amber-400"></i> {details.imdbRating}/10</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-label">Runtime</span>
                                    <span className="stat-value">{details.Runtime}</span>
                                </div>
                            </div>

                            <div className="modal-section">
                                <strong>Genre:</strong> {details.Genre}
                            </div>

                            <div className="modal-section">
                                <strong>Director:</strong> {details.Director}
                            </div>

                            <div className="modal-section">
                                <strong>Cast:</strong> {details.Actors}
                            </div>

                            <div className="modal-section">
                                <strong>Plot:</strong>
                                <p className="modal-plot">{details.Plot}</p>
                            </div>

                            <button
                                onClick={toggleWatchlist}
                                className={`modal-watchlist-btn ${isWatchListed ? 'in-list' : ''}`}
                            >
                                {isWatchListed ? 
                                    <><i className="bi bi-check-lg"></i> In Watchlist</> : 
                                    <><i className="bi bi-plus-lg"></i> Add to Watchlist</>
                                }
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="modal-error">
                        <p>Failed to load movie details</p>
                        <button onClick={onClose}>Close</button>
                    </div>
                )}
            {/* <div className="modal-details">
                <h2 className="text-xl font-bold">{selectedMovie.title}</h2>
                <p>Year: {selectedMovie.year}</p>
            </div>
            <img src={selectedMovie.poster !== 'N/A' ? selectedMovie.poster : '/src/assets/default.jpg'} alt={selectedMovie.title} className='movie-poster' /> */}
          </div>
        </div>
    )
}