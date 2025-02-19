import { Link } from "react-router";

const Header = () => {
  return (
    <header className="fixed  top-0 right-0 left-0 flex px-2 md:px-0 py-3 z-10 backdrop-blur-sm rounded-lg mx-auto w-[95%] md:w-[80%] h-[10vh] items-center justify-between">
      <h2 className="font-main text-4xl md:text-6xl font-semibold ">
        <Link to="/">nexa</Link>
      </h2>
      <button className="text-4xl hover:text-[#737475] transition duration-300 hover:ease-in-out">
        <a href="https://www.github.com/ayomikun-ade/nexa" target="_blank">
          <ion-icon name="logo-github"></ion-icon>
        </a>
      </button>
    </header>
  );
};

export default Header;
