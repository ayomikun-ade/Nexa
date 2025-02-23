import { Link } from "react-router";
import Header from "../components/Header";

const NotFound = () => {
  return (
    <div className="px-3 md:px-10 w-full min-h-screen font-primary flex flex-col justify-center items-center">
      <Header />
      <div className="text-center animate-fadeIn flex flex-col gap-2 items-center">
        <h1 className="text-3xl md:text-5xl font-bold text-white">
          404 - Page Not Found
        </h1>
        <p className="text-gray-300">
          Oops! The page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="bg-white px-4 py-1 text-black rounded-lg mt-3 w-fit border border-white hover:bg-transparent hover:text-white transition duration-300 hover:ease-in-out"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
