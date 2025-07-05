import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Complete KYC Verification",
      description:
        "Verify your identity through our secure KYC process to ensure genuine sellers and build trust in our community.",
      image:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300",
      details: [
        "Upload government-issued ID",
        "Provide contact information",
        "Verify phone number and email",
        "Complete identity verification",
      ],
    },
    {
      id: 2,
      title: "List Your Products",
      description:
        "Upload photos and details of your items. Our easy-to-use interface makes listing products quick and straightforward.",
      image:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300",
      details: [
        "Take high-quality photos",
        "Add product description",
        "Set competitive pricing",
        "Choose appropriate category",
      ],
    },
    {
      id: 3,
      title: "Get Paid After Approval",
      description:
        "Once your listing is approved and sold, receive secure payment directly to your account through our trusted payment system.",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300",
      details: [
        "Listing review and approval",
        "Secure transaction processing",
        "Direct payment to your account",
        "Transaction confirmation",
      ],
    },
  ];

  const features = [
    {
      title: "Secure Platform",
      description:
        "All transactions are protected with advanced security measures and buyer protection policies.",
      image:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200",
      color: "blue",
    },
    {
      title: "Best Prices",
      description:
        "Find amazing deals on quality items at prices that won't break the bank.",
      image:
        "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200",
      color: "green",
    },
    {
      title: "Trusted Community",
      description:
        "Join a community of verified sellers and buyers who value quality and trust.",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200",
      color: "purple",
    },
    {
      title: "Quality Assurance",
      description:
        "Every item goes through our quality check process to ensure customer satisfaction.",
      image:
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200",
      color: "yellow",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-6">How GoRefurbish Works</h1>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            Start selling your pre-loved items in just three simple steps. Join
            thousands of sellers who trust our platform.
          </p>
        </div>
      </section>

      {/* How It Works Steps */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Simple Steps to Success
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our streamlined process makes it easy for anyone to start selling
              and earning money from their pre-loved items.
            </p>
          </div>

          <div className="space-y-16">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex flex-col lg:flex-row items-center gap-12 ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className="lg:w-1/2">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mr-4">
                      <span className="text-2xl font-bold text-white">
                        {step.id}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-lg text-gray-600 mb-6">
                    {step.description}
                  </p>
                  <ul className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <li
                        key={detailIndex}
                        className="flex items-center text-gray-600"
                      >
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="lg:w-1/2">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose GoRefurbish?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide a comprehensive platform with all the tools and
              security you need to sell successfully.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Get answers to common questions about selling on GoRefurbish.
            </p>
          </div>
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                How long does KYC verification take?
              </h3>
              <p className="text-gray-600">
                KYC verification typically takes 24-48 hours. You'll receive an
                email confirmation once your verification is complete.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                What types of items can I sell?
              </h3>
              <p className="text-gray-600">
                You can sell electronics, furniture, fashion items, books, home
                & garden items, sports equipment, toys & games, and many other
                categories of pre-loved items.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                How do I receive payment?
              </h3>
              <p className="text-gray-600">
                Payments are processed securely through our platform and
                transferred directly to your bank account after successful sale
                and approval.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Is there a fee for listing items?
              </h3>
              <p className="text-gray-600">
                Listing items is free. We only charge a small commission when
                your item is successfully sold.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Selling?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of successful sellers on GoRefurbish and turn your
            unused items into cash today.
          </p>
          <Link to="/signup">
            <Button
              variant="outline"
              size="lg"
              className="bg-white text-green-700 border-green-700 hover:bg-gray-100"
            >
              Start Selling Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
