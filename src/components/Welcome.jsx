const Welcome = () => {
  return (
    <div className="text-black text-center animate-textIn flex flex-col justify-center items-center w-full h-full">
      <h2 className="font-main text-3xl md:text-5xl font-semibold ">
        Welcome to Nexa
      </h2>
      <p className="text-neutral-800 text-base md:text-lg mb-2">
        You personal bridge between Languages
      </p>
      <img src="/hand-wave.svg" className="w-40 h-40" alt="hand waving" />
    </div>
  );
};

export default Welcome;
