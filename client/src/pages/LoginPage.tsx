import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você vai colocar o login real depois (Firebase Auth)
    // Por enquanto, login fake para teste:
    if (email === "admin@meusite.com" && senha === "123456") {
      // salva login no localStorage para simular login
      localStorage.setItem("isLoggedIn", "true");
      navigate("/admin");
    } else {
      alert("Login inválido!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleLogin} className="bg-white shadow p-8 rounded max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-4">Login do Proprietário</h2>
        <input
          type="email"
          placeholder="E-mail"
          className="w-full mb-3 px-3 py-2 border rounded"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          className="w-full mb-3 px-3 py-2 border rounded"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-[#af1a2d] text-white py-2 rounded font-bold"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}