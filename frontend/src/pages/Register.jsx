import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext"; // import AuthContext

const Login = () => {
  const [rollno, setRollno] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true); // state to toggle between login and signup
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext); // use setIsAuthenticated from AuthContext

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        isLogin
          ? "http://localhost:5555/login"
          : "http://localhost:5555/signup",
        {
          rollno,
          password,
        }
      );
      if (res.data.success) {
        // check if login/signup was successful
        localStorage.setItem("token", res.data.token);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.token}`;
        setIsAuthenticated(true); // set isAuthenticated to true
        navigate("/books");
        console.log("successfully login"); // redirect to /books after successful login/signup
      } else {
        console.log(res.data.message); // log the error message from the server
      }
    } catch (err) {
      console.error(err);
      if (!isLogin) {
        navigate("/signup"); // redirect to signup page if signup fails
      }
    }
  };

  // rest of the code...
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
        <input
          type="text"
          value={rollno}
          onChange={(e) => setRollno(e.target.value)}
          placeholder="Roll No"
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 mb-3 border rounded"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="w-full p-2 mt-4 bg-gray-200 rounded"
        >
          Switch to {isLogin ? "Sign Up" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
