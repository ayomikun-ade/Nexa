import { Link } from "react-router";
import Header from "../components/Header";

const TermsConditions = () => {
  return (
    <div className="px-3 md:px-10 w-full min-h-screen font-primary flex flex-col justify-center items-center">
      <Header />
      <section className="relative max-w-[700px] h-fit w-full animate-fadeIn flex flex-col shadow-md bg-white rounded-lg text-black mt-20 mb-6 md:mb-0 md:mt-5 px-3 md:px-6 py-8">
        <h2 className="font-main text-4xl font-semibold text-center pb-1 border-b border-neutral-400">
          Key Things To Note
        </h2>
        <ul className="list-disc list-inside my-8 flex flex-col items-center">
          <li>
            This website only works on Chrome browsers due to the APIs used.
          </li>
          <li>
            Chrome Browser version should be between Chrome 131 to Chrome 136
          </li>
          <li>
            For better functionality, use this website on you PC or Desktop
            computer.
          </li>
          <li className="text-center text-black flex- flex-col">
            Incase of any errors referring to support for browsers. Please go to
            the following pages and enable the following:
            <ul className="text-blue-600">
              <li className="hover:no-underline underline">
                <a target="_blank" href="chrome://flags/#translation-api">
                  chrome://flags/#translation-api
                </a>
              </li>
              <li className="hover:no-underline underline">
                <a
                  target="_blank"
                  href="chrome://flags/#language-detection-api"
                >
                  chrome://flags/#language-detection-api
                </a>
              </li>
              <li className="hover:no-underline underline">
                {" "}
                <a
                  target="_blank"
                  href="chrome://flags/#summarization-api-for-gemini-nano"
                >
                  chrome://flags/#summarization-api-for-gemini-nano
                </a>
              </li>
              <span className="text-black no-underline">
                After enabling each of them, relaunch your browser.
              </span>
            </ul>
          </li>
        </ul>
        <Link
          to="/text-processor"
          className="bg-black px-8 hover:bg-black/75 py-1 rounded-lg mt-5 text-white w-fit self-center transition duration-300 hover:ease-in-out "
        >
          Let&apos;s Roll
        </Link>
      </section>
    </div>
  );
};

export default TermsConditions;
