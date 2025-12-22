export default function Pagination({ currentPage, setCurrentPage, totalResults }) {
    const totalPages = Math.ceil(totalResults / 10)

    return (
        <>
            <p className="pagination-info">Page {currentPage} of {totalPages}</p>
            <div className="pagination">
                <button 
                    className="prev" 
                    disabled={currentPage === 1} 
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                >
                    &lt;
                </button>
                <button
                    className="next"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                >
                    &gt;
                </button>
            </div>
        </>
    )
}