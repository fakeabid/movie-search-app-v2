export default function MovieCard(props) {
    return (
        <>
            <div className="card">
                <img src={props.poster !== 'N/A' ? props.poster : '/src/assets/default.jpg'} alt={'Poster of '+props.title} />
                <h5>{props.title} ({props.year})</h5>
            </div>
        </>
    )
}