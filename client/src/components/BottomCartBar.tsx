import { useCart } from "@/context/CartContext";

interface BottomCartBarProps {
  onOpenCart: () => void;
}

export default function BottomCartBar({ onOpenCart }: BottomCartBarProps) {
  const { totalItems } = useCart();

  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white text-[#af1a2d] flex items-center justify-between px-4 py-3 z-50 shadow-lg">
      {/* Esquerda: Meus Itens */}
      <span className="font-bold text-base md:text-lg">Meus Itens</span>
      {/* Centro: quantidade */}
      <span className="bg-white text-[#af1a2d] font-bold rounded-full w-8 h-8 flex items-center justify-center text-base mx-2 shadow">
        {totalItems}
      </span>
      {/* Direita: Abrir Carrinho */}
      <button
        onClick={onOpenCart}
        className="bg-[#af1a2d] hover:bg-[#901021] text-white font-bold px-5 py-2 rounded transition-colors shadow"
      >
        Abrir Carrinho
      </button>
    </div>
  );
}