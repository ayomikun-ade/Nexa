const Header = () => {
  return (
    <header className="fixed  top-0 right-0 left-0 flex px-2 md:px-0 py-3 mx-auto w-[95%] md:w-[80%] h-[10vh] items-center justify-between">
      <h2 className="font-head text-6xl font-semibold italic ">Nexa</h2>
      <button className="text-4xl hover:text-[#737475] transition duration-300 hover:ease-in-out">
        <ion-icon name="logo-github"></ion-icon>
      </button>
    </header>
  );
};

export default Header;
