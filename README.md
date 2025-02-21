# **Nexa | AI Text Processor**

🚀 A web-based text processing tool leveraging Chrome's AI APIs to provide text summarization, translation, and language detection. Built with **React** and `useState` for state management, it ensures accessibility, responsiveness, and proper error handling.

---

## **Table of Contents**

- [Features](#features)
- [Demo](#demo)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## **Features**

✅ AI-powered **Text Summarization**  
✅ **Language Detection** for text input  
✅ **Text Translation** into multiple languages  
✅ **Real-time processing** using Chrome AI APIs  
✅ **Responsive UI** for mobile & desktop  
✅ **Error handling** with toast notifications

---

## **Demo**

🔗 [Live Demo](https://nexa-three.vercel.app) _(Add deployment link here)_

---

## **Tech Stack**

- **Frontend**: React
- **APIs**: Chrome AI APIs
- **Styling**: Tailwind CSS
- **Notifications**: React-Toastify

---

## **Installation**

### **1. Clone the Repository**

```sh
git clone https://github.com/ayomikun-ade/nexa.git
cd nexa
```

### **2. Install Dependencies**

```sh
npm install
```

### **3. Start the Development Server**

```sh
npm run dev
```

The application will be available at `http://localhost:5173`.

### **4. Setting up Chrome AI on localhost**

For information on setting up your browser on localhost, read the official Chrome AI API docs:

- [General Overview of the APIs](https://developer.chrome.com/docs/ai/)
- [Translator API](https://developer.chrome.com/docs/ai/tranlator-api)
- [Language Detection API](https://developer.chrome.com/docs/ai/language-detection)
- [Summarization API](https://developer.chrome.com/docs/ai/summarizer-api)

---

## **Usage**

1. Enter text in the input field and send.
2. The website automatically detects the language of the message sent.
3. Choose an action: **Summarize** (only shows when text is more than 150 characters) or **Translate**.
4. View the processed result instantly.

---

## **Error Handling**

- If the browser **does not support Chrome AI APIs**, an error message will be displayed via toast notifications.
- Any API errors will be handled gracefully with alerts and fallback options.

---

## **Contributing**

Want to improve this project? Contributions are welcome!

### **Steps to Contribute:**

1. Fork the repository.
2. Create a new branch (`feat/new-functionality`).
3. Commit your changes (`git commit -m "Add new feature"`).
4. Push to your branch (`git push origin feat/new-functionality`).
5. Create a **Pull Request**.

---

## **License**

📝 This project is licensed under the **MIT License** – free to use and modify.

---

## **Contact**

- [Email](mailto:ayoadeosun10@gmail.com)
- [GitHub](https://github.com/ayomikun-ade)

**Ciao!**
