import { useEffect, useState } from "react";
import FeaturedImage from "../assets/FeaturedImage.jpg";
import { ProductCard, CategoryCard, Button } from "../components/index";
import useProducts from "../stores/useProductStore";

const Homepage = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const { allProducts, products, loading } = useProducts();

  const categories = [
    {
      id: 1,
      title: "Electronics",
      itemCount: 1243,
      icon: "fa-laptop",
      bgColor: "bg-primary-50",
      iconBgColor: "bg-primary-100",
      iconColor: "text-primary-600",
    },
    {
      id: 2,
      title: "Furniture",
      itemCount: 876,
      icon: "fa-couch",
      bgColor: "bg-green-50",
      iconBgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      id: 3,
      title: "Fashion",
      itemCount: 2158,
      icon: "fa-tshirt",
      bgColor: "bg-purple-50",
      iconBgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      id: 4,
      title: "Books",
      itemCount: 1547,
      icon: "fa-book",
      bgColor: "bg-yellow-50",
      iconBgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      id: 5,
      title: "Home & Garden",
      itemCount: 932,
      icon: "fa-home",
      bgColor: "bg-red-50",
      iconBgColor: "bg-red-100",
      iconColor: "text-red-600",
    },
    {
      id: 6,
      title: "Sports",
      itemCount: 754,
      icon: "fa-bicycle",
      bgColor: "bg-indigo-50",
      iconBgColor: "bg-indigo-100",
      iconColor: "text-indigo-600",
    },
    {
      id: 7,
      title: "Toys & Games",
      itemCount: 1089,
      icon: "fa-gamepad",
      bgColor: "bg-pink-50",
      iconBgColor: "bg-pink-100",
      iconColor: "text-pink-600",
    },
    {
      id: 8,
      title: "More Categories",
      itemCount: 5000,
      icon: "fa-ellipsis-h",
      bgColor: "bg-gray-50",
      iconBgColor: "bg-gray-100",
      iconColor: "text-gray-600",
    },
  ];

  const featuredItems = [...products];
  useEffect(() => {
    allProducts();
  }, []);

  const handleFavoriteClick = (itemId) => {};

  const handleCategoryClick = (categoryId, categoryTitle) => {};

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      image:
        "https://readdy.ai/api/search-image?query=A%20professional%20portrait%20of%20a%20young%20woman%20with%20shoulder-length%20brown%20hair%20and%20a%20warm%20smile%20against%20a%20neutral%20light%20background%2C%20looking%20confident%20and%20approachable%2C%20high%20quality%20professional%20headshot%20with%20soft%20natural%20lighting%20and%20shallow%20depth%20of%20field&width=60&height=60&seq=10&orientation=squarish",
      rating: 5,
      text: "I found exactly what I needed for my new apartment at half the retail price. The seller was responsive and the transaction was smooth.",
      item: "Mid-century coffee table",
    },
    {
      id: 2,
      name: "Michael Chen",
      image:
        "https://readdy.ai/api/search-image?query=A%20professional%20portrait%20of%20an%20Asian%20man%20in%20his%2030s%20with%20short%20black%20hair%20and%20glasses%20against%20a%20neutral%20light%20background%2C%20smiling%20confidently%20at%20camera%2C%20high%20quality%20professional%20headshot%20with%20soft%20natural%20lighting%20and%20shallow%20depth%20of%20field&width=60&height=60&seq=11&orientation=squarish",
      rating: 4,
      text: "ReUsed helped me declutter my home while making some extra cash. The platform is intuitive and listing items takes minutes.",
      item: "Gaming console",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      image:
        "https://readdy.ai/api/search-image?query=A%20professional%20portrait%20of%20a%20latina%20woman%20with%20long%20dark%20hair%20and%20a%20bright%20smile%20against%20a%20neutral%20light%20background%2C%20looking%20friendly%20and%20professional%2C%20high%20quality%20headshot%20with%20soft%20natural%20lighting%20and%20shallow%20depth%20of%20field&width=60&height=60&seq=12&orientation=squarish",
      rating: 5,
      text: "As a college student on a budget, GoRefurbish has been a lifesaver. I furnished my entire dorm room for less than ₹15,000!",
      item: "Desk lamp and bookshelf",
    },
  ];
  const nextTestimonial = () => {
    setActiveTestimonial((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };
  const prevTestimonial = () => {
    setActiveTestimonial((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent z-0">
            <img
              src={FeaturedImage}
              alt="Marketplace Items"
              className="w-full h-full object-cover object-top opacity-90"
            />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Give Items a Second Life
                </h1>
                <p className="text-lg text-gray-700 mb-8">
                  Join thousands of Customers giving pre-loved items a new
                  purpose. Earn money while making a positive environmental
                  impact.
                </p>
                <Button
                  variant="success"
                  size="lg"
                  icon="fas fa-tag"
                  iconPosition="left"
                >
                  Start Selling
                </Button>
              </div>
              <div className="hidden md:block">
                {/* This div is intentionally left empty as the background image handles the visual */}
              </div>
            </div>
          </div>
        </section>
        {/* Featured Categories */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Browse Popular Categories
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Find exactly what you're looking for in our diverse selection of
                pre-loved items.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  title={category.title}
                  itemCount={category.itemCount}
                  icon={category.icon}
                  bgColor={category.bgColor}
                  iconBgColor={category.iconBgColor}
                  iconColor={category.iconColor}
                  onClick={() =>
                    handleCategoryClick(category.id, category.title)
                  }
                />
              ))}
            </div>
          </div>
        </section>
        {/* Featured Listings */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Featured Items
                </h2>
                <p className="text-lg text-gray-600">
                  Handpicked quality items at great prices
                </p>
              </div>
              {featuredItems.length > 0 ? (
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-800 font-medium flex items-center cursor-pointer"
                >
                  View all <i className="fas fa-arrow-right ml-2"></i>
                </a>
              ) : null}
            </div>
            {featuredItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredItems.map((item) => (
                  <ProductCard
                    key={item._id}
                    title={item.title}
                    description={item.description}
                    price={item.price}
                    postedDate={new Date(item.createdAt).toLocaleDateString(
                      "en-GB",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                    imageUrl={item.featuredImage}
                    imageAlt={item.title}
                    isNegotible={item.isNegotible}
                    isApproved={item.isApproved}
                    onFavoriteClick={() => handleFavoriteClick(item._id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center text-xl">
                <h1>No Products found</h1>
              </div>
            )}
          </div>
        </section>
        {/* What We Offer */}
        <section className="py-16 bg-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                What We Offer
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover the benefits of using GoRefurbish for all your
                pre-loved item needs.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg p-8 text-center shadow-md">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <i className="fas fa-shield-alt text-blue-600 text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Secure Platform
                </h3>
                <h4 className="text-lg font-medium text-gray-700 mb-3">
                  Safe Transactions
                </h4>
                <p className="text-gray-600">
                  All transactions are protected with advanced security measures
                  and buyer protection policies.
                </p>
              </div>
              <div className="bg-white rounded-lg p-8 text-center shadow-md">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <i className="fas fa-dollar-sign text-green-600 text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Best Prices
                </h3>
                <h4 className="text-lg font-medium text-gray-700 mb-3">
                  Competitive Rates
                </h4>
                <p className="text-gray-600">
                  Find amazing deals on quality items at prices that won't break
                  the bank.
                </p>
              </div>
              <div className="bg-white rounded-lg p-8 text-center shadow-md">
                <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                  <i className="fas fa-users text-purple-600 text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Community
                </h3>
                <h4 className="text-lg font-medium text-gray-700 mb-3">
                  Trusted Network
                </h4>
                <p className="text-gray-600">
                  Join a community of verified sellers and buyers who value
                  quality and trust.
                </p>
              </div>
            </div>
            <div className="mt-12 text-center">
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Experience the difference with our user-friendly platform,
                dedicated support team, and commitment to quality.
              </p>
            </div>
          </div>
        </section>
        {/* How It Works */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                How GoRefurbish Works
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Start selling your pre-loved items in just three simple steps.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="relative">
                  <div className="w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-blue-600">1</span>
                  </div>
                  <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-blue-100 -z-10 transform -translate-x-10"></div>
                </div>
                <div className="w-16 h-16 mx-auto mb-4 text-blue-600">
                  <i className="fas fa-user-check text-5xl"></i>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">
                  Complete KYC Verification
                </h3>
                <p className="text-gray-600 mb-4">
                  Verify your identity through our secure KYC process to ensure
                  genuine sellers and build trust in our community.
                </p>
              </div>
              <div className="text-center">
                <div className="relative">
                  <div className="w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-blue-600">2</span>
                  </div>
                  <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-blue-100 -z-10 transform -translate-x-10"></div>
                </div>
                <div className="w-16 h-16 mx-auto mb-4 text-blue-600">
                  <i className="fas fa-plus-circle text-5xl"></i>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">
                  List Your Products
                </h3>
                <p className="text-gray-600 mb-4">
                  Upload photos and details of your items. Our easy-to-use
                  interface makes listing products quick and straightforward.
                </p>
              </div>
              <div className="text-center">
                <div className="relative">
                  <div className="w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-blue-600">3</span>
                  </div>
                </div>
                <div className="w-16 h-16 mx-auto mb-4 text-blue-600">
                  <i className="fas fa-credit-card text-5xl"></i>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">
                  Get Paid After Approval
                </h3>
                <p className="text-gray-600 mb-4">
                  Once your listing is approved and sold, receive secure payment
                  directly to your account through our trusted payment system.
                </p>
              </div>
            </div>
            <div className="mt-12 text-center">
              <Button variant="primary" size="lg">
                Start Selling Now
              </Button>
            </div>
          </div>
        </section>
        {/* Testimonials */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                What Our Community Says
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Join thousands of satisfied buyers and sellers.
              </p>
            </div>
            <div className="relative">
              <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <div className="flex items-center mb-6">
                    <img
                      src={testimonials[activeTestimonial].image}
                      alt={testimonials[activeTestimonial].name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {testimonials[activeTestimonial].name}
                      </h3>
                      <div className="flex text-yellow-400 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            className={`fas ${
                              i < testimonials[activeTestimonial].rating
                                ? "fa-star"
                                : "far fa-star"
                            }`}
                          ></i>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-lg italic mb-4">
                    "{testimonials[activeTestimonial].text}"
                  </p>
                  <p className="text-sm text-gray-500">
                    Purchased: {testimonials[activeTestimonial].item}
                  </p>
                </div>
              </div>
              <button
                onClick={prevTestimonial}
                className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-0 md:-translate-x-6 bg-white rounded-full p-3 shadow-md hover:bg-gray-100 focus:outline-none cursor-pointer"
              >
                <i className="fas fa-chevron-left text-gray-600"></i>
              </button>
              <button
                onClick={nextTestimonial}
                className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-0 md:translate-x-6 bg-white rounded-full p-3 shadow-md hover:bg-gray-100 focus:outline-none cursor-pointer"
              >
                <i className="fas fa-chevron-right text-gray-600"></i>
              </button>
              <div className="flex justify-center mt-6 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full ${
                      activeTestimonial === index
                        ? "bg-blue-600"
                        : "bg-gray-300"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        </section>
        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Join Our Community Today
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Start buying and selling pre-loved items. Save money and help the
              planet.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button
                variant="success"
                size="lg"
                icon="fas fa-tag"
                iconPosition="left"
              >
                Start Selling
              </Button>
              <Button
                variant="outline"
                size="lg"
                icon="fas fa-search"
                iconPosition="left"
                className="bg-white text-blue-700 border-blue-700 hover:bg-blue-50"
              >
                Browse Items
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
export default Homepage;
