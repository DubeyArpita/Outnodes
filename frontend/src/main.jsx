import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./components/AuthLayout.jsx";
import Home from "./pages/Home.jsx";
import Discover from "./pages/Discover.jsx";
import Favorites from "./pages/Favorites.jsx";
import SubmitPlace from "./pages/SubmitPlace.jsx";
import Profile from "./pages/Profile.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import NotFound from "./pages/NotFound.jsx";
import PlacePage from "./pages/Place.jsx";
import YourPlacesPage from "./pages/YourPlaces.jsx";
import ThemePage from "./pages/ThemePage.jsx";
import AllPlacesAdmin from "./pages/AllPlacesAdmin.jsx";
import Pricing from "./pages/Pricing.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Your base layout with Header/Footer
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/discover",
        element: (
          //<Discover />
          <AuthLayout authentication={true} role="explorer">
            <Discover />
          </AuthLayout>
        ),
      },
      {
        path: "/favorites",
        element: (
          <AuthLayout authentication={true} role="explorer">
            <Favorites />
          </AuthLayout>
        ),
      },
      {
        path: "/submit-place",
        element: (
          <AuthLayout authentication={true} role={["admin", "business"]}>
            <SubmitPlace />
          </AuthLayout>
        ),
      },
      {
        path: "/places/:id",
        element: <PlacePage />,
      },
      {
        path: "/food",
        element: <ThemePage theme="Food Outlet" />,
      },
      {
        path: "/monument-nature",
        element: <ThemePage theme="Monuments & Nature" />,
      },
      {
        path: "/club-nightlife",
        element: <ThemePage theme="Club & Nightlife" />,
      },
      {
        path: "/gaming-entertainment",
        element: <ThemePage theme="Gaming & Entertainment" />,
      },
      {
        path: "/your-places",
        element: (
          <AuthLayout authentication={true} role="business">
            <YourPlacesPage />
          </AuthLayout>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <AuthLayout authentication={true} role="business">
            <Dashboard />
          </AuthLayout>
        ),
      },
      {
        path: "/pricing",
        element: (
          <AuthLayout authentication={true} role="business">
            <Pricing />
          </AuthLayout>
        ),
      },
      {
        path: "/profile",
        element: (
          <AuthLayout
            authentication={true}
            role={["explorer", "business", "admin"]}
          >
            <Profile />
          </AuthLayout>
        ),
      },
      {
        path: "/all-places-admin",
        element: (
          <AuthLayout
            authentication={true}
            role="admin"
            redirectPath="/all-places-admin"
          >
            <AllPlacesAdmin />
          </AuthLayout>
        ),
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/register",
        element: (
          <AuthLayout authentication={false}>
            <Register />
          </AuthLayout>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
// This code sets up the main entry point for a React application, integrating Redux for state management.
// It uses ReactDOM to render the App component wrapped in a Redux Provider, which makes the Redux store available to the entire app.
// The store is imported from a local file, allowing the app to access and manage global state, such as user authentication and roles.
