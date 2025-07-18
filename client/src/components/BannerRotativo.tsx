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
    <div className="w-full flex flex-col justify-center items-center overflow-hidden mb-6 relative">
      <div
        className="flex transition-transform duration-700"
        style={{
          transform: `translateX(-${index * 100}%)`,
          width: `${banners.length * 100}%`,
        }}
      >
        {banners.map((banner, i) => (
          <div key={i} className="w-full flex-shrink-0 flex justify-center">
            <div className="w-full max-w-4xl h-56 md:h-72 flex items-center bg-white rounded-2xl shadow-lg px-0 relative overflow-hidden">
              <img
                src={banner.image}
                alt={banner.title}
                className="h-full w-full object-cover rounded-2xl absolute top-0 left-0 z-0"
              />
              <div className="relative z-10 w-full h-full flex flex-col justify-center items-start bg-black/40 p-8 rounded-2xl">
                <div className="font-bold text-2xl md:text-4xl text-white mb-2 drop-shadow">
                  {banner.title}
                </div>
                {banner.subtitle && (
                  <div className="text-white text-lg mb-4 drop-shadow">
                    {banner.subtitle}
                  </div>
                )}
                {/* Exemplo de botão de ação */}
                <button className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition shadow">
                  Comprar agora
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Indicadores (bolinhas) */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {banners.map((_, i) => (
          <button
            key={i}
            className={`w-3 h-3 rounded-full transition-all duration-300 border border-white/70 ${
              index === i ? "bg-white/80" : "bg-white/40"
            }`}
            onClick={() => setIndex(i)}
            aria-label={`Ir para o banner ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
