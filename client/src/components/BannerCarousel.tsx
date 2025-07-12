import { useEffect, useState } from "react"

type Banner = {
  image: string
  title: string
  subtitle: string
  button: string
}

export default function BannerCarousel() {
  const [banners, setBanners] = useState<Banner[]>([])
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const dia = new Date().getDay()

    const ofertaDoDia: Banner = {
      image: `/banners/oferta-${dia}.jpg`,
      title: "🔥 Oferta do Dia",
      subtitle: `Desconto especial só hoje!`,
      button: "Comprar com desconto"
    }

    const ultimosPedidos = JSON.parse(localStorage.getItem("ultimosPedidos") || "[]")
    const bannerUltimosPedidos = ultimosPedidos.length > 0 ? {
      image: "/banners/ultimos-pedidos.jpg",
      title: "📝 Pedidos Recentes",
      subtitle: "Veja os produtos que você amou",
      button: "Ver meus pedidos"
    } : null

    const combosDisponiveis = true
    const bannerCombos = combosDisponiveis ? {
      image: "/banners/combos.jpg",
      title: "🍔 Combos Especiais",
      subtitle: "Monte seu combo com desconto",
      button: "Montar combo"
    } : null

    const bannersFiltrados = [
      ofertaDoDia,
      bannerUltimosPedidos,
      bannerCombos
    ].filter(Boolean) as Banner[]

    setBanners(bannersFiltrados)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % banners.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [banners])

  if (banners.length === 0) return null

  return (
    <div className="w-full flex justify-center items-center mb-4">
      <div
        className="w-full max-w-4xl h-64 bg-cover bg-center rounded-2xl shadow-lg flex items-center justify-center transition duration-500 ease-in-out"
        style={{ backgroundImage: `url(${banners[index].image})` }}
      >
        <div className="bg-black bg-opacity-40 p-4 rounded-xl text-white text-center">
          <h2 className="text-3xl font-bold mb-2">{banners[index].title}</h2>
          <p className="mb-4">{banners[index].subtitle}</p>
          <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-300 transition">
            {banners[index].button}
          </button>
        </div>
      </div>
    </div>
  )
}