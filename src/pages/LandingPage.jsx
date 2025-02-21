import { Link } from "react-router";
import Header from "../components/Header";

const LandingPage = () => {
  return (
    <div className="px-10 w-full min-h-screen flex flex-col justify-center items-center">
      <Header />
      <main className="flex flex-col animate-fadeIn justify-center items-center max-w-[700px] text-center">
        <h1 className="font-main font-semibold text-4xl md:text-5xl">
          Nexa: Where Language Meets AI
        </h1>
        <p className="font-primary mt-3 text-base md:text-lg ">
          Revolutionize your text processing workflow with Nexa&apos;s
          cutting-edge language detection, translation and summarization
          techniques
        </p>
        {/* <span className="text-sm text-neutral-400 font-primary underline">
          Terms and Conditions Apply
        </span> */}
        <div className="mt-5 flex flex-col h-fit items-center md:justify-center md:flex-row w-fit gap-2">
          <Link
            aria-label="Link to documentation page"
            to="/docs"
            className="bg-neutral-600 w-fit h-full border-2 border-neutral-600 hover:border-neutral-400 hover:bg-neutral-400 transition duration-500 hover:ease-in-out px-3 py-2 rounded-md font-primary"
          >
            Get Started
          </Link>
          <Link
            aria-label="Link to key points page"
            to="/text-processor"
            className="border-2 border-neutral-600 hover:bg-neutral-600 w-full md:w-fit h-full transition duration-500 hover:ease-in-out px-3 py-2 rounded-md font-primary"
          >
            Try Now
          </Link>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
