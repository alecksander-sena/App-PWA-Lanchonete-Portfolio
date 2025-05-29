import { useCart } from "@/context/CartContext";

export default function FloatingCartButton({ onClick }: { onClick: () => void }) {
  const { totalItems } = useCart();

  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-[#af1a2d] rounded-full shadow-lg p-4 z-50 flex items-center justify-center"
      aria-label="Abrir carrinho"
    >
      <img src="/carrinho.png" alt="Carrinho" className="h-8 w-8 object-contain" />
      {/* Não mostrar badge! */}
    </button>
  );
}