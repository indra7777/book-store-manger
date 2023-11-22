// import React, { useState } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Link,
//   Navigate,
// } from "react-router-dom";
// import axios from "axios";
// import AuthRoute from "./components/AuthRoute"; // Import the AuthRoute component

// import Home from "./pages/Home";
// import DeleteBook from "./pages/DeleteBook";
// import CreateBook from "./pages/CreateBook";
// import EditBook from "./pages/EditBook";
// import ShowBook from "./pages/ShowBook";

// import "tailwindcss/tailwind.css"; // Import the Tailwind CSS styles

// function App() {
//   const [rollno, setRollno] = useState("");
//   const [password, setPassword] = useState("");
//   const [token, setToken] = useState("");

//   const handleSignup = async () => {
//     try {
//       await axios.post("http://localhost:5000/api/signup", {
//         rollno,
//         password,
//       });
//       alert("User created successfully");
//     } catch (error) {
//       alert("Error creating user");
//     }
//   };

//   const handleLogin = async () => {
//     try {
//       const response = await axios.post("http://localhost:5000/api/login", {
//         rollno,
//         password,
//       });
//       setToken(response.data.token);
//     } catch (error) {
//       alert("Invalid credentials");
//     }
//   };

//   const isAuthenticated = !!token;

//   return (
//     <Router>
//       {/* Ensure BrowserRouter is the top-level component */}
//       <div className="container mx-auto p-4">
//         <nav className="mb-4">
//           <ul className="flex">
//             <li className="mr-2">
//               <Link to="/" className="text-blue-500 hover:underline">
//                 Home
//               </Link>
//             </li>
//           </ul>
//         </nav>

//         <Routes>
//           {/* Use AuthRoute for protected routes */}
//           <AuthRoute
//             path="/books/create"
//             element={<CreateBook />}
//             isAuthenticated={isAuthenticated}
//             redirectTo="/"
//           />
//           <AuthRoute
//             path="/books/details/:id"
//             element={<ShowBook />}
//             isAuthenticated={isAuthenticated}
//             redirectTo="/"
//           />
//           <AuthRoute
//             path="/books/edit/:id"
//             element={<EditBook />}
//             isAuthenticated={isAuthenticated}
//             redirectTo="/"
//           />
//           <AuthRoute
//             path="/books/delete/:id"
//             element={<DeleteBook />}
//             isAuthenticated={isAuthenticated}
//             redirectTo="/"
//           />

//           <Route path="/" element={<Home />} />

//           {/* Login and Signup routes */}
//           <Route
//             path="/login"
//             element={
//               isAuthenticated ? (
//                 <Navigate to="/" replace={true} />
//               ) : (
//                 <div>
//                   <h2 className="text-2xl font-bold mb-2">Login</h2>
//                   <input
//                     type="text"
//                     placeholder="Rollno"
//                     className="border rounded p-2 mr-2"
//                     onChange={(e) => setRollno(e.target.value)}
//                   />
//                   <input
//                     type="password"
//                     placeholder="Password"
//                     className="border rounded p-2 mr-2"
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                   <button
//                     onClick={handleLogin}
//                     className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
//                   >
//                     Login
//                   </button>
//                 </div>
//               )
//             }
//           />
//           <Route
//             path="/signup"
//             element={
//               isAuthenticated ? (
//                 <Navigate to="/" replace={true} />
//               ) : (
//                 <div>
//                   <h2 className="text-2xl font-bold mb-2">Signup</h2>
//                   <input
//                     type="text"
//                     placeholder="Rollno"
//                     className="border rounded p-2 mr-2"
//                     onChange={(e) => setRollno(e.target.value)}
//                   />
//                   <input
//                     type="password"
//                     placeholder="Password"
//                     className="border rounded p-2 mr-2"
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                   <button
//                     onClick={handleSignup}
//                     className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
//                   >
//                     Signup
//                   </button>
//                 </div>
//               )
//             }
//           />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DeleteBook from "./pages/DeleteBook";
import CreateBook from "./pages/CreateBook";
import EditBook from "./pages/EditBook";
import ShowBook from "./pages/ShowBook";
import HomeSearch from "./pages/HomeSearch";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/books" element={<HomeSearch />} />
      <Route path="/books/create" element={<CreateBook />} />
      <Route path="/books/details/:id" element={<ShowBook />} />
      <Route path="/books/edit/:id" element={<EditBook />} />
      <Route path="/books/delete/:id" element={<DeleteBook />} />
    </Routes>
  );
}

export default App;
