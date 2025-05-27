import { useState } from 'react';
import { useCart } from '@/context/CartContext';

interface HeaderProps {
  openCart: () => void;
  onSelectCategory: (category: string) => void;
  selectedCategory: string;
}

const categorias = [
  { nome: "Todos", id: "todos" },
  { nome: "Hambúrgueres", id: "hamburgueres" },
  { nome: "Bebidas", id: "bebidas" },
  { nome: "Salgados", id: "salgados" },
  { nome: "Cuscuz", id: "cuscuz" },
  { nome: "Tapioca", id: "tapioca" },
  { nome: "Adicionais", id: "adicionais" }
];

export default function Header({ openCart, onSelectCategory, selectedCategory }: HeaderProps) {
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  // Função para alternar menu no mobile
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Botão de menu no mobile */}
        <button
          className="mr-3 p-2 rounded-md hover:bg-gray-100 focus:outline-none md:hidden"
          onClick={toggleMenu}
          aria-label="Abrir menu"
        >
          <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Logo e Nome */}
        <div className="flex items-center gap-3">
          <img
            src="/android-chrome-192x192.png"
            alt="PedidosFácil Logo"
            className="h-12 w-12 rounded-full object-cover"
            style={{ background: '#fff' }}
          />
          <h1 className="font-sans font-bold text-4xl text-black">Pedidos Fácil</h1>
        </div>

        {/* Menu de categorias */}
        <nav className="hidden md:flex gap-1">
          {categorias.map(cat => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.nome)}
              className={`font-sans text-xs px-3 py-1 rounded-full 
                ${selectedCategory === cat.nome ? 'bg-[#af1a2d] text-white' : 'bg-gray-100 text-gray-800 hover:bg-[#af1a2d] hover:text-white'} 
                transition-colors`}
            >
              {cat.nome}
            </button>
          ))}
        </nav>

        {/* Carrinho */}
        <div className="flex items-center space-x-4">
          <button id="cartButton" className="relative p-2" onClick={openCart}>
            <i className="ri-shopping-cart-2-line text-2xl"></i>
            <span className="absolute -top-1 -right-1 bg-[#af1a2d] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {totalItems}
            </span>
          </button>
        </div>
      </div>

      {/* Menu de categorias no mobile */}
      {menuOpen && (
        <nav className="md:hidden bg-white shadow-md border-t flex flex-wrap gap-1 px-4 py-2 justify-center">
          {categorias.map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                onSelectCategory(cat.nome);
                setMenuOpen(false); // Fecha menu após seleção
              }}
              className={`font-sans text-xs px-3 py-1 rounded-full 
                ${selectedCategory === cat.nome ? 'bg-[#af1a2d] text-white' : 'bg-gray-100 text-gray-800 hover:bg-[#af1a2d] hover:text-white'} 
                transition-colors`}
            >
              {cat.nome}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}