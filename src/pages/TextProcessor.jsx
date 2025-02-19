import { toast, ToastContainer } from "react-toastify";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import Welcome from "../components/Welcome";
import { Link } from "react-router";

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

  const detectLanguage = async (text) => {
    try {
      const detector = await self.ai.languageDetector.create();
      const result = await detector.detect(text);

      const detectedCode = result[0].detectedLanguage;
      const languageName =
        new Intl.DisplayNames(["en"], { type: "language" }).of(detectedCode) ||
        "Unknown Language";

      console.log(languageName);
      setDetectedLanguage(detectedCode);
      return languageName;
    } catch (error) {
      console.error("Language detection error:", error);
      if (error == "Model not available") {
        toast.error(
          "Error detecting language: The AI Model is not available on your browser"
        );
      } else {
        toast.error("Error detecting language!");
      }
    }
  };

  const translateText = async (text, targetLanguage) => {
    console.log(detectedLanguage, targetLanguage);
    if (detectedLanguage == targetLanguage) {
      toast.error("Can't translate to the same language");
      return;
    }

    setIsTranslating(true);

    try {
      const translator = await self.ai.translator.create({
        sourceLanguage: detectedLanguage,
        targetLanguage,
      });

      const translatedResult = await translator.translate(text);
      console.log(detectedLanguage, targetLanguage);

      return translatedResult;
    } catch (error) {
      console.error("Translation error:", error);
      if (
        error.message ==
        "Unable to create translator for the given source and target language."
      ) {
        toast.error("Unsupported Language Provided!");
      } else {
        toast.error("Error in translation:" + error.message);
      }
    } finally {
      setIsTranslating(false);
    }
  };

  const summarizeText = async (text) => {
    setIsProcessing(true);
    try {
      const summarizer = await self.ai.summarizer.create();
      const output = await summarizer.summarize(text);
      return `Summary: ${output}`;
    } catch (error) {
      console.error("Summarization error:", error);
      toast.error("Summarization failed!");
      return "";
    } finally {
      setIsProcessing(false);
    }
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const handleTranslate = async () => {
    const message = chatHistory[chatHistory.length - 1];
    const translatedText = await translateText(message.text, selectedLanguage);
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

  const handleSummarize = async () => {
    const message = chatHistory[chatHistory.length - 1];
    const summarizedText = await summarizeText(message.text);
    if (summarizedText) {
      setChatHistory((prev) => [
        ...prev,
        { text: summarizedText, sender: "bot", type: "summary" },
      ]);
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const language = await detectLanguage(inputText);
    const userMessage = {
      text: inputText,
      sender: "user",
      language,
    };

    setChatHistory((prev) => [...prev, userMessage]);
    console.log(chatHistory);
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

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        pauseOnHover
        theme="dark"
        role="status"
      />
      <div className="px-6 md:px-10 w-full min-h-screen font-primary flex flex-col justify-center items-center">
        <Header />
        <section className="relative max-w-[700px] min-h-[600px] md:h-[800px] w-full animate-fadeIn flex flex-col justify-between shadow-md bg-white rounded-lg text-black mt-28 mb-6 md:mb-0 md:mt-5 px-6 pt-8 pb-5">
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
                <h3 className="font-semibold font-main text-2xl tracking-normal ml-2">
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
                  size="large"
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
                    <p className="text-neutral-500 flex items-center mr-2 mb-1.5">
                      <ion-icon
                        className="mr-1 text-lg"
                        size="medium"
                        name="globe-outline"
                      ></ion-icon>
                      Detected Language:{" "}
                      <span className="ml-1"> {msg.language}</span>
                    </p>
                  )}
                  {msg.type == "translation" && msg.sender === "bot" && (
                    <p className="text-neutral-500 flex items-center mr-2 mb-1.5">
                      <ion-icon
                        className="mr-1 text-lg"
                        size="medium"
                        name="language"
                      ></ion-icon>
                      Translated to:{" "}
                      <span className="ml-1"> {msg.languageName}</span>
                    </p>
                  )}
                </div>
              ))}
            </section>
          ) : (
            <Welcome />
          )}

          <section className="mt-3">
            {chatHistory.length > 0 && (
              <div className="flex flex-col md:flex-row gap-2 mb-3">
                {chatHistory[chatHistory.length - 1]?.text.length > 150 &&
                  chatHistory[chatHistory.length - 1].sender === "user" &&
                  detectedLanguage == "en" && (
                    <button
                      onClick={() =>
                        handleSummarize(chatHistory[chatHistory.length - 1])
                      }
                      disabled={isProcessing || isTranslating}
                      className="px-2 py-1 w-fit rounded-md bg-black disabled:cursor-not-allowed disabled:opacity-70 text-white border border-black hover:bg-black/80 transition duration-300 hover:ease-in-out"
                    >
                      {isProcessing ? (
                        <span className="w-fit flex items-center">
                          <ion-icon
                            className="text-white animate-spin"
                            name="refresh-outline"
                          ></ion-icon>
                          Processing...
                        </span>
                      ) : (
                        "Summarize"
                      )}
                    </button>
                  )}
                {chatHistory[chatHistory.length - 1].sender === "user" && (
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
                      onClick={() =>
                        handleTranslate(chatHistory[chatHistory.length - 1])
                      }
                      disabled={isProcessing || isTranslating}
                      className="px-2 py-1 rounded-md border border-neutral-800 ml-2 disabled:cursor-not-allowed disabled:opacity-70 hover:bg-neutral-300 transition duration-300 hover:ease-in-out"
                    >
                      {isTranslating ? (
                        <span className="w-fit">
                          <ion-icon
                            className="text-black animate-spin"
                            name="refresh-outline"
                          ></ion-icon>
                          Translating...
                        </span>
                      ) : (
                        "Translate"
                      )}
                    </button>
                  </div>
                )}
              </div>
            )}
            <div className="has-[:focus]:border-neutral-900 w-full border-2 border-neutral-300 flex items-end rounded-lg p-2 gap-2">
              <textarea
                rows={3}
                placeholder="Enter you text here:"
                className="w-full outline-none focus:border-neutral-500 "
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              ></textarea>
              <button
                onClick={handleSendMessage}
                disabled={isProcessing || isTranslating}
                className="text-2xl hover:text-[#737475] disabled:cursor-not-allowed disabled:opacity-70 transition duration-300 hover:ease-in-out"
              >
                <ion-icon className="p-0" name="send-outline"></ion-icon>
              </button>
            </div>
            <p className="text-center text-sm text-neutral-500 mt-2">
              Nexa can make mistakes. Check important info.
            </p>
          </section>
        </section>
      </div>
    </>
  );
};

export default TextProcessor;
