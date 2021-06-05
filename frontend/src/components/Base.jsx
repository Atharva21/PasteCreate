import NavBar from "./Navbar";
import { LoadingProvider } from "./context/LoadingContext.js";
import { ThemeProvider } from "./context/ThemeContext";

const Base = () => {
    return (
        <LoadingProvider>
            <ThemeProvider>
            <NavBar />
            </ThemeProvider>
        </LoadingProvider>
    )
};

export default Base;