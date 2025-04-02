import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

const TermsAndConditions = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("terms");
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const paymentMethods = [
    {
      name: "Credit/Debit Cards",
      icon: "fa-credit-card",
      description: "Visa, Mastercard, American Express, Discover",
    },
    {
      name: "Digital Wallets",
      icon: "fa-mobile-alt",
      description: "Apple Pay, Google Pay, Samsung Pay",
    },
    {
      name: "Bank Transfer",
      icon: "fa-university",
      description: "Direct bank transfers",
    },
    {
      name: "Cryptocurrency",
      icon: "fa-bitcoin",
      description: "Bitcoin, Ethereum (select regions)",
    },
  ];

  const shippingOptions = [
    {
      name: "Standard Shipping",
      time: "3-5 business days",
      price: "$4.99",
      icon: "fa-truck",
    },
    {
      name: "Express Shipping",
      time: "1-2 business days",
      price: "$9.99",
      icon: "fa-bolt",
    },
    {
      name: "International Shipping",
      time: "7-14 business days",
      price: "Varies by destination",
      icon: "fa-globe",
    },
    {
      name: "In-Store Pickup",
      time: "Same day",
      price: "Free",
      icon: "fa-store",
    },
  ];

  const faqs = [
    {
      question: "How do I return a product?",
      answer:
        "To return a product, log in to your account, go to 'My Orders', select the item you wish to return, and follow the instructions.",
    },
    {
      question: "How long does it take to process a refund?",
      answer:
        "Refunds are typically processed within 3-5 business days after we receive your returned item.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, Apple Pay, Google Pay, and select cryptocurrencies.",
    },
  ];

  const sections = [
    { id: "terms", title: "Terms of Service" },
    { id: "payments", title: "Payments" },
    { id: "returns", title: "Returns & Refunds" },
    { id: "shipping", title: "Shipping Policy" },
    { id: "faq", title: "FAQ" },
  ];

  // Parse URL parameters when component mounts or location changes
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const section = searchParams.get("section");

    if (section && sections.map((s) => s.id).includes(section)) {
      setActiveSection(section);
    }
  }, [location]);

  const handleFaqClick = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div>
            <span
              style={{
                fontFamily: "Iceberg",
                fontSize: "40px",
                fontWeight: 700,
              }}
            >
              TechArena
            </span>
            <span className="ml-3" style={{fontFamily: "Roboto", fontSize: "35px", fontWeight: 600}}>Policies</span>
          </div>
          <p className="text-lg text-gray-600">
            Review our terms, policies, and frequently asked questions
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center border-b border-slate-400">
          {sections.map((section) => (
            <NavLink
              key={section.id}
              to={`/T&C?section=${section.id}`}
              className={({ isActive }) =>
                `px-6 py-3 font-medium text-lg rounded-t-lg transition-colors ${
                  activeSection === section.id
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              {section.title}
            </NavLink>
          ))}
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          {/* Terms of Service */}
          {activeSection === "terms" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Terms of Service
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    1. Acceptance of Terms
                  </h3>
                  <p className="text-gray-700">
                    By accessing or using the Tech Arena website, you agree to
                    be bound by these Terms of Service and our Privacy Policy.
                    If you do not agree with any part of these terms, you must
                    not use our services.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    2. Account Registration
                  </h3>
                  <p className="text-gray-700">
                    You may be required to register an account to access certain
                    features. You are responsible for maintaining the
                    confidentiality of your account information and for all
                    activities that occur under your account.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    3. Product Information
                  </h3>
                  <p className="text-gray-700">
                    We strive to ensure all product information is accurate, but
                    we do not warrant that product descriptions, prices, or
                    other content is complete, reliable, current, or error-free.
                    If a product offered is not as described, your sole remedy
                    is to return it in unused condition.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    4. Intellectual Property
                  </h3>
                  <p className="text-gray-700">
                    All content included on this site, such as text, graphics,
                    logos, button icons, images, audio clips, digital downloads,
                    data compilations, and software, is the property of Tech
                    Arena or its content suppliers and protected by
                    international copyright laws.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    5. Limitation of Liability
                  </h3>
                  <p className="text-gray-700">
                    Tech Arena shall not be liable for any direct, indirect,
                    incidental, special, or consequential damages that result
                    from the use of, or the inability to use, our services.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Payments */}
          {activeSection === "payments" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Payment Policies
              </h2>
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Accepted Payment Methods
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
                    {paymentMethods.map((method, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-center"
                      >
                        <i
                          className={`fas ${method.icon} text-3xl text-blue-600 mb-3`}
                        ></i>
                        <h4 className="font-semibold text-lg">{method.name}</h4>
                        <p className="text-gray-600 mt-1">
                          {method.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Payment Security
                  </h3>
                  <p className="text-gray-700">
                    All transactions on Tech Arena are processed using
                    industry-standard encryption and security protocols. We do
                    not store your full credit card details on our servers.
                    Payment information is transmitted directly to our payment
                    processors using secure connections.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Pricing</h3>
                  <p className="text-gray-700">
                    All prices are listed in US Dollars unless otherwise noted.
                    We reserve the right to change prices for products displayed
                    at any time without notice. The price charged for a product
                    will be the price in effect at the time the order is placed.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Taxes</h3>
                  <p className="text-gray-700">
                    Sales tax will be calculated and added to your order total
                    where required by law. The actual tax amount will depend on
                    your shipping address and the tax rates in effect at the
                    time your order is placed.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Returns & Refunds */}
          {activeSection === "returns" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Returns & Refunds Policy
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    1. Return Eligibility
                  </h3>
                  <p className="text-gray-700">
                    Most items can be returned within 30 days of delivery for a
                    full refund or exchange, provided they are in original
                    condition with all packaging and accessories. Some items are
                    not eligible for return, including:
                  </p>
                  <ul className="list-disc pl-5 mt-2 text-gray-700 space-y-1">
                    <li>Downloaded software or digital products</li>
                    <li>Personalized or custom-made products</li>
                    <li>
                      Products with broken seals (software, movies, games)
                    </li>
                    <li>Gift cards and vouchers</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    2. Return Process
                  </h3>
                  <p className="text-gray-700">
                    To initiate a return, please follow these steps:
                  </p>
                  <ol className="list-decimal pl-5 mt-2 text-gray-700 space-y-1">
                    <li>Log in to your Tech Arena account</li>
                    <li>Navigate to "Order History"</li>
                    <li>Select the item(s) you wish to return</li>
                    <li>Print the prepaid return shipping label</li>
                    <li>Pack the item securely in its original packaging</li>
                    <li>Attach the return label and ship within 7 days</li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    3. Refund Processing
                  </h3>
                  <p className="text-gray-700">
                    Once we receive your return, we will inspect it and process
                    your refund within 5 business days. Refunds will be issued
                    to the original payment method. Shipping costs are
                    non-refundable unless the return is due to our error.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    4. Damaged or Defective Items
                  </h3>
                  <p className="text-gray-700">
                    If you receive a damaged or defective item, please contact
                    us within 7 days of delivery. We may require photos of the
                    damage and will provide instructions for return or
                    replacement at no cost to you.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Shipping Policy */}
          {activeSection === "shipping" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Shipping Policy
              </h2>
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Shipping Options & Delivery Times
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
                    {shippingOptions.map((option, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 p-6 rounded-lg border border-gray-200"
                      >
                        <i
                          className={`fas ${option.icon} text-3xl text-blue-600 mb-3`}
                        ></i>
                        <h4 className="font-semibold text-lg">{option.name}</h4>
                        <p className="text-gray-600 mt-1">
                          <span className="font-medium">Delivery:</span>{" "}
                          {option.time}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Cost:</span>{" "}
                          {option.price}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Order Processing
                  </h3>
                  <p className="text-gray-700">
                    Orders are typically processed within 1-2 business days.
                    Processing time may be longer during peak seasons or for
                    custom products. You will receive a confirmation email with
                    tracking information once your order ships.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    International Shipping
                  </h3>
                  <p className="text-gray-700">
                    International orders may be subject to customs duties,
                    taxes, and fees which are the responsibility of the
                    recipient. Tech Arena is not responsible for any delays
                    caused by customs processing. Please check with your local
                    customs office for more information.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Order Tracking</h3>
                  <p className="text-gray-700">
                    Once your order ships, you will receive a tracking number
                    via email. You can track your package using our website or
                    directly through the carrier's website. Please allow 24
                    hours for tracking information to update after shipment.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Shipping Restrictions
                  </h3>
                  <p className="text-gray-700">
                    Some products may have shipping restrictions based on size,
                    weight, or destination. These restrictions will be noted on
                    the product page. We cannot ship to PO boxes for certain
                    items that require signature confirmation.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* FAQ */}
          {activeSection === "faq" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4">
                    <button
                      onClick={() => handleFaqClick(index)}
                      className="flex justify-between items-center w-full text-left"
                    >
                      <h3 className="text-lg font-semibold text-gray-900">
                        {faq.question}
                      </h3>
                      <span className="ml-4 text-blue-600">
                        {openFaqIndex === index ? (
                          <i className="fas fa-minus"></i>
                        ) : (
                          <i className="fas fa-plus"></i>
                        )}
                      </span>
                    </button>
                    {openFaqIndex === index && (
                      <div className="mt-2 text-gray-700">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">
                  Still have questions?
                </h3>
                <p className="text-gray-700 mb-4">
                  If you can't find the answer you're looking for, our customer
                  support team is happy to help.
                </p>
                <NavLink
                  to="/contact"
                  className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Contact Support
                </NavLink>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
