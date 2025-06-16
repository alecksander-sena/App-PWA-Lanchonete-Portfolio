import { Product, Order } from "@/types";

// Lista de categorias disponíveis
export const categories = [
  "Hambúrgueres",
  "Bebidas",
  "Salgados",
  "Cuscuz",
  "Tapioca",
  "Adicionais"
];

// Produtos com dados reais
const sampleProducts: Product[] = [
  // HAMBÚRGUERES
  {
    id: "1",
    name: "NOSSO PALADAR",
    description: "Pão brioche, Carne Artesanal, Queijo, Tomate, Cebola e Alface",
    price: 18.00,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500",
    category: "Hambúrgueres"
  },
  {
    id: "2",
    name: "FRANBACON",
    description: "Pão Brioche, Frango, Bacon, Queijo, Presunto, Tomate, Cebola e Alface",
    price: 17.00,
    image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?q=80&w=500",
    category: "Hambúrgueres"
  },
  {
    id: "3",
    name: "SUCULENTO",
    description: "Pão Brioche, Carne Artesanal, Calabresa, Queijo, Tomate, Cebola e Alface",
    price: 23.00,
    image: "https://images.unsplash.com/photo-1596662951482-0c4ba74a6df6?q=80&w=500",
    category: "Hambúrgueres"
  },
  {
    id: "4",
    name: "NORDESTINO",
    description: "Pão Brioche, Carne Artesanal, Calabresa, Ovo, Tomate e Cebola",
    price: 23.00,
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=500",
    category: "Hambúrgueres"
  },
  {
    id: "5",
    name: "BOM SABOR DA CASA",
    description: "Pão Brioche, 2 Carne Artesanal, Bacon, Calabresa, Queijo, Presunto, Tomate, Cebola e Alface",
    price: 33.00,
    image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?q=80&w=500",
    category: "Hambúrgueres"
  },
  {
    id: "6",
    name: "XFRANGO",
    description: "Pão Brioche, Frango, Queijo, Presunto e Cebola",
    price: 15.00,
    image: "https://res.cloudinary.com/dxkaqghiy/image/upload/c_pad,w_500,h_500/v1750075773/Hamburguer_de_frango_f906d3.png",
    category: "Hambúrgueres"
  },
  {
    id: "7",
    name: "OVO COM QUEIJO",
    description: "Pão Brioche, Ovo, Queijo, Tomate e Alface",
    price: 10.00,
    image: "https://images.unsplash.com/photo-1560130803-aaadb4bc913e?q=80&w=500",
    category: "Hambúrgueres"
  },
  
  // BEBIDAS
  {
    id: "8",
    name: "Refrigerante 1L",
    description: "Guaraná ou Pepsi",
    price: 6.50,
    image: "https://res.cloudinary.com/dxkaqghiy/image/upload/v1750110874/0122940_ovq7wl.webp",
    category: "Bebidas"
  },
  {
    id: "9",
    name: "Refrigerante Lata 350ml",
    description: "Guaraná ou Pepsi",
    price: 4.50,
    image: "https://res.cloudinary.com/dxkaqghiy/image/upload/v1750109154/PEPSI_20LATA_mtwqe8.png",
    category: "Bebidas"
  },
  {
    id: "10",
    name: "Refrigerante 200ml",
    description: "Guaraná ou Pepsi",
    price: 2.50,
    image: "https://res.cloudinary.com/dxkaqghiy/image/upload/v1750109087/ca%C3%A7ulinha_zcpv7w.webp",
    category: "Bebidas"
  },
  {
    id: "11",
    name: "Tubaina",
    description: "Refrigerante sabor tubaína",
    price: 4.00,
    image: "https://res.cloudinary.com/dxkaqghiy/image/upload/v1750111749/Tubaina_S%C3%B3_Frutas_ccjtsg.png",
    category: "Bebidas"
  },
  {
    id: "12",
    name: "Guarathon",
    description: "Energético sabor guaraná",
    price: 2.00,
    image: "https://res.cloudinary.com/dxkaqghiy/image/upload/v1750105364/guarathon_jsfdny.jpg",
    category: "Bebidas"
  },
  {
    id: "13",
    name: "Golito",
    description: "Suco de Uva",
    price: 2.00,
    image: "https://res.cloudinary.com/dxkaqghiy/image/upload/v1750105353/golito_nuhkwg.jpg",
    category: "Bebidas"
  },
  {
    id: "14",
    name: "Suco Com Água",
    description: "Polpa de Acerola, Laranja Com Acerola, Goiaba e Morango",
    price: 4.00,
    image: "https://res.cloudinary.com/dxkaqghiy/image/upload/v1750107449/suco_com_agua_mlc3xe.png",
    category: "Bebidas"
  },
  {
    id: "15",
    name: "Suco Com Leite",
    description: "Polpa de Acerola, Laranja Com Acerola, Goiaba e Morango",
    price: 6.00,
    image: "https://res.cloudinary.com/dxkaqghiy/image/upload/v1750107456/suco_com_leite_y4reci.png",
    category: "Bebidas"
  },
  {
    id: "16",
    name: "Água 500ml",
    description: "Água mineral sem gás",
    price: 2.00,
    image: "https://images.unsplash.com/photo-1616118132534-381148898bb4?q=80&w=500",
    category: "Bebidas"
  },
  
  // SALGADOS
  {
    id: "17",
    name: "Salgados Assados",
    description: "Opções: Queijo e Presunto, Calabresa ou Frango",
    price: 3.00,
    image: "https://res.cloudinary.com/dxkaqghiy/image/upload/v1750117507/Salgado_Assado_djvrkj.png",
    category: "Salgados"
  },
  {
    id: "18",
    name: "Salgados Fritos",
    description: "Opções: Frango ou Salsicha",
    price: 2.00,
    image: "https://res.cloudinary.com/dxkaqghiy/image/upload/v1750117250/Salgado_Frito_jibhvn.jpg",
    category: "Salgados"
  },
  {
    id: "19",
    name: "Hamburgão",
    description: "Recheado com carne de hambúrguer",
    price: 5.00,
    image: "https://res.cloudinary.com/dxkaqghiy/image/upload/v1750116674/Hamburg%C3%A3o_k6ipr6.png",
    category: "Salgados"
  },
  
  // CUSCUZ
  {
    id: "20",
    name: "Cuscuz de Carne",
    description: "Cuscuz, Carne em Cubos, Queijo e Vinagrete",
    price: 15.00,
    image: "https://images.unsplash.com/photo-1604908139878-ea46310bd375?q=80&w=500",
    category: "Cuscuz"
  },
  {
    id: "21",
    name: "Cuscuz de Calabresa",
    description: "Cuscuz, Calabresa em Cubos, Queijo e Vinagrete",
    price: 15.00,
    image: "https://images.unsplash.com/photo-1580324990890-439f0798c2a3?q=80&w=500",
    category: "Cuscuz"
  },
  {
    id: "22",
    name: "Cuscuz de Frango",
    description: "Cuscuz, Frango Desfiado, Queijo e Vinagrete",
    price: 15.00,
    image: "https://images.unsplash.com/photo-1578178344914-42614140108f?q=80&w=500",
    category: "Cuscuz"
  },
  {
    id: "23",
    name: "Cuscuz de Bacon",
    description: "Cuscuz, Bacon em Tiras, Queijo e Vinagrete",
    price: 15.00,
    image: "https://images.unsplash.com/photo-1604908177453-7462950a6a3b?q=80&w=500",
    category: "Cuscuz"
  },
  {
    id: "24",
    name: "Cuscuz de Ovo com Queijo",
    description: "Cuscuz, Ovo Frito Com Queijo e Vinagrete",
    price: 12.00,
    image: "https://images.unsplash.com/photo-1582169296194-e4d644c48063?q=80&w=500",
    category: "Cuscuz"
  },
  
  // TAPIOCA
  {
    id: "25",
    name: "Tapioca de Carne",
    description: "Tapioca, Carne em Tiras e Queijo",
    price: 15.00,
    image: "https://images.unsplash.com/photo-1593077275023-56a6c1e9a085?q=80&w=500",
    category: "Tapioca"
  },
  {
    id: "26",
    name: "Tapioca de Calabresa",
    description: "Tapioca, Calabresa em Cubos e Queijo",
    price: 15.00,
    image: "https://images.unsplash.com/photo-1593560368921-9b9a5ff8eebd?q=80&w=500",
    category: "Tapioca"
  },
  {
    id: "27",
    name: "Tapioca de Frango",
    description: "Tapioca, Frango Desfiado e Queijo",
    price: 15.00,
    image: "https://images.unsplash.com/photo-1583969430754-a4ca0cfcfc91?q=80&w=500",
    category: "Tapioca"
  },
  {
    id: "28",
    name: "Tapioca de Bacon",
    description: "Tapioca, Bacon em Tiras e Queijo",
    price: 15.00,
    image: "https://images.unsplash.com/photo-1593450298063-cc252f7da17a?q=80&w=500",
    category: "Tapioca"
  },
  {
    id: "29",
    name: "Tapioca de Ovo com Queijo",
    description: "Tapioca, Ovo Frito Com Queijo",
    price: 12.00,
    image: "https://images.unsplash.com/photo-1593450298099-cfd6d4403605?q=80&w=500",
    category: "Tapioca"
  },
  {
    id: "30",
    name: "Tapioca de Queijo e Presunto",
    description: "Tapioca, Queijo e Presunto",
    price: 12.00,
    image: "https://images.unsplash.com/photo-1593450297330-5b63246b6677?q=80&w=500",
    category: "Tapioca"
  },
  
  // ADICIONAIS
  {
    id: "31",
    name: "Adicional de Carne",
    description: "Adicional para Cuscuz e Tapioca",
    price: 5.00,
    image: "https://images.unsplash.com/photo-1609525313344-a56b96f0a00e?q=80&w=500",
    category: "Adicionais"
  },
  {
    id: "32",
    name: "Adicional de Calabresa",
    description: "Adicional para Cuscuz e Tapioca",
    price: 3.00,
    image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?q=80&w=500",
    category: "Adicionais"
  },
  {
    id: "33",
    name: "Adicional de Frango",
    description: "Adicional para Cuscuz e Tapioca",
    price: 5.00,
    image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?q=80&w=500",
    category: "Adicionais"
  },
  {
    id: "34",
    name: "Adicional de Bacon",
    description: "Adicional para Cuscuz e Tapioca",
    price: 4.00,
    image: "https://images.unsplash.com/photo-1497051788611-2c64812349fa?q=80&w=500",
    category: "Adicionais"
  },
  {
    id: "35",
    name: "Adicional de Ovo",
    description: "Adicional para Cuscuz e Tapioca",
    price: 3.00,
    image: "https://images.unsplash.com/photo-1607690424560-35d7c9c10edf?q=80&w=500",
    category: "Adicionais"
  },
  {
    id: "36",
    name: "Adicional de Queijo e Presunto",
    description: "Adicional para Cuscuz e Tapioca",
    price: 5.00,
    image: "https://images.unsplash.com/photo-1586478069717-89235e068ebb?q=80&w=500",
    category: "Adicionais"
  }
];

// Contador para simular IDs de pedidos
let orderIdCounter = 1;

// Function to fetch products
export const fetchProducts = async (): Promise<Product[]> => {
  // Retornamos dados de amostra diretamente
  console.log("Usando dados de amostra para produtos");
  return sampleProducts;
};

// Function to save order
export const saveOrder = async (order: Omit<Order, "id" | "createdAt">): Promise<string> => {
  // Simulamos salvar o pedido e geramos um ID
  const orderId = `order-${orderIdCounter++}`;
  console.log(`Simulando salvar pedido com ID: ${orderId}`, order);
  return orderId;
};
