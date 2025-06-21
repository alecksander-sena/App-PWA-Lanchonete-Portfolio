import { useState } from 'react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/lib/utils';
import { Plus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

// Modal simples para escolher variação
function VariationModal({
  open,
  onClose,
  product,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  product: Product;
  onConfirm: (variationChoice: { [variationName: string]: string }) => void;
}) {
  const [choices, setChoices] = useState<{ [key: string]: string }>(
    () =>
      product.variations?.reduce((acc, variation) => {
        acc[variation.name] = variation.options[0] ?? '';
        return acc;
      }, {} as { [key: string]: string }) || {}
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xs">
        <h3 className="text-lg font-bold mb-2">Escolha as opções</h3>
        {product.variations?.map((variation) => (
          <div className="mb-4" key={variation.name}>
            <label className="block font-semibold mb-1">{variation.name}</label>
            <select
              value={choices[variation.name]}
              onChange={(e) =>
                setChoices((ch) => ({
                  ...ch,
                  [variation.name]: e.target.value,
                }))
              }
              className="border px-2 py-1 rounded w-full"
            >
              {variation.options.map((opt) => (
                <option value={opt} key={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        ))}
        <div className="flex gap-2 mt-4 justify-end">
          <button
            className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 rounded bg-[#af1a2d] text-white hover:bg-[#9a1626]"
            onClick={() => onConfirm(choices)}
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}

// Função para definir a cor do selo de categoria
const getCategoryColor = (category: string): string => {
  switch (category) {
    case 'Hambúrgueres':
      return 'bg-[#af1a2d]';
    case 'Bebidas':
      return 'bg-[#3498db]';
    case 'Salgados':
      return 'bg-[#e67e22]';
    case 'Cuscuz':
      return 'bg-[#27ae60]';
    case 'Tapioca':
      return 'bg-[#9b59b6]';
    case 'Adicionais':
      return 'bg-[#f1c40f]';
    default:
      return 'bg-[#eea530]';
  }
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [showModal, setShowModal] = useState(false);
  const categoryColor = getCategoryColor(product.category);

  function handleAddToCart() {
    if (product.variations && product.variations.length > 0) {
      setShowModal(true);
    } else {
      addToCart(product);
    }
  }

  function handleConfirmVariation(choices: { [variationName: string]: string }) {
    setShowModal(false);
    // Inclui as escolhas dentro do product antes de adicionar ao carrinho
    addToCart({ ...product, selectedVariations: choices });
  }

  return (
    <div className="product-card bg-white rounded-xl shadow-md overflow-hidden">
      <VariationModal
        open={showModal}
        onClose={() => setShowModal(false)}
        product={product}
        onConfirm={handleConfirmVariation}
      />
      <div className="w-full h-48 bg-gray-200 relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/400x300?text=Imagem+indisponível';
          }}
        />
        <p className="text-[10px] text-gray-400 mt-1 text-center">
          Imagem meramente ilustrativa.
        </p>
        <span
          className={`absolute top-2 right-2 ${categoryColor} text-white text-xs px-2 py-1 rounded-full font-medium`}
        >
          {product.category}
        </span>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-poppins font-semibold text-lg">{product.name}</h3>
            <p className="text-[#737373] text-sm mt-1 line-clamp-2">
              {product.description}
            </p>
          </div>
          <div className="font-poppins font-bold text-lg text-[#af1a2d]">
            {formatCurrency(product.price)}
          </div>
        </div>
        <button
          className="btn-primary mt-4 w-full bg-[#af1a2d] text-white py-2 rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-[#9a1626] transition-colors"
          onClick={handleAddToCart}
        >
          <Plus size={18} />
          <span>Adicionar</span>
        </button>
      </div>
    </div>
  );
}