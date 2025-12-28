import { Link } from 'react-router'

export default function Header({ setState }) {
    return (
        <>
            <Link to="/">
                <h1 id='logo'
                    style={{fontFamily: 'aboreto'}}
                    onClick={() => {
                        setState('idle')
                    }}
                >
                    movie archive
                </h1>
            </Link>
            <Link to="/watchlist">
                <button className="watchlist-btn-main" aria-label='view wishlist'><i className="bi bi-list-check"></i></button>
            </Link>
        </>
    )
}