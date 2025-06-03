import { useNavigate } from "react-router-dom";
import AdminTaxaEntrega from "../components/AdminTaxaEntrega";

export default function AdminPage() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  }

  // IDs dos documentos das lojas no Firestore
  const lojaFixaId = "Calc.Dist.Lanch.Bom Sabor Xx";
  const lojaDistanciaId = "Calc.Dist.Lanch. Bom Sabor Xx - 2";

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Área do Proprietário</h1>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded font-bold"
          onClick={handleLogout}
        >
          Sair
        </button>
      </div>
      <div className="mb-8">
        <p>Aqui você poderá editar produtos, preços, etc.</p>
      </div>
      {/* Formulário para taxa de entrega da loja TAXA FIXA */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Taxa de Entrega: Loja Taxa Fixa</h2>
        <AdminTaxaEntrega lojaId={lojaFixaId} />
      </div>
      {/* Formulário para taxa de entrega da loja POR DISTÂNCIA */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Taxa de Entrega: Loja Por Distância</h2>
        <AdminTaxaEntrega lojaId={lojaDistanciaId} />
      </div>
    </div>
  );
}