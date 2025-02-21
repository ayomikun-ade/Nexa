import { Link } from "react-router";
import Header from "../components/Header";
import { toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { isChrome, isMobile } from "react-device-detect";

const Documentation = () => {
  //on page render check for device and browser info
  useEffect(() => {
    if (!isChrome || isMobile) {
      toast.warn(
        "Device or Browser isn't supported. Use Chrome on a PC or Desktop!",
        {
          position: "top-center",
          autoClose: false,
        }
      );
    }
  }, []);

  // function to handle copy to clipboard
  const handleCopy = async (event) => {
    try {
      const textToCopy = event.target.textContent;
      await navigator.clipboard.writeText(textToCopy);
      console.log("Text copied to clipboard!");
      toast.info("Copied to Clipboard!", {
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error copying text:", error);
    }
  };

  const checkKey = (e) => {
    if (e.key === "Enter") {
      handleCopy(e);
    }
  };

  return (
    <>
      <ToastContainer role="status" theme="dark" />
      <div className="px-3 md:px-10 w-full min-h-screen font-primary flex flex-col justify-center items-center">
        <Header />
        <section className=" text-white flex flex-col animate-fadeIn border border-neutral-200 rounded-xl justify-center items-center max-w-[700px] mt-20 mb-6 md:mb-0 md:mt-5 px-3 md:px-6 py-10">
          <h2 className="relative w-full font-main text-4xl font-semibold text-center pb-2 border-b border-neutral-400">
            <Link
              to="/"
              aria-label="back to home button"
              className="absolute left-0 md:left-3 -top-6 md:top-0 text-2xl hover:scale-105 transition duration-300 hover:ease-in-out"
            >
              <ion-icon
                className="text-white"
                aria-hidden="true"
                name="arrow-back-outline"
              ></ion-icon>
            </Link>
            Documentation
          </h2>
          <section className=" my-8 flex flex-col gap-1">
            <p className="mb-2">
              This website only works on Chrome browsers due to the fact that it
              was built using the built-in Chrome AI APIs - which are still in
              their beta phase - and some extra browser configurations will need
              to be made.
            </p>
            <div className="ml-3 flex flex-col gap-2">
              <p>
                📝 Chrome Browser version should be between Chrome 131 to Chrome
                136.
              </p>
              <p>
                📝 For better functionality, use this website on a PC or Desktop
                computer.
              </p>
              <div className="flex flex-col">
                📝 For errors referring to support for browsers. Please go to
                the following pages and enable the features:
                <div className="text-blue-600 flex flex-col ml-5 gap-[2px] text-sm mt-2">
                  <p
                    tabIndex={0}
                    onClick={handleCopy}
                    onKeyDown={checkKey}
                    className="hover:no-underline underline"
                  >
                    chrome://flags/#translation-api
                  </p>
                  <p
                    tabIndex={0}
                    onClick={handleCopy}
                    onKeyDown={checkKey}
                    className="hover:no-underline underline"
                  >
                    chrome://flags/#language-detection-api
                  </p>
                  <p
                    tabIndex={0}
                    onClick={handleCopy}
                    onKeyDown={checkKey}
                    className="hover:no-underline underline"
                  >
                    chrome://flags/#summarization-api-for-gemini-nano
                  </p>
                  <p
                    tabIndex={0}
                    onClick={handleCopy}
                    onKeyDown={checkKey}
                    className="hover:no-underline underline"
                  >
                    chrome://flags/#optimization-guide-on-device-model
                  </p>
                  <p
                    tabIndex={0}
                    onClick={handleCopy}
                    onKeyDown={checkKey}
                    className="hover:no-underline underline"
                  >
                    chrome://flags/#enable-experimental-web-platform-features
                  </p>
                </div>
              </div>
              <p className=" no-underline mt-3 text-base">
                📝 After enabling each of them, relaunch your browser and
                you&apos;re good to go.
              </p>
              <p>
                📝 For more information about the Chrome AI APIs visit{" "}
                <a
                  aria-label="Link to Chrome AI docs"
                  className="underline text-blue-500 hover:no-underline transition duration-300 hover:ease-in-out"
                  target="_blank"
                  href="https://developer.chrome.com/docs/ai"
                >
                  AI on Chrome
                </a>
              </p>
            </div>
          </section>
          <Link
            aria-label="link to the text-processor page"
            to="/text-processor"
            className="bg-white text-lg px-8 hover:bg-neutral-200 py-1 rounded-lg mt-3 text-black w-fit focus-visible:outline-neutral-500 self-center transition duration-300 hover:ease-in-out "
          >
            Let&apos;s Roll
          </Link>
        </section>
      </div>
    </>
  );
};

export default Documentation;
