import { Link } from "react-router";

const Header = () => {
  return (
    <header className="fixed  top-0 right-0 left-0 flex px-2 md:px-0 py-3 z-10 backdrop-blur-sm rounded-lg mx-auto w-[95%] md:w-[80%] h-[10vh] items-center justify-between">
      <h2 className="font-main text-4xl md:text-6xl font-semibold ">
        <Link
          className="focus-visible:outline-neutral-300"
          aria-label="Site logo and link to landing/home page"
          to="/"
        >
          nexa
        </Link>
      </h2>
      <Link
        to="https://www.github.com/ayomikun-ade/nexa"
        target="_blank"
        aria-label="link to github repository of website"
        className="text-4xl hover:text-[#737475] transition duration-300 hover:ease-in-out"
      >
        <ion-icon aria-hidden="true" name="logo-github"></ion-icon>
      </Link>
    </header>
  );
};

export default Header;
