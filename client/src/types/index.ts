export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
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
  }[];
  payment: 'pix' | 'cash' | 'card';
  subtotal: number;
  deliveryFee: number;
  total: number;
  createdAt: string;
}
