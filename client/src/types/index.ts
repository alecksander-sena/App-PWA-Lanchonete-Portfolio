export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  variations?: {
    name: string;
    options: string[];
  }[];
  // Permite adicionar temporariamente as variações selecionadas ao produto ao adicionar ao carrinho
  selectedVariations?: { [variationName: string]: string };
}

export interface CartItem extends Product {
  quantity: number;
  // Campo opcional para armazenar as variações selecionadas neste item do carrinho
  selectedVariations?: { [variationName: string]: string };
}

export interface Order {
  id: string;
  customer: {
    name: string;
    phone: string;
    address: string;
  };
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    // Permite salvar as variações selecionadas do item no pedido
    selectedVariations?: { [variationName: string]: string };
  }[];
  payment: 'pix' | 'cash' | 'card';
  subtotal: number;
  deliveryFee: number;
  total: number;
  createdAt: string;
}