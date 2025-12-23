export default function SearchBar(props) {
    function validateSearch(formData) {
        const search = formData.get('movie-query')
        if (search.trim() === "") {
            return
        }
        console.log(search)
        props.setSearchTerm(search.trim())
        props.setCurrentPage(1)
    }

    return (
        <>
            <form id='search-bar' action={validateSearch}>
                <input type="text" aria-label="movie name" name='movie-query' />
                <button type='submit' aria-label="search movie"><i className="bi bi-search"></i></button>
            </form>
        </>
    )
}