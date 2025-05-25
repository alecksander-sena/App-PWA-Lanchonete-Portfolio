import { useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { X, ArrowLeft, Plus, Minus, ShoppingCart } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export default function CartDrawer({ isOpen, onClose, onCheckout }: CartDrawerProps) {
  const { 
    cart, 
    updateQuantity, 
    totalItems, 
    subtotal, 
    total, 
    DELIVERY_FEE 
  } = useCart();

  // Disable body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  return (
    <div 
      className={`fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-xl z-50 transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } cart-transition`}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <button 
              className="p-2 flex items-center text-gray-600 hover:text-gray-900"
              onClick={onClose}
              aria-label="Voltar"
            >
              <ArrowLeft size={20} className="mr-1" />
              <span className="text-sm">Voltar</span>
            </button>
            <h2 className="text-xl font-poppins font-semibold absolute left-1/2 transform -translate-x-1/2">Seu Pedido</h2>
            <button 
              className="p-2 text-gray-600 hover:text-gray-900"
              onClick={onClose}
              aria-label="Fechar"
            >
              <X size={20} />
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Cart is empty state */}
          {totalItems === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <ShoppingCart size={48} className="text-gray-300 mb-4" />
              <p className="text-[#737373] text-center">Seu carrinho está vazio</p>
              <p className="text-[#737373] text-center text-sm mt-2">Adicione itens do nosso cardápio</p>
              <Button
                className="mt-6 bg-[#af1a2d] hover:bg-[#9a1626] text-white"
                onClick={onClose}
              >
                Voltar para o Cardápio
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div 
                  key={item.id} 
                  className="cart-item flex justify-between items-center bg-gray-50 p-3 rounded-lg"
                >
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden mr-3">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://via.placeholder.com/150?text=Imagem+indisponível';
                        }}
                      />
                    </div>
                    <div>
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-[#af1a2d] font-semibold text-sm">
                        {formatCurrency(item.price)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      aria-label="Diminuir quantidade"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-5 text-center">{item.quantity}</span>
                    <button 
                      className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label="Aumentar quantidade"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="p-4 border-t">
          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-[#737373]">Subtotal</span>
              <span className="font-medium">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-[#737373]">Taxa de entrega</span>
              <span className="font-medium">{formatCurrency(DELIVERY_FEE)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span className="text-[#af1a2d]">{formatCurrency(total)}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="py-3 rounded-lg font-medium"
              onClick={onClose}
            >
              Continuar Comprando
            </Button>
            <Button
              className="bg-[#af1a2d] hover:bg-[#9a1626] text-white py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={onCheckout}
              disabled={totalItems === 0}
            >
              Finalizar Pedido
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
