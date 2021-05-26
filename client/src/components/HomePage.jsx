import "../css/Homepage.css";
import Footer from "./Footer";
const HomePage = () => {
    return (
        <div className='homepage-container'>
            <div className='homepage-text'>
                <h1>Hi {localStorage.getItem('name')} Welcome to PasteCreate!</h1>
            </div>
            <div className='homepage-text'>
                <h2>A free paste storing service</h2>
            </div>
            <Footer />
        </div>
    )
};

export default HomePage;