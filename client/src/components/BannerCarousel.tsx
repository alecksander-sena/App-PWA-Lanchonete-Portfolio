import { useEffect, useState } from "react";

export default function BannerCarousel({ banners }: { banners: JSX.Element[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % banners.length);
    }, 4000); // Troca a cada 4 segundos
    return () => clearInterval(timer);
  }, [banners.length]);

  return (
    <div className="w-full flex justify-center items-center mb-4">
      <div className="w-full max-w-xl">
        {banners[index]}
      </div>
    </div>
  );
}