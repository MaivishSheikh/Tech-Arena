import React, { useEffect, useState } from "react";
import listProduct from "../../assets/listProduct.png";
import createAccount from "../../assets/createAccount.png";
import securePayment from "../../assets/securePayment.png";
import manageStock from "../../assets/manageStock.png";
import globalMarket from "../../assets/globalMarket.png";
import { NavLink } from "react-router-dom";
import SLogin from "./SLogin";

const ManufacturerPage = () => {
  const [activeContent, setActiveContent] = useState("special1");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const specials = [
    {
      id: "special1",
      title: "Register as a Verified Manufacturer",
      image: createAccount,
      heading:
        "Your journey to selling tech starts with a single step - creating an account.",
      description: [
        "Becoming a seller on Tech Arena is simple and takes only a few minutes. Register your account, provide basic details, and verify your information to get started on your selling journey. With a streamlined process, you’ll be ready to showcase your products in no time.",
        "Joining Tech Arena means gaining access to a growing community of tech enthusiasts looking for quality devices and accessories. With our seller-friendly platform, you can focus on what matters most—growing your business and reaching your target audience effortlessly.",
      ],
    },
    {
      id: "special2",
      title: "List and Manage Your Products",
      image: listProduct,
      heading: "The right platform can turn your products into bestsellers.",
      description: [
        "Adding your products to Tech Arena is quick and hassle-free. Upload high-quality images, enter detailed specifications, and set competitive prices to attract buyers looking for the latest gadgets and accessories.",
        "Our intuitive dashboard helps you manage your product listings with ease, ensuring that customers find exactly what they need. Whether you're selling smartphones, laptops, or accessories, Tech Arena provides the perfect stage for your tech inventory.",
      ],
    },
    {
      id: "special3",
      title: "Optimize Your Inventory",
      image: manageStock,
      heading: "Keep track of your stock with smart inventory management.",
      description: [
        "Effortlessly manage your product stock with Tech Arena’s advanced inventory system. Get real-time updates on availability, low-stock alerts, and automated tracking to ensure a seamless selling experience.",
        "With detailed insights into your sales trends, you can optimize your inventory and avoid stock shortages or overstocking. Tech Arena helps you maintain a smooth flow of products to keep your customers satisfied and your business running efficiently.",
      ],
    },
    {
      id: "special4",
      title: "Secure and Timely Payments",
      image: securePayment,
      heading:
        "Sell with confidence, knowing your payments are secure and timely.",
      description: [
        "Tech Arena ensures that your payments are processed quickly and securely. With multiple payout options, transparent transactions, and timely deposits, you can focus on scaling your business without worrying about payment delays.",
        "We prioritize seller security, offering fraud protection and reliable payment gateways to keep your earnings safe. Whether you’re a small business or an established brand, Tech Arena provides a smooth and secure financial experience.",
      ],
    },
    {
      id: "special5",
      title: "Expand Your Business Globally",
      image: globalMarket,
      heading: "Expand beyond borders and reach international customers.",
      description: [
        "Tech Arena provides the perfect platform to take your business global. Connect with buyers worldwide, showcase your products to an international audience, and increase your brand's reach with our cross-border selling solutions.",
        "With seamless shipping integrations, currency conversions, and multilingual support, selling internationally has never been easier. Grow your market, increase sales, and build a global presence with Tech Arena’s worldwide marketplace.",
      ],
    },
  ];

  const handleSpecialClick = (id) => {
    setActiveContent(id);
  };

  const features = [
    {
      icon: "fas fa-shield-alt text-2xl text-green-500",
      title: "Secure & Fast Payments",
      description: "Get paid securely and on time for every device you sell.",
    },
    {
      icon: "fas fa-coins text-2xl text-yellow-500",
      title: "Low Selling Fees",
      description:
        "Keep more of your profits with our competitive selling fees.",
    },
    {
      icon: "fas fa-headset text-2xl text-purple-500",
      title: "Dedicated Manufacturer Support",
      description:
        "Get 24/7 assistance to help you grow your device-selling business.",
    },
    {
      icon: "fas fa-rocket text-2xl text-red-500",
      title: "Boost Your Sales",
      description:
        "Access exclusive promotions and marketing tools to sell more devices.",
    },
  ];

  const steps = [
    {
      icon: "fas fa-user-plus text-3xl text-blue-500",
      title: "Sign Up",
      description: "Create your seller account in just a few minutes.",
    },
    {
      icon: "fas fa-upload text-3xl text-green-500",
      title: "List Products",
      description:
        "Upload your products with detailed descriptions and images.",
    },
    {
      icon: "fas fa-chart-line text-3xl text-yellow-500",
      title: "Sell & Grow",
      description: "Reach millions of customers and grow your business.",
    },
    {
      icon: "fas fa-globe text-3xl text-purple-500",
      title: "Go Global",
      description: "Expand your business to international markets.",
    },
  ];

  const comparisonData = [
    {
      feature: "Selling Fees",
      techArena: "2%",
      competitorA: "5%",
      competitorB: "4%",
    },
    {
      feature: "Global Reach",
      techArena: "Yes",
      competitorA: "No",
      competitorB: "Yes",
    },
    {
      feature: "24/7 Support",
      techArena: "Yes",
      competitorA: "No",
      competitorB: "Yes",
    },
    {
      feature: "Inventory Management",
      techArena: "Advanced",
      competitorA: "Basic",
      competitorB: "Intermediate",
    },
  ];

  const faqs = [
    {
      question: "How do I become a seller on Tech Arena?",
      answer:
        "Simply sign up, verify your account, and start listing your products. It’s quick and easy!",
    },
    {
      question: "What are the selling fees?",
      answer:
        "Tech Arena charges a competitive 2% fee on every sale, ensuring you keep more of your profits.",
    },
    {
      question: "Can I sell internationally?",
      answer:
        "Yes! Tech Arena provides tools to help you sell to customers worldwide.",
    },
  ];

  const resources = [
    {
      title: "Manufacturer Guide",
      description: "Learn how to maximize your sales on Tech Arena.",
      link: "#",
    },
    {
      title: "Marketing Tips",
      description: "Discover strategies to boost your product visibility.",
      link: "#",
    },
    {
      title: "Inventory Management",
      description: "Optimize your stock with our advanced tools.",
      link: "#",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const handleDropdownClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const [open, setOpen] = useState(false);

  return (
    <div className="">
      <div className="pt-10 flex justify-between items-center px-20">
        <div>
          <h1
            style={{ fontFamily: "Iceberg", fontSize: "30px", fontWeight: 700 }}
          >
            Manufacturer Page
          </h1>
        </div>
        <div
          className="flex justify-between items-center"
          style={{ width: "300px" }}
        >
          <NavLink
            to=""
            style={{ fontSize: "18px" }}
            className="bg-white-600 border-2 border-black px-4 py-1.5 rounded-lg font-semibold hover:bg-blue-700"
            onClick={() => setOpen(true)}
          >
            Login
          </NavLink>
          <SLogin open={open} handleClose={() => setOpen(false)} />
          <NavLink
            to="/sellerLogin"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Start Selling Now
          </NavLink>
        </div>
      </div>
      <div className="p-8 mx-auto" style={{ width: "1400px" }}>
        <h1 className="text-2xl font-bold text-center mb-6">
          Sell Online with{" "}
          <span
            style={{ fontFamily: "Iceberg", fontSize: "30px", fontWeight: 700 }}
          >
            TechArena
          </span>
        </h1>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 bg-white p-5 rounded-lg border"
          style={{ boxShadow: "3px 3px 5px #8E8E8E" }}
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col items-center text-center py-2 px-6 ${
                index !== features.length - 1
                  ? "border-r-2 border-gray-200"
                  : "px-2"
              }`}
            >
              <i className={`${feature.icon} mb-4`}></i>
              <div className="py-2">
                <h2
                  className="text-xl font-semibold mb-2"
                  style={{ fontSize: "17px", fontWeight: 600 }}
                >
                  {feature.title}
                </h2>
                <p className="text-gray-600" style={{ fontSize: "14px" }}>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold">Become a Manufacturer</h2>
          <p className="text-gray-600">
            Sell your products online to reach a global market.
          </p>
        </div>

        <section className="items p-8 flex" style={{ fontFamily: "Roboto" }}>
          <div className="specials mb-8 md:mb-0 md:mr-8">
            {specials.map((special) => (
              <div
                key={special.id}
                className={`px-4 py-2 m-2 cursor-pointer rounded-xl border-2 hover:border-2 font-bold hover:border-[#1C5B82] text-2xl hover:text-[#1C5B82] ${
                  activeContent === special.id
                    ? "border-[#1C5B82] border-2 text-[#1C5B82]"
                    : "bg-[#F7F5FB]"
                }`}
                onClick={() => handleSpecialClick(special.id)}
                style={{
                  width: "300px",
                  fontSize: "17px",
                }}
              >
                {special.title}
              </div>
            ))}
          </div>
          <div className="flex-1">
            {specials.map((special) => (
              <div
                key={special.id}
                className={`content ${
                  activeContent === special.id ? "block" : "hidden"
                }`}
              >
                <div className="flex items-center">
                  <div className="text-justify" style={{ width: "600px" }}>
                    <h3 className="text-2xl font-bold mb-4">
                      {special.heading}
                    </h3>
                    {special.description.map((paragraph, index) => (
                      <p key={index} className="mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  <div style={{ width: "300px" }}>
                    <img
                      src={special.image}
                      alt={special.title}
                      className="w-full h-full object-contain rounded-lg m-5"
                      style={{ backgroundPosition: "center" }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Step-by-Step Guide */}
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
            {steps.map((step, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <i className={`${step.icon} mb-4`}></i>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Manufacturer Fees Breakdown Table */}
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold">Manufacturer Fees Breakdown</h2>
          <div className="mt-6 bg-white p-6 rounded-lg shadow-md px-10">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-2 text-gray-700 font-semibold">Fee Type</th>
                  <th className="py-2 text-gray-700 font-semibold text-right">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Platform Registration Fee */}
                <tr className="border-b">
                  <td className="py-3 text-gray-700">
                    Platform Registration Fee
                  </td>
                  <td className="py-3 text-right font-semibold">₹499</td>
                </tr>

                {/* Annual Subscription Fee */}
                <tr className="border-b">
                  <td className="py-3 text-gray-700">
                    Annual Subscription Fee
                  </td>
                  <td className="py-3 text-right font-semibold">₹1,999</td>
                </tr>

                {/* Transaction Fee (Per Sale) */}
                <tr className="border-b">
                  <td className="py-3 text-gray-700">
                    Transaction Fee (Per Sale)
                  </td>
                  <td className="py-3 text-right font-semibold">
                    2% of Sale Value
                  </td>
                </tr>

                {/* Payment Gateway Charges */}
                <tr className="border-b">
                  <td className="py-3 text-gray-700">
                    Payment Gateway Charges
                  </td>
                  <td className="py-3 text-right font-semibold">
                    1.5% of Sale Value
                  </td>
                </tr>

                {/* GST (On Fees) */}
                <tr>
                  <td className="py-3 text-gray-700">GST (18% on Fees)</td>
                  <td className="py-3 text-right font-semibold">Applicable</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
          <div className="mt-6">
            {faqs.map((faq, index) => (
              <div key={index} className="mb-4">
                {/* Question Box */}
                <div
                  className="bg-[#2C666E] p-4 rounded-lg cursor-pointer hover:bg-[#07393C]"
                  style={{ border: "2px solid #07393C" }}
                  onClick={() => handleDropdownClick(index)}
                >
                  <div className="flex justify-between items-center">
                    <h3
                      className="text-white"
                      style={{ fontSize: "16px", fontFamily: "Poppins" }}
                    >
                      {faq.question}
                    </h3>
                    <span className="pr-5 text-white">
                      {openIndex === index ? (
                        <i className="fa-solid fa-xmark fa-xl"></i>
                      ) : (
                        <i className="fa-solid fa-plus fa-xl"></i>
                      )}
                    </span>
                  </div>
                </div>

                {/* Answer Box */}
                {openIndex === index && (
                  <div
                    className="bg-[#2C666E] p-4 mt-2 rounded-lg"
                    style={{ border: "2px solid #07393C" }}
                  >
                    <p
                      className="text-white"
                      style={{ fontSize: "16px", fontFamily: "Poppins" }}
                    >
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Manufacturer Resources */}
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold">Manufacturer Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {resources.map((resource, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold">{resource.title}</h3>
                <p className="text-gray-600 mt-2">{resource.description}</p>
                <a
                  href={resource.link}
                  className="text-blue-600 mt-4 inline-block"
                >
                  Learn More
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Call-to-Action Button */}
        <div className="mt-8 text-center">
          <NavLink
            to="/sellerLogin"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Start Selling Now
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ManufacturerPage;
