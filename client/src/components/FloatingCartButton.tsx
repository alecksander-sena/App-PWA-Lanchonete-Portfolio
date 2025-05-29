import { useCart } from "@/context/CartContext";

export default function FloatingCartButton({ onClick }: { onClick: () => void }) {
  const { totalItems } = useCart();

  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 p-0 bg-transparent rounded-full shadow-lg flex items-center justify-center"
      aria-label="Abrir carrinho"
      style={{ boxShadow: "0 4px 12px rgba(0,0,0,.18)" }}
    >
      <div className="relative">
        <img
          src="/carrinho.png"
          alt="Carrinho"
          className="h-12 w-12 object-contain"
          style={{ background: "transparent" }}
        />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#af1a2d] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold border-2 border-white">
            {totalItems}
          </span>
        )}
      </div>
    </button>
  );
}