import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Search } from "lucide-react";

// Use o array de categorias global!
import { categories } from "@/lib/firebase";

interface HeaderProps {
  openCart: () => void;
  onSelectCategory: (category: string) => void;
  selectedCategory: string;
  onLogin: () => void;
  isLoggedIn: boolean;
  userName?: string;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

// Ordenação: "Todos" primeiro, depois "Combos", depois o resto em ordem alfabética
const categoriasOrdenadas = [
  categories.find((cat) => cat === "Todos")!,
  categories.find((cat) => cat === "Combos")!,
  ...categories.filter((cat) => cat !== "Todos" && cat !== "Combos").sort((a, b) => a.localeCompare(b)),
];

export default function Header({
  openCart,
  onSelectCategory,
  selectedCategory,
  onLogin,
  isLoggedIn,
  userName,
  searchQuery,
  setSearchQuery,
}: HeaderProps) {
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-2 py-2 flex flex-wrap items-center gap-x-2 gap-y-2 justify-between min-w-0">
        {/* BOTÃO MENU HAMBÚRGUER */}
        <button
          className="p-2 rounded-md hover:bg-gray-100 focus:outline-none flex-shrink-0 md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Abrir menu"
        >
          <svg
            width="28"
            height="28"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* LOGO E NOME */}
        <div className="flex items-center gap-2 flex-shrink-0 min-w-0">
          <img
            src="/android-chrome-192x192.png"
            alt="PedidosFácil Logo"
            className="h-10 w-10 rounded-full object-cover"
            style={{ background: "#fff" }}
          />
          <span className="font-sans font-bold text-lg md:text-2xl text-black truncate">
            Bom Sabor
          </span>
        </div>

        {/* MENU DE CATEGORIAS - DESKTOP APENAS */}
        <nav className="hidden md:flex flex-wrap gap-1 mx-2 min-w-0">
          {categoriasOrdenadas.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`font-sans text-xs px-3 py-1 rounded-full transition-colors truncate max-w-[110px] ${
                selectedCategory === cat
                  ? "bg-[#af1a2d] text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-[#af1a2d] hover:text-white"
              }`}
              style={{ minWidth: 0 }}
            >
              {cat}
            </button>
          ))}
        </nav>

        {/* ESPAÇO FLEXÍVEL PARA EMPURRAR */}
        <div className="flex-1 min-w-0" />

        {/* AÇÕES À DIREITA: CARRINHO + BUSCA + LOGIN */}
        <div className="flex items-center gap-2 flex-shrink-0 min-w-0">
          {/* CARRINHO - SÓ NO DESKTOP */}
          <div className="hidden lg:block">
            <button
              id="cartButton"
              className="relative p-2"
              onClick={openCart}
            >
              <img
                src="/carrinho.png"
                alt="Carrinho"
                className="h-8 w-8 object-contain"
              />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#af1a2d] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold border-2 border-white">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          {/* BARRA DE BUSCA - DESKTOP: AGORA AO LADO DO CARRINHO */}
          <div className="hidden md:block relative w-40 md:w-64 min-w-0">
            <input
              type="text"
              placeholder="Buscar produtos..."
              className="pl-10 pr-4 py-2 w-full border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#af1a2d]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>

          {/* ÍCONE DE BUSCA NO MOBILE */}
          <button
            className="md:hidden ml-2 p-2 rounded-md hover:bg-gray-100"
            onClick={() => setMobileSearch((v) => !v)}
            aria-label="Buscar"
          >
            <Search size={22} />
          </button>
        </div>
      </div>

      {/* BARRA DE BUSCA MOBILE (expandida ao clicar na lupa) */}
      {mobileSearch && (
        <div className="md:hidden px-4 py-2 bg-white border-b">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar produtos..."
              className="pl-10 pr-4 py-2 w-full border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#af1a2d]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
        </div>
      )}

      {/* MENU HAMBÚRGUER - SIDE MENU */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-40"
            onClick={() => setMenuOpen(false)}
          ></div>
          <aside className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 flex flex-col pt-8 px-4">
            <button
              className="absolute top-4 right-4 p-2 rounded hover:bg-gray-100"
              onClick={() => setMenuOpen(false)}
              aria-label="Fechar menu"
            >
              <svg
                width="28"
                height="28"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
              </svg>
            </button>
            <nav className="flex flex-col gap-2 mt-6">
              {categoriasOrdenadas.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    onSelectCategory(cat);
                    setMenuOpen(false);
                  }}
                  className={`w-full text-left font-sans px-4 py-2 rounded-md text-base transition-colors ${
                    selectedCategory === cat
                      ? "bg-[#af1a2d] text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-[#af1a2d] hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </nav>
          </aside>
        </>
      )}
    </header>
  );
}