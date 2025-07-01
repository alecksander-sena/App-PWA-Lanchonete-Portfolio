export default function ClosedModal({ open, onClose }: { open: boolean, onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center closed-modal-bg">
      <div className="bg-white/90 rounded-2xl shadow-2xl px-8 py-7 max-w-xs w-full text-center relative flex flex-col items-center">
        <div className="text-4xl mb-3">🙁</div>
        <h2 className="font-bold text-lg mb-2">Ops! No momento estamos fechados.</h2>
        <div className="text-gray-700 text-sm mb-4">
          Mas já estamos ansiosos para te atender!<br />
          <span className="block my-2">📅 <b>Funcionamos de:</b></span>
          <span className="font-semibold">Seg a Sáb:</span> 07h às 13:30h e 17h às 21h<br />
          <span className="font-semibold">Domingo e feriado:</span> Fechado
          <br />
          <span className="block mt-3">
            Salva nosso horário e venha nos visitar, será um prazer preparar seu pedido!<span className="ml-1">🍔✨</span>
          </span>
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