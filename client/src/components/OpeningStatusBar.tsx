export default function OpeningStatusBar({ isOpen }: { isOpen: boolean }) {
  return (
    <div
      className={`w-full text-center py-2 font-semibold ${
        isOpen
          ? "bg-green-100 text-green-800"
          : "bg-red-100 text-red-800"
      }`}
    >
      {isOpen
        ? "✅ Estamos aceitando pedidos! Estamos abertos entre 07h - 13:30h e 17h - 21h"
        : "⏰ No momento estamos fechados para pedidos. Volte mais tarde!"}
    </div>
  );
}