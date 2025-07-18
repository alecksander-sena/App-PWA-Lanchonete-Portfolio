import { useEffect, useState } from "react";

interface BannerProps {
  children: React.ReactNode;
}

function Banner({ children }: BannerProps) {
  return (
    <div className="w-full max-w-2xl h-28 flex items-center justify-center bg-white rounded-xl shadow transition-transform duration-700 ease-in-out px-4">
      {children}
    </div>
  );
}

export default function BannerRotativo({ banners }: { banners: React.ReactNode[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [banners.length]);

  return (
    <div className="w-full flex justify-center items-center overflow-hidden mb-6 relative">
      <div
        className="flex transition-transform duration-700"
        style={{
          transform: `translateX(-${index * 100}%)`,
          width: `${banners.length * 100}%`,
        }}
      >
        {banners.map((banner, i) => (
          <div key={i} className="w-full flex-shrink-0 flex justify-center">
            <Banner>{banner}</Banner>
          </div>
        ))}
      </div>
    </div>
  );
}