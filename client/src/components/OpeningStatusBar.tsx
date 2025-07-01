export default function OpeningStatusBar({ isOpen }: { isOpen: boolean }) {
  return (
    <div
      className={`w-full text-center py-1 px-2 text-sm font-medium opening-status-bar
        ${isOpen ? "bg-green-100 text-green-900" : "bg-[#af1a2d] text-white"}`}
    >
      {isOpen
        ? "✅ Estamos aceitando pedidos! Atendemos até 21h"
        : "⏰ No momento estamos fechados para pedidos"}
    </div>
  );
}