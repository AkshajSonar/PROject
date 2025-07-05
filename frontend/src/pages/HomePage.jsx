import { Link } from "react-router-dom";
import homeImage from "../assets/image.png";

const Home = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100">
      {/* Left: Image */}
      <div className="md:w-1/2 w-full">
        <img
          src={homeImage}
          alt="store"
          className="object-cover w-full h-full rounded-r-3xl shadow-xl"
        />
      </div>

      {/* Right: Content */}
      <div className="md:w-1/2 w-full flex flex-col justify-center items-center p-10 text-center">
        <h1 className="text-5xl font-extrabold text-purple-800 mb-4 drop-shadow">
          Welcome to <span className="text-pink-600">Ushop</span>
        </h1>

        <p className="text-gray-700 max-w-md mb-8 font-medium text-lg">
          🛍️ Your one-stop destination for electronics, fashion, books, gadgets, groceries and more!
        </p>

        <div className="flex flex-col gap-4 w-full max-w-xs">
          <Link to="/login">
            <button className="bg-purple-600 text-white py-3 px-6 rounded-2xl shadow-md hover:bg-purple-700 transition font-semibold">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-white text-purple-700 py-3 px-6 rounded-2xl border border-purple-600 hover:bg-purple-100 transition font-semibold">
              Sign Up
            </button>
          </Link>
        </div>

        <p className="mt-8 text-sm text-gray-500">
          Powered by ❤️ Avani Inc.
        </p>
      </div>
    </div>
  );
};

export default Home;
