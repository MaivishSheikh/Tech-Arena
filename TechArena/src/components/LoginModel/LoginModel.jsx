import { useState } from "react";

export default function LoginModel() {
  const [openModal, setOpenModal] = useState(true);
  const [email, setEmail] = useState('');

  function onCloseModal() {
    setOpenModal(false);
    setEmail('');
  }

  return (
    <>
      {openModal && (            
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white rounded-lg shadow-md max-w-md w-full p-2">
          <button
                  onClick={onCloseModal}
                  className="absolute right-1 top-2 text-gray-400 hover:text-gray-600"
                >
                  <i className="fa-solid fa-xmark fa-xl"></i>
                </button>
            <div className="m-4 border border-black space-y-6 p-9">
              <div className="flex justify-between items-center">
                <h3 className="my-6 text-xl font-medium text-gray-900 m-auto" style={{fontFamily: "Corinthia", fontSize: "50px", fontWeight: 700}}>Tech Arena</h3>
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                    Username/Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="remember"
                    className="rounded border-gray-300 focus:ring-blue-500"
                  />
                  <label htmlFor="remember" className="text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Lost Password?
                </a>
              </div>

              {/* Login Button */}
              <button
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
              >
                Log in to your account
              </button>

              {/* Footer */}
              <div className="flex justify-between text-sm text-gray-500">
                <span>Not registered?</span>
                <a
                  href="#"
                  className="text-blue-600 hover:underline"
                >
                  Create account
                </a>
              </div>
            </div>
          </div>
        </div>
        
      )}
    </>
  );
}