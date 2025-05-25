import { useCart } from '@/context/CartContext';
import { ShoppingCart } from 'lucide-react';

interface FloatingCartButtonProps {
  onClick: () => void;
}

export default function FloatingCartButton({ onClick }: FloatingCartButtonProps) {
  const { totalItems } = useCart();
  
  return (
    <div 
      className="fixed bottom-6 right-6 bg-[#af1a2d] text-white rounded-full shadow-lg p-4 md:hidden z-30 cursor-pointer hover:bg-red-800 transition-colors"
      onClick={onClick}
    >
      <div className="relative">
        <ShoppingCart size={22} />
        <span 
          className="absolute -top-2 -right-2 bg-[#eea530] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold"
        >
          {totalItems}
        </span>
      </div>
    </div>
  );
}
