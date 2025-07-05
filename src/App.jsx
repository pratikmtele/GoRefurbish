import { Route, Routes, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import ProductListing from "./pages/ProductListing";
import ProductEdit from "./pages/ProductEdit";
import ProductDetails from "./pages/ProductDetails";
import Browse from "./pages/Browse";
import Signup from "./pages/Signup";
import Header from "./components/Header";
import Signin from "./pages/Signin";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import useAuth from "./stores/useAuthStore.jsx";

const App = () => {
  const { checkAuth, isAuthenticated } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [isAuthenticated]);

  return (
    <div>
      <Header />
      <ToastContainer
        autoClose={3000}
        theme="colored"
        position="top-right"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="toast-container"
      />
      <Routes>
        <Route
          path="/signup"
          element={!isAuthenticated ? <Signup /> : <Navigate to="/" />}
        />
        <Route
          path="/signin"
          element={!isAuthenticated ? <Signin /> : <Navigate to="/" />}
        />
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route
          path="/list-product"
          element={
            isAuthenticated ? <ProductListing /> : <Navigate to="/signin" />
          }
        />
        <Route
          path="/browse"
          element={isAuthenticated ? <Browse /> : <Navigate to="/signin" />}
        />
        <Route
          path="/edit-product/:id"
          element={
            isAuthenticated ? <ProductEdit /> : <Navigate to="/signin" />
          }
        />
        <Route
          path="/product/:id"
          element={
            isAuthenticated ? <ProductDetails /> : <Navigate to="/signin" />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
