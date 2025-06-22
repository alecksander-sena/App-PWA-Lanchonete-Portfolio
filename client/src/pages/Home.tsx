import { useState, useEffect } from "react";
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import CartDrawer from "@/components/CartDrawer";
import CheckoutModal from "@/components/CheckoutModal";
import ConfirmationModal from "@/components/ConfirmationModal";
import BottomCartBar from "@/components/BottomCartBar";
import { fetchProducts, categories } from "@/lib/firebase";
import { Product } from "@/types";
import { SlidersHorizontal } from "lucide-react";

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  // ALTERADO: default "price-desc" para ordenar do maior para o menor preço
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "name">("price-desc");

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Estado de login (simples, só para exemplo)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userName = "Proprietário";

  // Simulação de função de login
  const handleLogin = () => {
    setIsLoggedIn(true);
    alert("Login realizado! (implemente seu fluxo real aqui)");
  };

  useEffect(() => {
    async function loadProducts() {
      try {
        setIsLoading(true);
        const productsData = await fetchProducts();
        setProducts(productsData);

        if (productsData.length > 0) {
          const maxPrice = Math.max(...productsData.map((p) => p.price));
          setPriceRange([0, Math.ceil(maxPrice)]);
        }

        setError(null);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err instanceof Error ? err : new Error("Failed to fetch products"));
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
  }, []);

  // Filtrar produtos por categoria, busca e preço
  const filteredProducts = products
    .filter((product: Product) => {
      const matchesCategory =
        selectedCategory === "Todos" || product.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];

      return matchesCategory && matchesSearch && matchesPrice;
    })
    .sort((a, b) => {
      // ALTERADO: padrão agora é "price-desc" (maior para menor)
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return a.name.localeCompare(b.name);
    });

  // Manipuladores para o carrinho
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // Manipuladores para checkout
  const openCheckout = () => {
    setIsCheckoutOpen(true);
    closeCart();
  };
  const closeCheckout = () => setIsCheckoutOpen(false);

  // Manipuladores para confirmação
  const openConfirmation = () => {
    setIsConfirmationOpen(true);
    closeCheckout();
  };
  const closeConfirmation = () => setIsConfirmationOpen(false);

  // Manipulador para agrupar produtos por categoria quando estiver na visualização "Todos"
  const renderProductsByCategory = () => {
    if (selectedCategory !== "Todos") {
      return (
        <ProductGrid
          products={filteredProducts}
          isLoading={isLoading}
          error={error as Error}
        />
      );
    }

    return (
      <div>
        {categories.map((category) => {
          // ORDENAR POR PREÇO DESC dentro de cada categoria
          const categoryProducts = filteredProducts
            .filter((p) => p.category === category)
            .sort((a, b) => b.price - a.price);

          if (categoryProducts.length === 0) return null;

          return (
            <div key={category} className="mb-10">
              <div className="flex items-center mb-4">
                <h2 className="text-xl font-sans font-semibold">{category}</h2>
                <div className="ml-3 h-0.5 flex-grow bg-gray-200"></div>
              </div>
              <ProductGrid
                products={categoryProducts}
                isLoading={isLoading}
                error={null}
              />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header
        openCart={openCart}
        onSelectCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
        onLogin={handleLogin}
        isLoggedIn={isLoggedIn}
        userName={userName}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main className="container mx-auto px-4 py-6 relative">
        {/* Produtos */}
        {renderProductsByCategory()}

        {/* FILTRO AVANÇADO E CONTAGEM DE ITENS AGORA EMBAIXO */}
        <div className="flex justify-end mt-8 mb-4">
          <button
            className="p-2.5 bg-white border rounded-lg hover:bg-gray-50 text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#af1a2d]"
            onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
          >
            <SlidersHorizontal size={18} />
          </button>
        </div>

        {isFilterMenuOpen && (
          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <div className="flex flex-col space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Ordenar por:</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                >
                  <option value="name">Nome (A-Z)</option>
                  <option value="price-asc">Preço (Menor-Maior)</option>
                  <option value="price-desc">Preço (Maior-Menor)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="mb-4 text-sm text-gray-600">
          {filteredProducts.length}{" "}
          {filteredProducts.length === 1 ? "item encontrado" : "itens encontrados"}
        </div>
      </main>

      <CartDrawer isOpen={isCartOpen} onClose={closeCart} onCheckout={openCheckout} />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={closeCheckout}
        onConfirm={openConfirmation}
      />

      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={closeConfirmation}
      />

      {/* Barra inferior só aparece se o carrinho NÃO estiver aberto */}
      {!isCartOpen && (
        <div className="lg:hidden">
          <BottomCartBar onOpenCart={openCart} />
        </div>
      )}

      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeCart}
        ></div>
      )}
    </div>
  );
}