import { Link } from "react-router";
import Header from "../components/Header";
import { toast, ToastContainer } from "react-toastify";

const TermsConditions = () => {
  const handleCopy = async (event) => {
    try {
      const textToCopy = event.target.textContent;
      await navigator.clipboard.writeText(textToCopy);
      console.log("Text copied to clipboard!");
      toast.info("Copied to Clipboard!", {
        autoClose: 3000,
        theme: "dark",
        role: "status",
      });
    } catch (error) {
      console.error("Error copying text:", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="px-3 md:px-10 w-full min-h-screen font-primary flex flex-col justify-center items-center">
        <Header />
        <section className="relative max-w-[700px] h-fit w-full animate-fadeIn flex flex-col shadow-md bg-white rounded-lg text-black mt-20 mb-6 md:mb-0 md:mt-5 px-3 md:px-6 py-10">
          <Link
            to="/"
            aria-label="back to home button"
            className="absolute left-3 top-3 text-2xl hover:scale-105 transition duration-300 hover:ease-in-out"
          >
            <ion-icon aria-hidden="true" name="arrow-back-outline"></ion-icon>
          </Link>
          <h2 className="font-main text-4xl font-semibold text-center pb-2 border-b border-neutral-400">
            Key Things To Note
          </h2>
          <ul className="text-center list-inside my-8 flex flex-col items-center">
            <li>
              📑 This website only works on Chrome browsers due to the built-in
              Chrome AI APIs used.
            </li>
            <li>
              📑 Chrome Browser version should be between Chrome 131 to Chrome
              136
            </li>
            <li>
              📑 For better functionality, use this website on a PC or Desktop
              computer.
            </li>
            <li className="text-center text-black flex- flex-col">
              📑 Incase of any errors referring to support for browsers. Please
              go to the following pages and enable the following:
              <ul className="text-blue-600 text-sm mt-2">
                <li
                  tabIndex={0}
                  onClick={handleCopy}
                  className="hover:no-underline underline"
                >
                  chrome://flags/#translation-api
                </li>
                <li
                  tabIndex={0}
                  onClick={handleCopy}
                  className="hover:no-underline underline"
                >
                  chrome://flags/#language-detection-api
                </li>
                <li
                  tabIndex={0}
                  onClick={handleCopy}
                  className="hover:no-underline underline"
                >
                  chrome://flags/#summarization-api-for-gemini-nano
                </li>
                <li className="text-black no-underline mt-3 text-base">
                  📑 After enabling each of them, relaunch your browser and
                  you&apos;re good to go.
                </li>
              </ul>
            </li>
          </ul>
          <Link
            to="/text-processor"
            className="bg-black px-8 hover:bg-black/80 py-1 rounded-lg mt-3 text-white w-fit self-center transition duration-300 hover:ease-in-out "
          >
            Let&apos;s Roll
          </Link>
        </section>
      </div>
    </>
  );
};

export default TermsConditions;
