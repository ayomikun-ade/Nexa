// utils/apiFunctions.js
import { toast } from "react-toastify";

export const detectLanguage = async (text, setDetectedLanguage) => {
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

export const translateText = async (
  text,
  detectedLanguage,
  targetLanguage,
  setIsTranslating
) => {
  console.log(detectedLanguage, targetLanguage);
  if (detectedLanguage === targetLanguage) {
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
    return translatedResult;
  } catch (error) {
    console.error("Translation error:", error);
    if (
      error.message ===
      "Unable to create translator for the given source and target language."
    ) {
      toast.error("Unsupported Language Provided!");
    } else {
      toast.error("Error in translation. Try again!");
    }
  } finally {
    setIsTranslating(false);
  }
};

export const summarizeText = async (text, setIsProcessing) => {
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
