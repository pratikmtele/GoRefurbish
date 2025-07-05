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
import {ToastContainer} from "react-toastify";
import { useEffect } from "react";
import useAuth from "./stores/useAuthStore.jsx";

const App = () => {

  const checkAuth = useAuth((state) => state.checkAuth);
  const isAuthenticated = useAuth((state) => state.isAuthenticated);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div>
      <Header />
      <ToastContainer
        className="toast-container"
        toastClassName="toast"
        bodyClassName="toast-body"
        progressClassName="toast-progress"
        closeButton={false}
        draggable={true}
        pauseOnHover={true}
        theme="colored"
        limit={3}
        transition="slide"
        draggablePercent={60}
        closeOnClick={true}
        rtl={false} 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        pauseOnFocusLoss={false}  
      />
      <Routes>
        <Route path="/signup" element={<Signup />  } />
        <Route path="/signin" element={ <Signin /> } />
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/list-product" element={<ProductListing />  } />
        <Route path="/browse" element={<Browse /> } />
        <Route path="/edit-product/:id" element={<ProductEdit /> } />
        <Route path="/product/:id" element={<ProductDetails />  } />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
