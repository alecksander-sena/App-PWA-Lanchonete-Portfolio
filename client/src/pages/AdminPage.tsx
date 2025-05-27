import { useNavigate } from "react-router-dom";

export default function AdminPage() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  }

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
      <p>Aqui você poderá editar produtos, preços, etc.</p>
      {/* Aqui depois adicionamos formulários para gerenciar produtos */}
    </div>
  );
}