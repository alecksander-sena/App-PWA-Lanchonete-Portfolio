import { useCart } from "@/context/CartContext";

interface BottomCartBarProps {
  onOpenCart: () => void;
  isCartOrCheckoutOpen: boolean; // ADICIONADO!
}

export default function BottomCartBar({ onOpenCart, isCartOrCheckoutOpen }: BottomCartBarProps) {
  const { totalItems } = useCart();

  // Esconde se carrinho ou checkout/modal estiver aberto
  if (totalItems === 0 || isCartOrCheckoutOpen) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white text-[#af1a2d] flex items-center justify-between px-4 py-3 z-50 shadow-lg">
      <span className="font-bold text-base md:text-lg">Meus Itens</span>
      <span className="bg-white text-[#af1a2d] font-bold rounded-full w-8 h-8 flex items-center justify-center text-base mx-2 shadow">
        {totalItems}
      </span>
      <button
        onClick={onOpenCart}
        className="bg-[#af1a2d] hover:bg-[#901021] text-white font-bold px-5 py-2 rounded transition-colors shadow"
      >
        Abrir Carrinho
      </button>
    </div>
  );
}