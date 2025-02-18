import { ToastContainer } from "react-toastify";
import Header from "../components/Header";
import { useEffect, useState } from "react";

const TextProcessor = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    if ("ai" in self && "languageDetector" in self.ai) {
      console.log("Language Detection API is supported");
    } else {
      console.log("Language Detection API is not supported");
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
      // setDetectedLanguage(languageName);
      return languageName;
    } catch (error) {
      console.error("Language detection error:", error);
      alert("Error detecting language: " + error.message);
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const language = await detectLanguage(inputText);

    const userMessage = { text: inputText, sender: "user", language };
    setChatHistory((prev) => [...prev, userMessage]);
    setInputText("");

    // Simulate bot response (Replace with API call if needed)
    setTimeout(() => {
      const botResponse = { text: `Response to: ${inputText}`, sender: "bot" };
      setChatHistory((prev) => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <>
      <ToastContainer />
      <div className="px-6 md:px-10 w-full min-h-screen font-primary flex flex-col justify-center items-center">
        <Header />
        <section className="max-w-[700px] h-[800px] w-full flex flex-col justify-between shadow-md bg-white rounded-lg text-black mt-5 px-6 py-8">
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
                {msg.language && (
                  <p className="text-neutral-500 mr-2">
                    Detected Language: <span>{msg.language}</span>
                  </p>
                )}
              </div>
            ))}
          </section>

          <section>
            <div className="flex flex-col md:flex-row gap-2 mb-3">
              <button className="px-2 py-1 w-fit rounded-md bg-black text-white border border-black hover:bg-black/80 transition duration-300 hover:ease-in-out">
                Summarize
              </button>
              <div className="w-full">
                <button className="px-2 py-1 rounded-md border border-neutral-800 mr-2 hover:bg-neutral-300 transition duration-300 hover:ease-in-out">
                  Translate
                </button>
                <select className="outline-none bg-transparent">
                  <option value="en">English</option>
                  <option value="pt">Portuguese</option>
                  <option value="es">Spanish</option>
                  <option value="ru">Russian</option>
                  <option value="tr">Turkish</option>
                  <option value="fr">French</option>
                </select>
              </div>
            </div>
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
