import { toast, ToastContainer } from "react-toastify";
import Header from "../components/Header";
import { useEffect, useState } from "react";

const TextProcessor = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [inputText, setInputText] = useState("");
  // const [outputText, setOutputText] = useState("");
  const [detectedLanguage, setDetectedLanguage] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  // const [translation, setTranslation] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    if ("ai" in self && "languageDetector" in self.ai) {
      console.log("Language Detection API is supported");
    } else {
      console.log("Language Detection API is not supported");
    }

    if (!("ai" in self && "translator" in self.ai)) {
      console.log("Translator API is not supported");
      return;
    }
  }, []);

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
      alert("Error detecting language: " + error.message);
    }
  };

  const translateText = async (text, targetLanguage) => {
    console.log(detectedLanguage, targetLanguage);
    setIsTranslating(true);
    try {
      const translator = await self.ai.translator.create({
        sourceLanguage: detectedLanguage,
        targetLanguage,
      });
      const translatedResult = await translator.translate(text);
      console.log(detectedLanguage, targetLanguage);
      // setTranslation(translatedResult);
      console.log(translatedResult);
      return translatedResult;
    } catch (error) {
      console.error("Translation error:", error);
      if (
        error.message ==
        "Unable to create translator for the given source and target language."
      ) {
        toast.error("Unsupported Language Provided!");
      }
      //   alert("Error translating text: " + error.message);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const handleTranslate = async (index) => {
    const message = chatHistory[index];
    const translatedText = await translateText(message.text, selectedLanguage);
    if (translatedText) {
      setChatHistory((prev) => [
        ...prev,
        { text: translatedText, sender: "bot", type: "translation" },
      ]);
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;
    // setOutputText(inputText);

    // const userMessage = { text: inputText, sender: "user", language };
    // setChatHistory((prev) => [...prev, userMessage]);
    // setInputText("");

    const language = await detectLanguage(inputText);
    const userMessage = {
      text: inputText,
      sender: "user",
      language,
    };

    setChatHistory((prev) => [...prev, userMessage]);
    setInputText("");

    // const trans = await handleTranslate();
    // let response;

    // if (trans.length > 0) {
    //   response = `To ${selectedLanguage}: ${translation}`;
    // }

    // const botResponse = { text: response, sender: "bot" };
    // setChatHistory((prev) => [...prev, botResponse]);
  };

  return (
    <>
      <ToastContainer />
      <div className="px-6 md:px-10 w-full min-h-screen font-primary flex flex-col justify-center items-center">
        <Header />
        <section className="max-w-[700px] min-h-[600px] md:h-[800px] w-full animate-fadeIn flex flex-col justify-between shadow-md bg-white rounded-lg text-black mt-5 px-6 py-8">
          <section className="overflow-y-scroll">
            {chatHistory.map((msg, index) => (
              <div
                key={index}
                className={`flex flex-col mb-3 ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`px-3 py-2 w-[90%] md:w-[70%] rounded-lg mb-2 ${
                    msg.sender === "user"
                      ? "bg-black text-white"
                      : "bg-neutral-200 text-black"
                  }`}
                >
                  {msg.text}
                </div>
                {msg.language && msg.sender === "user" && (
                  <p className="text-neutral-500 mr-2">
                    Detected Language: <span>{msg.language}</span>
                  </p>
                )}
                <div className="flex flex-col md:flex-row gap-2 mb-3">
                  {msg.text.length > 150 && msg.sender === "user" && (
                    <button className="px-2 py-1 w-fit rounded-md bg-black text-white border border-black hover:bg-black/80 transition duration-300 hover:ease-in-out">
                      Summarize
                    </button>
                  )}
                  {msg.sender === "user" && (
                    <div className="w-full">
                      <button
                        onClick={() => handleTranslate(index)}
                        disabled={isTranslating}
                        className="px-2 py-1 rounded-md border border-neutral-800 mr-2 hover:bg-neutral-300 transition duration-300 hover:ease-in-out"
                      >
                        {isTranslating ? "Translating..." : "Translate"}
                      </button>
                      <select
                        onChange={handleLanguageChange}
                        className="outline-none bg-transparent"
                      >
                        <option value="en">English</option>
                        <option value="pt">Portuguese</option>
                        <option value="es">Spanish</option>
                        <option value="ru">Russian</option>
                        <option value="tr">Turkish</option>
                        <option value="fr">French</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </section>

          <section>
            <div className="has-[:focus]:border-neutral-500 w-full border border-neutral-300 flex items-end rounded-lg p-2 gap-2">
              <textarea
                rows={3}
                placeholder="Enter you text here:"
                className="w-full outline-none focus:border-neutral-500 "
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              ></textarea>
              <button
                onClick={handleSendMessage}
                className="text-2xl hover:text-[#737475] transition duration-300 hover:ease-in-out"
              >
                <ion-icon className="p-0" name="send-outline"></ion-icon>
              </button>
            </div>
          </section>
        </section>
      </div>
    </>
  );
};

export default TextProcessor;
