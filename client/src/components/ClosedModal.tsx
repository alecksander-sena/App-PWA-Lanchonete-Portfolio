import { FaLock } from "react-icons/fa";

export default function ClosedModal({ open, onClose }: { open: boolean, onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center closed-modal-bg">
      <div className="bg-white/90 rounded-2xl shadow-2xl px-8 py-7 max-w-xs w-full text-center relative flex flex-col items-center">
        <div className="text-[#af1a2d] bg-gray-100 rounded-full mb-3 flex items-center justify-center" style={{ width: 54, height: 54 }}>
          <FaLock size={32} />
        </div>
        <h2 className="font-bold text-lg mb-1">Estamos fechados no momento!</h2>
        <div className="text-gray-700 text-sm mb-4">
          Horário de funcionamento:<br />
          <span className="font-semibold">Seg a Sáb:</span> 07h às 13:30h <br />
          e 17h às 21h<br />
          <span className="font-semibold">Domingo e feriado:</span> Fechado
        </div>
        <button
          className="rounded-full px-6 py-2 mt-2 bg-[#af1a2d] text-white text-base font-semibold shadow hover:bg-[#921026] transition-colors"
          onClick={onClose}
        >
          Fechar
        </button>
      </div>
      <style>{`
        .closed-modal-bg {
          background: rgba(0,0,0,0.65);
          backdrop-filter: blur(3px);
        }
      `}</style>
    </div>
  );
}