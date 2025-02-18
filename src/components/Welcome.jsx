const Welcome = () => {
  return (
    <div className="text-black text-center flex flex-col justify-center items-center w-full h-full">
      <h2 className="font-head text-4xl font-semibold ">Welcome to Nexa</h2>
      <p className="text-neutral-800">You personal bridge between Languages</p>
      <img src="/hand-wave.svg" className="w-40 h-40" alt="hand waving" />
    </div>
  );
};

export default Welcome;
