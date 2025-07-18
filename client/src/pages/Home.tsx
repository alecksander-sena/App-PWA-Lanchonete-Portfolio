import { useOpeningHours } from "../hooks/useOpeningHours";
import ClosedModal from "../components/ClosedModal";
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
import BannerCarousel from "@/components/BannerCarousel";

export default function Home() {
  const { isOpen, showClosedModal, closeModal } = useOpeningHours();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  // Default: ordenar do maior para o menor preço
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

  // Função de ordenação dinâmica conforme sortBy
  const sortProducts = (arr: Product[]) => {
    if (sortBy === "price-asc") return [...arr].sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") return [...arr].sort((a, b) => b.price - a.price);
    return [...arr].sort((a, b) => a.name.localeCompare(b.name));
  };

  // Filtrar produtos por categoria, busca e preço
  const filteredProducts = sortProducts(
    products.filter((product: Product) => {
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
  );

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

  // Agrupar produtos por categoria quando na visualização "Todos"
  const renderProductsByCategory = () => {
    if (selectedCategory !== "Todos") {
      return (
        <ProductGrid
          products={filteredProducts}
          isLoading={isLoading}
          error={error as Error}
          isOpen={isOpen}
        />
      );
    }

    return (
      <div>
        {categories.map((category) => {
          // Sempre ordena por sortBy do filtro
          const categoryProducts = sortProducts(
            filteredProducts.filter((p) => p.category === category)
          );

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
                isOpen={isOpen}
              />
            </div>
          );
        })}
      </div>
    );
  };

  // Exemplo de controle no componente pai
  const [isCartOrCheckoutOpen, setIsCartOrCheckoutOpen] = useState(false);

  function handleOpenCart() {
    setIsCartOrCheckoutOpen(true); // Esconde a barra
    setIsCartOpen(true);           // Abre o carrinho!
  }

  // Oferta do dia
  const ofertas = {
    0: { nome: "Oferta de Domingo", descricao: "Desconto especial no Combo Família!" },
    1: { nome: "Oferta de Segunda", descricao: "Hambúrguer em dobro na segunda-feira!" },
    2: { nome: "Oferta de Terça", descricao: "Suco grátis em pedidos acima de R$20!" },
    3: { nome: "Oferta de Quarta", descricao: "Cuscuz com 10% OFF!" },
    4: { nome: "Oferta de Quinta", descricao: "Tapioca recheada com preço especial!" },
    5: { nome: "Oferta de Sexta", descricao: "Combo Sexta Maluca: Salgado + Bebida!" },
    6: { nome: "Oferta de Sábado", descricao: "Desconto em todos os combos!" },
  };
  const hoje = new Date().getDay();
  const ofertaDoDia = ofertas[hoje];

  // Últimos pedidos (Puxa os pedidos do localStorage)
  const ultimosPedidos = JSON.parse(localStorage.getItem("ultimosPedidos") || "[]");

  // Combos (Puxa os Combos da lista de produtos)
  const combos = products.filter(p => p.category === "Combos");

  const bannerElements = [
    (
      <div className="bg-yellow-100 text-yellow-900 rounded-lg shadow p-4 text-center font-semibold">
        <span className="text-lg">🌟 {ofertaDoDia.nome}</span>
        <br />
        <span>{ofertaDoDia.descricao}</span>
      </div>
    ),
    ultimosPedidos.length > 0 ? (
      <div className="bg-blue-100 text-blue-900 rounded-lg shadow p-4 text-center font-semibold">
        <span className="text-lg">🛒 Últimos pedidos</span>
        <ul className="mt-2">
          {ultimosPedidos.map((pedido, i) => (
            <li key={i}>{pedido.nome} <span className="text-xs text-gray-600">({pedido.descricao})</span></li>
          ))}
        </ul>
      </div>
    ) : null,
    combos.length > 0 ? (
      <div className="bg-green-100 text-green-900 rounded-lg shadow p-4 text-center font-semibold">
        <span className="text-lg">🥪 Combos</span>
        <ul className="mt-2">
          {combos.map((combo, i) => (
            <li key={i}>{combo.name} <span className="text-xs text-gray-600">R$ {combo.price.toFixed(2)}</span></li>
          ))}
        </ul>
      </div>
    ) : null,
  ].filter(Boolean); // Remove banners nulos

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

      <BannerCarousel banners={banners} /> {/* // Carrossel aparece logo abaixo do header */}

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
      {!isCartOpen && !isCheckoutOpen && (
        <div className="lg:hidden">
          <BottomCartBar
            onOpenCart={handleOpenCart}
            isCartOrCheckoutOpen={isCartOpen || isCheckoutOpen}
          />
        </div>
      )}

      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeCart}
        ></div>
      )}

      <ClosedModal open={showClosedModal} onClose={closeModal} />
    </div>
  );
}