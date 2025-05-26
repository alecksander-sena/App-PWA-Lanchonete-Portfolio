import { useCart } from '@/context/CartContext';

interface HeaderProps {
  openCart: () => void;
}

export default function Header({ openCart }: HeaderProps) {
  const { totalItems } = useCart();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          {/* Logo substituindo o círculo vermelho */}
          <img
            src="/android-chrome-192x192.png"
            alt="PedidosFácil Logo"
            className="h-10 w-10 mr-2 rounded-full object-cover"
            style={{ background: '#fff' }}
          />
          <h1 className="font-montserrat font-bold text-xl text-black">PedidosFácil</h1>
        </div>
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