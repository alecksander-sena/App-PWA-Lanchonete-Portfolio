import { useEffect, useState } from "react";

type Banner = {
  image: string;
  title: string;
  subtitle: string;
  button: string;
};

export default function BannerCarousel({ banners }: { banners: Banner[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [banners.length]);

  if (banners.length === 0) return null;

  return (
    <div className="w-full flex justify-center items-center mb-4">
      <div
        className="w-full max-w-4xl h-64 sm:h-56 md:h-64 lg:h-72 xl:h-80 bg-cover bg-center rounded-2xl shadow-lg flex items-center justify-center transition duration-500 ease-in-out"
        style={{ backgroundImage: `url(${banners[index].image})` }}
      >
        <div className="bg-black bg-opacity-40 p-2 sm:p-4 rounded-xl text-white text-center w-full">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
            {banners[index].title}
          </h2>
          <p className="mb-4 text-sm sm:text-base md:text-lg">
            {banners[index].subtitle}
          </p>
          <button className="bg-yellow-400 text-black px-2 py-1 sm:px-4 sm:py-2 rounded-lg hover:bg-yellow-300 transition text-xs sm:text-base">
            {banners[index].button}
          </button>
        </div>
      </div>
    </div>
  );
}