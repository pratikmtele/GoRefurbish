import { Route, Routes } from "react-router-dom";
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

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/list-product" element={<ProductListing />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/edit-product/:id" element={<ProductEdit />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
