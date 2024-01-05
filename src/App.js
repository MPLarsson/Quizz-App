import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Message from "./components/Message";
import Card from "./components/Card";
import Register from "./components/Register";
import Login from "./components/Login";
import About from "./components/About";
import QuizDetails from "./components/QuizDetails";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path="/quizDetails" element={<QuizDetails />} /> */}
        <Route
          path="/user"
          element={
            <PrivateRoute><QuizDetails /></PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
