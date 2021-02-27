import "../css/Homepage.css";
const HomePage = () => {
    return (
        <div className='homepage-container'>
            <div className='homepage-text'>
                <h1>Hi {localStorage.getItem('name')} Welcome to PasteCrate!</h1>
            </div>
            <div className='homepage-text'>
                <h2>A free paste storing service</h2>
            </div>
        </div>
    )
};

export default HomePage;