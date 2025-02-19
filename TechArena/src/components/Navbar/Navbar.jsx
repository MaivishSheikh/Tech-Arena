import { useState } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center flex-wrap relative">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <a href="#" className="text-xl font-bold">TechArena</a>
        <ul className="hidden md:flex gap-4">
          <li className="relative group">
            <a href="#" className="hover:bg-gray-800 px-3 py-2 rounded">Elements</a>
            <div className="absolute hidden group-hover:grid grid-cols-2 gap-2 bg-gray-800 p-4 rounded mt-2">
              <a href="#" className="hover:bg-gray-700 p-2 rounded">All</a>
              <a href="#" className="hover:bg-gray-700 p-2 rounded">Buttons</a>
              <a href="#" className="hover:bg-gray-700 p-2 rounded">Checkboxes</a>
              <a href="#" className="hover:bg-gray-700 p-2 rounded">Toggle Switches</a>
              <a href="#" className="hover:bg-gray-700 p-2 rounded">Cards</a>
            </div>
          </li>
          <li><a href="#" className="hover:bg-gray-800 px-3 py-2 rounded">Challenges</a></li>
          <li><a href="#" className="hover:bg-gray-800 px-3 py-2 rounded">Spotlight</a></li>
        </ul>
      </div>

      {/* Right Section */}
      <div className="hidden md:flex items-center gap-4">
        <a href="#" className="bg-gradient-to-r from-blue-500 to-cyan-400 px-4 py-2 rounded text-white font-semibold">+ Create</a>
        <div className="relative group">
          <button className="flex items-center gap-2">
            <span>techarena</span>
            <img src="https://avatars.mds.yandex.net/i?id=db24dc1bd73edb561707f8dba4428398e0145f91-11471706-images-thumbs&n=13" className="w-10 h-10 rounded" />
          </button>
          <div className="absolute right-0 hidden group-hover:block bg-gray-800 p-3 rounded mt-2 w-40">
            <a href="#" className="block hover:bg-gray-700 p-2 rounded">Your Profile</a>
            <a href="#" className="block hover:bg-gray-700 p-2 rounded">Send Feedback</a>
            <a href="#" className="block bg-blue-500 text-white p-2 rounded hover:bg-blue-400">Join Discord</a>
            <a href="#" className="block hover:bg-gray-700 p-2 rounded">Log Out</a>
          </div>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        <i className="fa-solid fa-bars text-xl"></i>
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-900 flex flex-col gap-3 p-4 rounded-md md:hidden">
          <a href="#" className="hover:bg-gray-800 px-3 py-2 rounded">Elements</a>
          <a href="#" className="hover:bg-gray-800 px-3 py-2 rounded">Challenges</a>
          <a href="#" className="hover:bg-gray-800 px-3 py-2 rounded">Spotlight</a>
          <a href="#" className="bg-gradient-to-r from-blue-500 to-cyan-400 px-4 py-2 rounded text-white font-semibold">+ Create</a>
          <a href="#" className="hover:bg-gray-800 px-3 py-2 rounded">Your Profile</a>
          <a href="#" className="hover:bg-gray-800 px-3 py-2 rounded">Send Feedback</a>
          <a href="#" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-400">Join Discord</a>
          <a href="#" className="hover:bg-gray-800 px-3 py-2 rounded">Log Out</a>
        </div>
      )}
    </nav>
  );
}
