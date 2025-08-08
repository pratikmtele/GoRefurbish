import { Route, Routes, Navigate } from "react-router-dom";
import {
  Homepage,
  About,
  HowItWorks,
  ProductListing,
  ProductEdit,
  ProductDetails,
  Browse,
  Signup,
  Signin,
  ForgotPassword,
  Profile,
  OTPVerification,
  ResetPassword,
} from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import useAuth from "./stores/useAuthStore.jsx";
import { Footer, Header } from "./components/index.js";

const App = () => {
  const { checkAuth, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

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
        <Route
          path="/forgot-password"
          element={!isAuthenticated ? <ForgotPassword /> : <Navigate to="/" />}
        />
        <Route
          path="/otp"
          element={!isAuthenticated ? <OTPVerification /> : <Navigate to="/" />}
        />
        <Route
          path="/reset-password"
          element={!isAuthenticated ? <ResetPassword /> : <Navigate to="/" />}
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
          path="/profile"
          element={isAuthenticated ? <Profile /> : <Navigate to="/signin" />}
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
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
