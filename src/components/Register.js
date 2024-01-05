import Card from "./Card";
import { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Register = () => {
    
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const checkEmail = (users) => {
        const user = users.find((user) => user.email === email);
        if(user) return user;
    };

    const handleSubmit = async () => {
        
        
        const user = await axios
        .get("http://localhost:6001/users")
        .then((res) => checkEmail(res.data, email));
        
        if(email === "" || password === "") {
            alert("All fields are required!");
        } else if(user) {
            alert("User already exists!");
        } else {
            const user = {username, email, password};
            axios.post("http://localhost:6001/users", user)
            .then(() => {
                alert("User created!");
                navigate("/login");
            });          

        }
    };

    return (
        <div className="container">
            <Card>
                <form className="form-container">
                    <h1>Register User</h1>
                    <label>
                        <input type="text" placeholder="Name" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </label>
                    <label>
                        <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </label>
                    <label>
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <button className="btn"type="submit" onClick={(handleSubmit)}>
                        <p>Register</p>
                    </button>
                </form>
            </Card>
        </div>
    );
        
    
};

export default Register;