import React, { useState } from "react";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dxkaqghiy/image/upload";
const UPLOAD_PRESET = "public_pwa_PedidosFácil";

export default function ProductForm({ onProductCreated }: { onProductCreated: () => void }) {
  const [produto, setProduto] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });
  const [uploading, setUploading] = useState(false);

  // Manipula campos do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setProduto({ ...produto, [e.target.name]: e.target.value });
  };

  // Manipula upload da imagem
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(CLOUDINARY_URL, { method: "POST", body: formData });
    const data = await res.json();
    setProduto(prod => ({ ...prod, image: data.secure_url }));
    setUploading(false);
  };

  // Envia para o Firestore (Ajuste para seu backend)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você salva no Firestore (ajuste conforme seu projeto)
    // Exemplo:
    // await addDoc(collection(db, "products"), produto)
    alert("Produto cadastrado (implemente o envio para o banco)!");
    if (onProductCreated) onProductCreated();
    setProduto({
      name: "",
      price: "",
      description: "",
      category: "",
      image: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white rounded-lg p-6 shadow-md space-y-4">
      <input name="name" value={produto.name} onChange={handleChange} placeholder="Nome do produto" className="input" required />
      <input name="price" value={produto.price} onChange={handleChange} placeholder="Preço" className="input" type="number" min="0" required />
      <textarea name="description" value={produto.description} onChange={handleChange} placeholder="Descrição" className="input" required />
      <select name="category" value={produto.category} onChange={handleChange} className="input" required>
        <option value="">Selecione a categoria</option>
        <option value="Hambúrgueres">Hambúrgueres</option>
        <option value="Bebidas">Bebidas</option>
        <option value="Salgados">Salgados</option>
        <option value="Cuscuz">Cuscuz</option>
        <option value="Tapioca">Tapioca</option>
        <option value="Adicionais">Adicionais</option>
      </select>
      <input type="file" accept="image/*" onChange={handleImageChange} className="input" />
      {uploading && <p>Enviando imagem...</p>}
      {produto.image && <img src={produto.image} alt="Prévia" className="w-24 h-24 object-cover rounded" />}
      <button type="submit" className="btn-primary">Cadastrar Produto</button>
    </form>
  );
}