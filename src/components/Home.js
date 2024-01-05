import About from "./About";
import Button from "./Button";
import Footer from "./Footer";
import ReusableButton from "./ReusableButton";
import { Link } from "react-router-dom";


const Home = () => {
    return (
        <div className="container">
         <h1>Home Page</h1>
         <p>This is where you will start your quiz.</p>
        
         <Link to="/user"><ReusableButton>Start the Quiz</ReusableButton></Link>
        
         
         <Footer></Footer>
        </div>
    );
};

export default Home;