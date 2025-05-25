import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import CategoryFilter from '@/components/CategoryFilter';
import ProductGrid from '@/components/ProductGrid';
import CartDrawer from '@/components/CartDrawer';
import CheckoutModal from '@/components/CheckoutModal';
import ConfirmationModal from '@/components/ConfirmationModal';
import FloatingCartButton from '@/components/FloatingCartButton';
import { fetchProducts, categories } from '@/lib/firebase';
import { Product } from '@/types';
import { Search, SlidersHorizontal } from 'lucide-react';

export default function Home() {
  // State para gerenciamento de modais
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  
  // State para filtragem
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'name'>('name');
  
  // State para produtos
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Buscar produtos da "API"
  useEffect(() => {
    async function loadProducts() {
      try {
        setIsLoading(true);
        const productsData = await fetchProducts();
        setProducts(productsData);
        
        // Determinar o maior preço para o filtro de preço
        if (productsData.length > 0) {
          const maxPrice = Math.max(...productsData.map(p => p.price));
          setPriceRange([0, Math.ceil(maxPrice)]); 
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch products'));
      } finally {
        setIsLoading(false);
      }
    }
    
    loadProducts();
  }, []);

  // Filtrar produtos por categoria, busca e preço
  const filteredProducts = products
    .filter((product: Product) => {
      const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
      const matchesSearch = searchQuery === '' || 
                          product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return matchesCategory && matchesSearch && matchesPrice;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
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
    if (selectedCategory !== 'Todos') {
      // Se uma categoria específica for selecionada, usar a grade padrão
      return (
        <ProductGrid 
          products={filteredProducts} 
          isLoading={isLoading} 
          error={error as Error} 
        />
      );
    }
    
    // Caso contrário, agrupar por categoria
    return (
      <div>
        {categories.map(category => {
          const categoryProducts = filteredProducts.filter(p => p.category === category);
          
          if (categoryProducts.length === 0) return null;
          
          return (
            <div key={category} className="mb-10">
              <div className="flex items-center mb-4">
                <h2 className="text-xl font-poppins font-semibold">{category}</h2>
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
      <Header openCart={openCart} />
      
      <main className="container mx-auto px-4 py-6 relative">
        <CategoryFilter 
          selectedCategory={selectedCategory} 
          onSelectCategory={setSelectedCategory} 
        />
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-poppins font-semibold">Cardápio</h2>
          
          <div className="flex items-center space-x-2">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Buscar produtos..." 
                className="pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#af1a2d]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
            
            <button 
              className="p-2.5 bg-white border rounded-lg hover:bg-gray-50 text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#af1a2d]"
              onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
            >
              <SlidersHorizontal size={18} />
            </button>
          </div>
        </div>
        
        {/* Menu de filtros avançados */}
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
        
        {/* Contagem de resultados */}
        <div className="mb-4 text-sm text-gray-600">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'item encontrado' : 'itens encontrados'}
        </div>
        
        {/* Produtos agrupados por categoria ou em grade normal */}
        {renderProductsByCategory()}
      </main>
      
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={closeCart} 
        onCheckout={openCheckout} 
      />
      
      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={closeCheckout} 
        onConfirm={openConfirmation} 
      />
      
      <ConfirmationModal 
        isOpen={isConfirmationOpen} 
        onClose={closeConfirmation} 
      />
      
      <FloatingCartButton onClick={openCart} />
      
      {/* Cart overlay */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeCart}
        ></div>
      )}
    </div>
  );
}
