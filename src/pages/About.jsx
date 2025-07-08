import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            About GoRefurbish
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Transforming how people sell refurbished items while making a
            positive impact on the environment
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Our Mission */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Our Mission
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-600 mb-6">
                At GoRefurbish, we believe that every refurbished item deserves
                a second chance. Our platform connects sellers with buyers who
                value quality, sustainability, and great deals.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                We're building a community where selling refurbished items is
                not just profitable, but also contributes to a more sustainable
                future. Every transaction on our platform helps reduce waste and
                extends the lifecycle of valuable products.
              </p>
              <p className="text-lg text-gray-600">
                Join thousands of sellers who trust GoRefurbish to help them
                reach the right buyers and maximize their returns while making a
                positive environmental impact.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Why Choose GoRefurbish?
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                  <span className="text-gray-600">
                    Secure platform with buyer protection
                  </span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                  <span className="text-gray-600">
                    Best prices for quality refurbished items
                  </span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                  <span className="text-gray-600">
                    Verified seller community
                  </span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                  <span className="text-gray-600">
                    Environmental impact tracking
                  </span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                  <span className="text-gray-600">24/7 customer support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            How It Works for Sellers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <h1 className="text-blue-600 text-2xl">1</h1>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Complete KYC Verification
              </h3>
              <p className="text-gray-600">
                Quick and secure identity verification process to ensure a
                trusted marketplace for all users.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <h1 className="text-green-600 text-2xl">2</h1>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                List Your Products
              </h3>
              <p className="text-gray-600">
                Upload high-quality photos, detailed descriptions, and set
                competitive prices for your refurbished items.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <h1 className="text-purple-600 text-2xl">3</h1>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Get Paid After Approval
              </h3>
              <p className="text-gray-600">
                Once your item is sold and approved by the buyer, receive secure
                payments directly to your account.
              </p>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-shield-alt text-blue-600 text-3xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Trust
              </h3>
              <p className="text-gray-600">
                Building a secure and reliable platform where every transaction
                is protected.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-leaf text-green-600 text-3xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Sustainability
              </h3>
              <p className="text-gray-600">
                Promoting circular economy by giving products a second life and
                reducing waste.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-users text-purple-600 text-3xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Community
              </h3>
              <p className="text-gray-600">
                Creating a supportive community of sellers and buyers who share
                our values.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-lightbulb text-orange-600 text-3xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Innovation
              </h3>
              <p className="text-gray-600">
                Continuously improving our platform to better serve our sellers
                and buyers.
              </p>
            </div>
          </div>
        </div>
        {/* Call to Action */}
        <div className="bg-blue-600 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Selling?
          </h2>
          <p className="text-xl text-blue-100 mb-6">
            Join our community of successful sellers and start making a
            difference today.
          </p>
          <div className="space-x-0">
            <Link
              to="/signup"
              className="bg-white text-blue-600 px-8 border border-white py-3 rounded-lg m-3 font-semibold hover:bg-gray-100 transition duration-300 inline-block"
            >
              Get Started
            </Link>
            <Link
              to="/"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition duration-300 inline-block"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
