import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Spinner = () => {
  return (
    <div className='spinner'>
      <Loader
        type="MutatingDots"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={20000} // 20 seconds 
      />
    </div>
  )
}

export default Spinner;
