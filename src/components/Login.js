import Card from "./Card";
import { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Login = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 1. kolla både email och password i databasen så att det stämmer
  // 2. Logga ut värdet för att dubbellkolla så det blir rätt
  // 3. Om det blir rätt returnera user
  const checkUser = (users) => {
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    console.log(user);
    if (user.email === email && user.password === password) return user;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    // kolla om det finns en user med samma epost
    // vi behöver skriva en funktion för att göra en check

    if (email === "" || password === "") {
      // kollar om email eller password fältet är tomt
      alert("All fields are required!");
      return;
    }

    try {
      const user = await axios
      .get("http://localhost:6001/users")
      .then((res) => checkUser(res.data, email, password));
      
      if(user.email === email && user.password === password) {
        alert("Success!");
        navigate("/");
        localStorage.setItem("user", JSON.stringify(user.id));
      } else {
        alert("Not a valid user!");
      } 
    } catch (error) {
      alert("An error occurred. Please try again.");
    }

  
    setEmail("");
    setPassword("");
  };

  return (
    <div className="container">
            <Card>
                <form className="form-container">
                    <h1>Login</h1>
                    <label>
                        <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </label>
                    <label>
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <button className="btn" type="submit" onClick={(handleSubmit)}>
                        <p>Login</p>
                    </button>
                </form>
            </Card>
        </div>
  );
};

export default Login;