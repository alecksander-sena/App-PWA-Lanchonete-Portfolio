import { useCart } from "@/context/CartContext";

export default function FloatingCartButton({ onClick }: { onClick: () => void }) {
  const { totalItems } = useCart();
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-[#af1a2d] rounded-full shadow-lg p-4 z-50 flex items-center justify-center"
    >
      <img src="/carrinho.png" alt="Carrinho" className="h-8 w-8 object-contain" />
      {totalItems > 0 && (
        <span className="absolute top-0 right-0 bg-[#af1a2d] text-white text-xs     rounded-full h-5 w-5 flex items-center justify-center font-bold border-2 border-white">
          {totalItems}
        </span>
      )}
    </button>
  );
}