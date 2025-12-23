export default function Header(props) {
    return (
        <>
            <h1 id='logo' style={{fontFamily: 'aboreto'}} onClick={() => props.setState('idle')}>movie archive</h1>
        </>
    )
}