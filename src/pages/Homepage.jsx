import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/CategoryCard";
import Button from "../components/Button";
import FeaturedImage from "../assets/FeaturedImage.jpg";

const Homepage = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

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

  const featuredItems = [
    {
      id: 1,
      title: "Mid-century Coffee Table",
      price: 6500,
      location: "Mumbai, MH",
      postedDate: "2 days ago",
      status: "Approved",
      imageUrl:
        "https://readdy.ai/api/search-image?query=A%20professional%20product%20photo%20of%20a%20modern%20mid-century%20style%20wooden%20coffee%20table%20with%20hairpin%20legs%20against%20a%20simple%20white%20background%2C%20showing%20the%20item%20from%20a%20slight%20angle%20to%20display%20its%20features%2C%20high%20quality%20e-commerce%20style%20product%20photography%20with%20soft%20shadows&width=400&height=300&seq=3&orientation=landscape",
      imageAlt: "Mid-century Coffee Table",
    },
    {
      id: 2,
      title: "PlayStation 5 Console",
      price: 32000,
      location: "Delhi, DL",
      postedDate: "1 week ago",
      status: "Pending",
      imageUrl:
        "https://readdy.ai/api/search-image?query=A%20professional%20product%20photo%20of%20a%20black%20Sony%20PlayStation%205%20gaming%20console%20with%20controller%20against%20a%20simple%20white%20background%2C%20showing%20the%20item%20from%20a%20slight%20angle%20to%20display%20its%20features%2C%20high%20quality%20e-commerce%20style%20product%20photography%20with%20soft%20shadows&width=400&height=300&seq=4&orientation=landscape",
      imageAlt: "PlayStation 5 Console",
    },
    {
      id: 3,
      title: "Vintage Leather Messenger Bag",
      price: 4500,
      location: "Bangalore, KA",
      postedDate: "3 days ago",
      status: "Approved",
      imageUrl:
        "https://readdy.ai/api/search-image?query=A%20professional%20product%20photo%20of%20a%20vintage%20leather%20messenger%20bag%20or%20satchel%20against%20a%20simple%20white%20background%2C%20showing%20the%20item%20from%20a%20slight%20angle%20to%20display%20its%20features%20and%20texture%2C%20high%20quality%20e-commerce%20style%20product%20photography%20with%20soft%20shadows&width=400&height=300&seq=5&orientation=landscape",
      imageAlt: "Vintage Leather Messenger Bag",
    },
    {
      id: 4,
      title: "Modern Table Lamp",
      price: 2800,
      location: "Pune, MH",
      postedDate: "5 days ago",
      status: "Pending",
      imageUrl:
        "https://readdy.ai/api/search-image?query=A%20professional%20product%20photo%20of%20a%20modern%20white%20ceramic%20table%20lamp%20with%20a%20fabric%20shade%20against%20a%20simple%20white%20background%2C%20showing%20the%20item%20from%20a%20slight%20angle%20to%20display%20its%20features%2C%20high%20quality%20e-commerce%20style%20product%20photography%20with%20soft%20shadows&width=400&height=300&seq=6&orientation=landscape",
      imageAlt: "Modern Table Lamp",
    },
    {
      id: 5,
      title: "Vintage Vinyl Record Player",
      price: 8500,
      location: "Chennai, TN",
      postedDate: "1 day ago",
      status: "Approved",
      imageUrl:
        "https://readdy.ai/api/search-image?query=A%20professional%20product%20photo%20of%20a%20vintage%20vinyl%20record%20player%20or%20turntable%20against%20a%20simple%20white%20background%2C%20showing%20the%20item%20from%20a%20slight%20angle%20to%20display%20its%20features%2C%20high%20quality%20e-commerce%20style%20product%20photography%20with%20soft%20shadows&width=400&height=300&seq=7&orientation=landscape",
      imageAlt: "Vintage Vinyl Record Player",
    },
    {
      id: 6,
      title: "Classic Literature Collection",
      price: 1500,
      location: "Kolkata, WB",
      postedDate: "4 days ago",
      status: "Pending",
      imageUrl:
        "https://readdy.ai/api/search-image?query=A%20professional%20product%20photo%20of%20a%20set%20of%20hardcover%20classic%20novels%20or%20books%20against%20a%20simple%20white%20background%2C%20showing%20the%20items%20arranged%20in%20a%20small%20stack%20to%20display%20their%20spines%20and%20covers%2C%20high%20quality%20e-commerce%20style%20product%20photography%20with%20soft%20shadows&width=400&height=300&seq=8&orientation=landscape",
      imageAlt: "Classic Literature Collection",
    },
  ];

  const handleFavoriteClick = (itemId) => {
    console.log("Favorite clicked for item:", itemId);
    // Add your favorite handling logic here
  };

  const handleCategoryClick = (categoryId, categoryTitle) => {
    console.log("Category clicked:", categoryTitle);
    // Add your category navigation logic here
  };

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
              <a
                href="#"
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center cursor-pointer"
              >
                View all <i className="fas fa-arrow-right ml-2"></i>
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredItems.map((item) => (
                <ProductCard
                  key={item.id}
                  title={item.title}
                  price={item.price}
                  location={item.location}
                  postedDate={item.postedDate}
                  imageUrl={item.imageUrl}
                  imageAlt={item.imageAlt}
                  status={item.status}
                  onFavoriteClick={() => handleFavoriteClick(item.id)}
                />
              ))}
            </div>
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
