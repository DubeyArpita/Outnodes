import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Categories from "./pages/categories";
import UserDashboard from "./pages/user";
import ListYourPlace from "./pages/owner";
import AdminDashboard from "./pages/admin";
// import ManageUsers from "./pages/ManageUsers";
import ProtectedRoute from "./components/ProtectedRoute";
import Signup from "./pages/signup";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={["node"]} />}>
          <Route path="/categories" element={<Categories />} />
          <Route path="/user" element={<UserDashboard />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["owner"]} />}>
          <Route path="/owner" element={<ListYourPlace />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminDashboard />} />
          {/* <Route path="/manage-users" element={<ManageUsers />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
