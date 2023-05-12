function Home() {
  return (
    <div className="flex h-full p-4 justify-center">
      <div className="bg-home-pattern bg-cover bg-left-top w-full max-w-4xl gap-12 text-white bg-sky-900 rounded-3xl overflow-hidden">
        <div className="w-full h-full flex flex-col justify-center gap-12 bg-sky-900 bg-opacity-75 p-8">
          <h1 className="text-center text-5xl">
            Welcome to <span className="text-6xl font-bold">vision.gg</span>
          </h1>
          <p className="text-center">
            Please use the navigation bar to explore the site!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
