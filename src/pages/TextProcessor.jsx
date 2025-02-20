import { toast, ToastContainer } from "react-toastify";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import Welcome from "../components/Welcome";
import { Link } from "react-router";
import { detectLanguage, translateText, summarizeText } from "../services/api";
import Disclaimer from "../components/Disclaimer";

const TextProcessor = () => {
  const [chatHistory, setChatHistory] = useState(() => {
    const storedHistory = localStorage.getItem("chatHistory");
    return storedHistory ? JSON.parse(storedHistory) : [];
  });
  const [inputText, setInputText] = useState("");
  const [detectedLanguage, setDetectedLanguage] = useState(() => {
    return localStorage.getItem("detectedLanguage") || "";
  });
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!("ai" in self)) {
      toast.warn(
        "AI features are not supported in this environment. Please use Chrome browser.",
        {
          position: "top-center",
          autoClose: false,
        }
      );
    }
    if (!("ai" in self && "languageDetector" in self.ai)) {
      console.log("Language Detection API is not supported");
    }
    if (!("ai" in self && "translator" in self.ai)) {
      console.log("Translator API is not supported");
    }
    if (!("ai" in self && "summarizer" in self.ai)) {
      console.log("Summarization API is not supported");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  }, [chatHistory]);

  useEffect(() => {
    localStorage.setItem("detectedLanguage", detectedLanguage);
  }, [detectedLanguage]);

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const handleTranslate = async (index) => {
    const message = chatHistory[index];
    const translatedText = await translateText(
      message.text,
      detectedLanguage,
      selectedLanguage,
      setIsTranslating
    );
    const languageName =
      new Intl.DisplayNames(["en"], { type: "language" }).of(
        selectedLanguage
      ) || "Unknown Language";
    if (translatedText) {
      setChatHistory((prev) => [
        ...prev,
        {
          text: translatedText,
          sender: "bot",
          type: "translation",
          languageName,
        },
      ]);
    }
  };

  const handleSummarize = async (index) => {
    const message = chatHistory[index];
    const summarizedText = await summarizeText(message.text, setIsProcessing);
    if (summarizedText) {
      setChatHistory((prev) => [
        ...prev,
        { text: summarizedText, sender: "bot", type: "summary" },
      ]);
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) {
      toast.error("Input text cannot be empty.");
      return;
    }

    const language = await detectLanguage(inputText, setDetectedLanguage);
    const userMessage = {
      text: inputText,
      sender: "user",
      language,
    };

    setChatHistory((prev) => [...prev, userMessage]);
    // console.log(chatHistory);
    setInputText("");
  };

  const handleClearAll = () => {
    toast.info(
      <div>
        <p>Are you sure you want to clear chats?</p>
        <button
          onClick={clearChatHistory}
          className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded-md mt-2"
        >
          Confirm
        </button>
      </div>,
      { autoClose: false, theme: "dark", role: "status" }
    );
  };

  const clearChatHistory = () => {
    setChatHistory([]);
    localStorage.removeItem("chatHistory");
    window.location.reload();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent adding a new line in the textarea
      handleSendMessage();
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        pauseOnHover
        theme="dark"
        role="status"
      />
      <div className="px-3 md:px-10 w-full min-h-screen font-primary flex flex-col justify-center items-center">
        <Header />
        <section className="relative max-w-[700px] h-[85vh] md:h-[80vh] w-full animate-fadeIn flex flex-col justify-between shadow-md bg-white rounded-lg text-black mt-20 mb-6 md:mb-0 md:mt-5 px-3 md:px-6 pt-8 pb-5">
          {chatHistory.length > 0 && (
            <div className="absolute top-2 right-3 left-3 flex justify-between items-center">
              <div className="flex gap-1 items-center">
                <Link
                  to="/"
                  aria-label="Home button"
                  className="hover:scale-105 transition duration-300 hover:ease-in-out"
                >
                  <ion-icon
                    className="text-2xl"
                    aria-hidden="true"
                    name="home-outline"
                  ></ion-icon>
                </Link>
                <h3 className="font-semibold flex items-center gap-1 font-main text-2xl tracking-normal ml-2">
                  Chat
                </h3>
              </div>
              <button
                aria-label="Clear chats button"
                onClick={handleClearAll}
                className="hover:scale-105 top-2 right-3 text-red-600 rounded-lg px-2 py-1 transition duration-300 hover:ease-in-out"
              >
                {" "}
                <ion-icon
                  // size="large"
                  className="text-2xl md:text-3xl"
                  aria-hidden="true"
                  name="trash-bin"
                ></ion-icon>
                <span className="sr-only">Clear Chat</span>
              </button>
            </div>
          )}
          {chatHistory.length > 0 ? (
            <section className="overflow-y-auto mt-8 rounded-md overflow-x-hidden">
              {chatHistory.map((msg, index) => (
                <div
                  key={index}
                  className={`flex flex-col mb-3 ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`px-3 py-2 w-[90%] md:w-[70%] animate-textIn rounded-lg mb-2 ${
                      msg.sender === "user"
                        ? "bg-black text-white"
                        : "bg-neutral-200 text-black"
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.language && msg.sender === "user" && (
                    <p className="text-neutral-500 flex text-sm md:text-base items-center mr-2 mb-1.5">
                      <ion-icon
                        className="mr-1 text-sm md:text-lg"
                        size="medium"
                        name="globe-outline"
                      ></ion-icon>
                      Detected Language:{" "}
                      <span className="ml-1"> {msg.language}</span>
                    </p>
                  )}
                  {msg.type == "translation" && msg.sender === "bot" && (
                    <p className="text-neutral-500 flex text-sm md:text-base items-center mr-2 mb-1.5">
                      <ion-icon
                        className="mr-1 text-sm md:text-lg"
                        size="medium"
                        name="language"
                      ></ion-icon>
                      Translated to:{" "}
                      <span className="ml-1"> {msg.languageName}</span>
                    </p>
                  )}
                  <div className="flex flex-col md:flex-row gap-2 mb-3">
                    {msg.text.length > 150 &&
                      msg.sender === "user" &&
                      detectedLanguage == "en" && (
                        <button
                          onClick={() => handleSummarize(index)}
                          disabled={isProcessing || isTranslating}
                          className="px-2 py-1 w-full rounded-md bg-black disabled:cursor-not-allowed disabled:opacity-70 text-white border border-black hover:bg-black/80 transition duration-300 hover:ease-in-out"
                        >
                          {isProcessing ? (
                            <span className="w-fit flex items-center">
                              <img
                                src="/loading-white.svg"
                                className="animate-spin mr-1 w-5 h-5"
                                alt="loading image"
                              />
                              Processing...
                            </span>
                          ) : (
                            "Summarize"
                          )}
                        </button>
                      )}
                    {msg.sender === "user" && (
                      <div className="w-full flex items-center">
                        <select
                          onChange={handleLanguageChange}
                          className="px-1 py-1 rounded-md border border-transparent focus:border-neutral-600 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                          <option selected disabled>
                            Select Language
                          </option>
                          <option value="en">English</option>
                          <option value="pt">Portuguese</option>
                          <option value="es">Spanish</option>
                          <option value="ru">Russian</option>
                          <option value="tr">Turkish</option>
                          <option value="fr">French</option>
                        </select>
                        <button
                          onClick={() => handleTranslate(index)}
                          disabled={isProcessing || isTranslating}
                          className="px-2 py-1 rounded-md border border-neutral-800 ml-2 disabled:cursor-not-allowed disabled:opacity-70 hover:bg-neutral-300 transition duration-300 hover:ease-in-out"
                        >
                          {isTranslating ? (
                            <span className="w-fit flex items-center">
                              <img
                                src="/loading.svg"
                                className="text-black animate-spin mr-1 w-5 h-5"
                                alt="loading image"
                              />
                              Translating...
                            </span>
                          ) : (
                            "Translate"
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </section>
          ) : (
            <Welcome />
          )}

          <section className="mt-3">
            <div className="has-[:focus]:border-neutral-900 w-full border-2 border-neutral-300 flex items-end rounded-xl p-2 gap-2">
              <textarea
                rows={3}
                placeholder="Enter you text here:"
                className="w-full outline-none focus:border-neutral-500 "
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                aria-label="Enter your text"
                onKeyDown={handleKeyDown}
              ></textarea>
              <button
                onClick={handleSendMessage}
                disabled={isProcessing || isTranslating}
                className="text-2xl hover:text-green-700 disabled:cursor-not-allowed disabled:opacity-70 transition duration-300 hover:ease-in-out"
                aria-label="Send message"
              >
                <ion-icon className="p-0" name="send-outline"></ion-icon>
              </button>
            </div>
            <Disclaimer />
          </section>
        </section>
      </div>
    </>
  );
};

export default TextProcessor;
