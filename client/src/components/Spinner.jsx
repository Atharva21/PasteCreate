import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Spinner = () => {
  return (
    <div className='spinner'>
      <Loader
        type="Hearts"
        color="#00BFFF"
        height={200}
        width={200}
        timeout={4000} //3 secs
      />
    </div>
  )
}

export default Spinner;
