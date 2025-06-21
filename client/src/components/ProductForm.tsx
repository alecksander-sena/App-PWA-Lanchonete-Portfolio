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
    variations: [] as { name: string; options: string[] }[],
  });
  const [uploading, setUploading] = useState(false);

  // Campos para adicionar variação
  const [variationName, setVariationName] = useState("");
  const [variationOptions, setVariationOptions] = useState("");

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

    try {
      const res = await fetch(CLOUDINARY_URL, { method: "POST", body: formData });
      const data = await res.json();
      if (data.secure_url) {
        setProduto(prod => ({ ...prod, image: data.secure_url }));
      } else {
        alert("Erro ao enviar imagem. Tente novamente.");
      }
    } catch {
      alert("Erro ao enviar imagem. Verifique sua conexão.");
    } finally {
      setUploading(false);
    }
  };

  // Adiciona uma variação ao produto
  const handleAddVariation = () => {
    if (!variationName || !variationOptions) return;
    setProduto(prod => ({
      ...prod,
      variations: [
        ...prod.variations,
        { name: variationName.trim(), options: variationOptions.split(",").map(o => o.trim()).filter(Boolean) }
      ]
    }));
    setVariationName("");
    setVariationOptions("");
  };

  // Remove uma variação
  const handleRemoveVariation = (index: number) => {
    setProduto(prod => ({
      ...prod,
      variations: prod.variations.filter((_, i) => i !== index)
    }));
  };

  // Envia para o Firestore (Ajuste para seu backend)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você salva no Firestore (ajuste conforme seu projeto)
    // Exemplo de integração Firestore:
    // await addDoc(collection(db, "products"), { ...produto, price: Number(produto.price) });
    alert("Produto cadastrado! (implemente o envio para o banco)");
    if (onProductCreated) onProductCreated();
    setProduto({
      name: "",
      price: "",
      description: "",
      category: "",
      image: "",
      variations: [],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white rounded-lg p-6 shadow-md space-y-4">
      <input
        name="name"
        value={produto.name}
        onChange={handleChange}
        placeholder="Nome do produto"
        className="input"
        required
      />
      <input
        name="price"
        value={produto.price}
        onChange={handleChange}
        placeholder="Preço"
        className="input"
        type="number"
        min="0"
        step="0.01"
        required
      />
      <textarea
        name="description"
        value={produto.description}
        onChange={handleChange}
        placeholder="Descrição"
        className="input"
        required
      />
      <select
        name="category"
        value={produto.category}
        onChange={handleChange}
        className="input"
        required
      >
        <option value="">Selecione a categoria</option>
        <option value="Hambúrgueres">Hambúrgueres</option>
        <option value="Bebidas">Bebidas</option>
        <option value="Salgados">Salgados</option>
        <option value="Cuscuz">Cuscuz</option>
        <option value="Tapioca">Tapioca</option>
        <option value="Adicionais">Adicionais</option>
      </select>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="input"
      />
      {uploading && <p>Enviando imagem...</p>}
      {produto.image && <img src={produto.image} alt="Prévia" className="w-24 h-24 object-cover rounded" />}

      {/* Campos para variações */}
      <div className="space-y-2">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Nome da variação (ex: Sabor)"
            value={variationName}
            onChange={e => setVariationName(e.target.value)}
            className="input flex-1"
          />
          <input
            type="text"
            placeholder="Opções (separe por vírgula)"
            value={variationOptions}
            onChange={e => setVariationOptions(e.target.value)}
            className="input flex-1"
          />
          <button type="button" onClick={handleAddVariation} className="btn-primary px-3">Adicionar</button>
        </div>
        {/* Lista de variações adicionadas */}
        {produto.variations.length > 0 && (
          <ul className="space-y-1">
            {produto.variations.map((v, i) => (
              <li key={i} className="flex items-center gap-2 text-sm">
                <span className="font-semibold">{v.name}:</span>
                <span>{v.options.join(", ")}</span>
                <button type="button" onClick={() => handleRemoveVariation(i)} className="text-red-500 text-xs">Remover</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button type="submit" className="btn-primary">Cadastrar Produto</button>
    </form>
  );
}