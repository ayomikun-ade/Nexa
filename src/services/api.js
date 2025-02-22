// services/apiFunctions.js
import { isChrome, isMobile } from "react-device-detect";
import { toast } from "react-toastify";

//function to handle language detection
export const detectLanguage = async (text, setDetectedLanguage) => {
  try {
    const detector = await self.ai.languageDetector.create();
    const result = await detector.detect(text);
    const detectedCode = result[0].detectedLanguage;

    // gets original name of language code
    const languageName =
      new Intl.DisplayNames(["en"], { type: "language" }).of(detectedCode) ||
      "Unknown Language";

    console.log(languageName);
    setDetectedLanguage(detectedCode);
    return languageName;
  } catch (error) {
    console.error("Language detection error:", error);

    if (!isChrome || isMobile) {
      toast.error(
        "Language Detection API isn't supported on this device or browser!",
        {
          position: "top-center",
          autoClose: false,
        }
      );
    } else if (error == "Model not available") {
      toast.error("Language Detection API is not supported on your browser.");
    } else if (
      error ==
      "TypeError: Cannot read properties of undefined (reading 'create')"
    ) {
      toast.error("Language detection is not supported");
    } else {
      toast.error("Error detecting language!");
    }
  }
};

//function to handle translation of text
export const translateText = async (
  text,
  detectedLanguage,
  targetLanguage
  // setIsTranslating
) => {
  console.log(detectedLanguage, targetLanguage);
  if (detectedLanguage === targetLanguage) {
    toast.error("Can't translate to the same language");
    return;
  }

  // setIsTranslating(true);

  try {
    const translator = await self.ai.translator.create({
      sourceLanguage: detectedLanguage,
      targetLanguage,
    });

    const translatedResult = await translator.translate(text);
    return translatedResult;
  } catch (error) {
    console.error("Translation error:", error);

    if (!isChrome || isMobile) {
      toast.error("Translator API isn't supported on this device or browser!", {
        position: "top-center",
        autoClose: false,
      });
    } else if (
      error.message ===
      "Unable to create translator for the given source and target language."
    ) {
      toast.error("Unsupported Languages Provided!");
    } else {
      toast.error("Error in translation.");
    }
  }
  // finally {
  //   setIsTranslating(false);
  // }
};

// function to handle summarization of text
export const summarizeText = async (text, setIsProcessing) => {
  setIsProcessing(true);

  // setting config parameters for the summarize api
  const options = {
    type: "key-points",
    format: "plain-text",
    length: "short",
  };

  try {
    const summarizer = await self.ai.summarizer.create(options);
    let output = await summarizer.summarize(text);
    output = output
      .replace(/\*\*/g, "")
      .replace(/\*/g, "")
      .replace(/-/g, "\n")
      .replace(/\s+/g, " ")
      .trim();

    return output;
  } catch (error) {
    console.error("Summarization error:", error);
    if (!isChrome || isMobile) {
      toast.error("Summarize API isn't supported on this device or browser!", {
        position: "top-center",
        autoClose: false,
      });
    } else if (error == "InvalidStateError: The session cannot be created.") {
      toast.error("Summarization AI unsupported by browser!");
    } else {
      toast.error("Summarization failed!");
    }
    return "";
  } finally {
    setIsProcessing(false);
  }
};
