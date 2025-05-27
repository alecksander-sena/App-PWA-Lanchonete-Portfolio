import { useCart } from "@/context/CartContext";

export default function FloatingCartButton({ onClick }: { onClick: () => void }) {
  const { totalItems } = useCart();
  return (
    <button
      className="fixed bottom-6 right-6 z-50 bg-[#af1a2d] text-white rounded-full shadow-lg p-4 flex items-center"
      onClick={onClick}
      aria-label="Abrir carrinho"
      style={{ minWidth: 56, minHeight: 56 }}
    >
      <i className="ri-shopping-cart-2-line text-2xl"></i>
      {totalItems > 0 && (
        <span className="ml-2 bg-white text-[#af1a2d] text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
          {totalItems}
        </span>
      )}
    </button>
  );
}