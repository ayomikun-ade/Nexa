import { ToastContainer } from "react-toastify";
import Header from "../components/Header";

const TextProcessor = () => {
  return (
    <>
      <ToastContainer />
      <div className="px-4 md:px-10 w-full min-h-screen font-primary flex flex-col justify-center items-center">
        <Header />
        <section className="max-w-[700px] min-h-[600px] w-full h-full flex flex-col justify-between shadow-md bg-white rounded-lg text-black px-5 py-5">
          <section className="">
            <div className="flex flex-col items-end">
              <div className="bg-black text-white px-2 py-1 w-[90%] md:w-[70%] rounded-lg mb-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque,
                aperiam.
              </div>
              <p className="text-neutral-500 mr-2">
                Detected Language: <span>English</span>
              </p>
            </div>
            <div className="bg-neutral-200 text-black px-2 py-1 w-[90%] md:w-[70%] rounded-lg my-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
              accusantium nulla delectus magni corrupti id.
            </div>
          </section>

          <section>
            <div className="flex flex-col md:flex-row gap-2 mb-3">
              <button className="px-2 py-1 w-fit rounded-md border border-neutral-800 hover:bg-neutral-300 transition duration-300 hover:ease-in-out">
                Summarize
              </button>
              <div className="w-full">
                <button className="px-2 py-1 rounded-md border border-neutral-800 mr-2 hover:bg-neutral-300 transition duration-300 hover:ease-in-out">
                  Translate
                </button>
                <select className="outline-none">
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
              ></textarea>
              <button className="text-2xl hover:text-[#737475] transition duration-300 hover:ease-in-out">
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
