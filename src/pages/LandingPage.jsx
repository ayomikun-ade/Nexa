import { Link } from "react-router";
import Header from "../components/Header";

const LandingPage = () => {
  return (
    <div className="px-10 w-full min-h-screen flex flex-col justify-center items-center">
      <Header />
      <main className="flex flex-col justify-center items-center max-w-[700px] text-center">
        <h1 className="font-main font-semibold text-4xl ">
          Nexa: Where Language Meets AI
        </h1>
        <p className="font-primary mt-3 text-lg ">
          Revolutionize your text processing workflow with Nexa&apos;s
          cutting-edge language detection, translation and summarization
          techniques
        </p>
        <Link
          to="/text-processor"
          className="bg-neutral-600 hover:bg-neutral-400 transition duration-500 hover:ease-in-out px-3 py-2 rounded-md font-primary mt-5"
        >
          Get Started
        </Link>
      </main>
    </div>
  );
};

export default LandingPage;
