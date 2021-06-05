import styles from "../css/Homepage.module.css";
import Footer from "./Footer";
const HomePage = () => {
    return (
        <div className={styles.homepageContainer}>
            <div className={styles.homepageText}>
                <h1>Hi Welcome to PasteCreate!</h1>
            </div>
            <div className={styles.homepageText}>
                <h2>A free paste storing service</h2>
            </div>
            <Footer />
        </div>
    )
};

export default HomePage;