import { useEffect, useState } from "react";

type Banner = {
  image: string;
  title: string;
  subtitle?: string;
};

interface BannerRotativoProps {
  banners: Banner[];
}

export default function BannerRotativo({ banners }: BannerRotativoProps) {
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
            <div className="w-full max-w-2xl h-28 flex items-center bg-white rounded-xl shadow px-4">
              <img
                src={banner.image}
                alt={banner.title}
                className="h-20 w-28 object-cover rounded-lg mr-4"
              />
              <div>
                <div className="font-bold text-lg text-gray-900">{banner.title}</div>
                {banner.subtitle && (
                  <div className="text-gray-700 text-sm">{banner.subtitle}</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const banners = [
  {
    image: "https://via.placeholder.com/800x200?text=Banner+1",
    title: "Banner 1",
    subtitle: "Subtitle for Banner 1",
  },
  {
    image: "https://via.placeholder.com/800x200?text=Banner+2",
    title: "Banner 2",
    subtitle: "Subtitle for Banner 2",
  },
  {
    image: "https://via.placeholder.com/800x200?text=Banner+3",
    title: "Banner 3",
    subtitle: "Subtitle for Banner 3",
  },
];

<BannerRotativo banners={banners} />;