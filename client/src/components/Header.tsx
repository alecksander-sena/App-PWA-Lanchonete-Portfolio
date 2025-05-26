// client/src/components/Header.tsx
import { useCart } from '@/context/CartContext';

interface HeaderProps {
  openCart: () => void;
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

export default function Header({ openCart }: HeaderProps) {
  const { totalItems } = useCart();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo e Nome */}
        <div className="flex items-center gap-3">
          <img
            src="/android-chrome-192x192.png"
            alt="PedidosFácil Logo"
            className="h-10 w-10 rounded-full object-cover"
            style={{ background: '#fff' }}
          />
          <h1 className="font-montserrat font-bold text-xl text-black">PedidosFácil</h1>
        </div>

        {/* Categorias como menu */}
        <nav className="flex gap-2">
          {categorias.map(cat => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className="font-raleway px-3 py-1 rounded-full bg-gray-100 text-gray-800 hover:bg-[#af1a2d] hover:text-white transition-colors"
            >
              {cat.nome}
            </a>
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
    </header>
  );
}