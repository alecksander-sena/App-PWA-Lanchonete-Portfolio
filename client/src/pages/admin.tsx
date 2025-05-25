import ProductForm from "@/components/ProductForm";

export default function AdminPage() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Cadastro de Produto</h2>
      <ProductForm onProductCreated={() => alert("Produto cadastrado!")} />
    </div>
  );
}