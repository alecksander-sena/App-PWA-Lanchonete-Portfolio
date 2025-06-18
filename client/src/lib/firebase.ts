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
    image: "https://res.cloudinary.com/dxkaqghiy/image/upload/v1750257000/Hamburguer_de_frango_zxnezs.jpg",
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
  {
    id: "8",
    name: "CALAFRANGO",
    description: "Pão Brioche, Frango, Calabresa, Queijo, Presunto, Tomate, Cebola e Alface",
    price: 17.00,
    image: "https://res.cloudinary.com/dxkaqghiy/image/upload/v1750288950/Calafrango_tqq2sa.jpg",
    category: "Hambúrgueres"
  },
  {
    id: "9",
    name: "CALABACON",
    description: "Pão Brioche, Calabresa, Bacon, Queijo, Presunto, Tomate, Cebola e Alface",
    price: 17.00,
    image: "https://res.cloudinary.com/dxkaqghiy/image/upload/v1750288950/Calabacon_utvvhh.jpg",
    category: "Hambúrgueres"
  },
  
  // BEBIDAS
  {
    id: "10",
    name: "Refrigerante 1L",
    description: "Guaraná ou Pepsi",
    price: 6.50,
    image: "https://res.cloudinary.com/dxkaqghiy/image/upload/v1750257000/Pepsi1L_zs4feq.jpg",
    category: "Bebidas"
  },
  {
    id: "11",
    name: "Refrigerante Lata 350ml",
    description: "Guaraná ou Pepsi",
    price: 4.50,
    image: "https://res.cloudinary.com/dxkaqghiy/image/upload/v1750257000/PEPSI_20LATA_mdtvbn.jpg",
    category: "Bebidas"
  },
  {
    id: "12",
    name: "Refrigerante 200ml",
    description: "Guaraná ou Pepsi",
    price: 2.50,
    image: "https://res.cloudinary.com/dxkaqghiy/image/upload/v1750256999/ca%C3%A7ulinha_wvwc90.jpg",
    category: "Bebidas"
  },
  {
    id: "13",
    name: "Tubaina",
    description: "Refrigerante sabor tubaína",
    price: 4.00,
    image: "https://res.cloudinary.com/dxkaqghiy/image/upload/v1750257000/Tubaina_S%C3%B3_Frutas_y8heny.jpg",
    category: "Bebidas"
  },
  {
    id: "14",
    name: "Guarathon",
    description: "Energético sabor guaraná",
    price: 2.00,
    image: "https://res.cloudinary.com/dxkaqghiy/image/upload/v1750256999/guarathon_nqsjsw.jpg",
    category: "Bebidas"
  },
  {
    id: "15",
    name: "Golito",
    description: "Suco de Uva",
    price: 2.00,
    image: "https://res.cloudinary.com/dxkaqghiy/image/upload/v1750256999/golito_ewa6ig.jpg",
    category: "Bebidas"
  },
  {
    id: "16",
    name: "Suco Com Água",
    description: "Polpa de Acerola, Laranja Com Acerola, Goiaba e Morango",
    price: 4.00,
    image: "https://res.cloudinary.com/dxkaqghiy/image/upload/v1750257000/suco_com_agua_smwnqm.jpg",
    category: "Bebidas"
  },
  {
    id: "17",
    name: "Suco Com Leite",
    description: "Polpa de Acerola, Laranja Com Acerola, Goiaba e Morango",
    price: 6.00,
    image: "https://res.cloudinary.com/dxkaqghiy/image/upload/v1750257000/suco_com_leite_ugp4wa.jpg",
    category: "Bebidas"
  },
  {
    id: "18",
    name: "Água 500ml",
    description: "Água mineral sem gás",
    price: 2.00,
    image: "https://images.unsplash.com/photo-1616118132534-381148898bb4?q=80&w=500",
    category: "Bebidas"
  },
  
  // SALGADOS
  {
    id: "19",
    name: "Salgados Assados",
    description: "Opções: Queijo e Presunto, Calabresa ou Frango",
    price: 3.00,
    image: "https://res.cloudinary.com/dxkaqghiy/image/upload/v1750256999/Salgado_Assado_bz3rrv.jpg",
    category: "Salgados"
  },
  {
    id: "20",
    name: "Salgados Fritos",
    description: "Opções: Frango ou Salsicha",
    price: 2.00,
    image: "https://res.cloudinary.com/dxkaqghiy/image/upload/v1750256999/Salgado_Frito_ukcdvl.jpg",
    category: "Salgados"
  },
  {
    id: "21",
    name: "Hamburgão",
    description: "Recheado com carne de hambúrguer",
    price: 5.00,
    image: "https://res.cloudinary.com/dxkaqghiy/image/upload/v1750256999/Hamburg%C3%A3o_dcvano.jpg",
    category: "Salgados"
  },
  
  // CUSCUZ
  {
    id: "22",
    name: "Cuscuz de Carne",
    description: "Cuscuz, Carne em Cubos, Queijo e Vinagrete",
    price: 15.00,
    image: "https://res.cloudinary.com/dxkaqghiy/image/upload/v1750257937/Cuscuz_com_carne_pnd7ar.jpg",
    category: "Cuscuz"
  },
  {
    id: "23",
    name: "Cuscuz de Calabresa",
    description: "Cuscuz, Calabresa em Cubos, Queijo e Vinagrete",
    price: 15.00,
    image: "https://res.cloudinary.com/dxkaqghiy/image/upload/v1750257937/Cuscuz_com_calabresa_fzxfgf.jpg",
    category: "Cuscuz"
  },
  {
    id: "24",
    name: "Cuscuz de Frango",
    description: "Cuscuz, Frango Desfiado, Queijo e Vinagrete",
    price: 15.00,
    image: "https://res.cloudinary.com/dxkaqghiy/image/upload/v1750257937/Cuscuz_com_frango_fkyn0v.jpg",
    category: "Cuscuz"
  },
  {
    id: "25",
    name: "Cuscuz de Bacon",
    description: "Cuscuz, Bacon em Tiras, Queijo e Vinagrete",
    price: 15.00,
    image: "https://res.cloudinary.com/dxkaqghiy/image/upload/v1750257937/Cuscuz_com_bacon_osxntj.jpg",
    category: "Cuscuz"
  },
  {
    id: "26",
    name: "Cuscuz de Ovo com Queijo",
    description: "Cuscuz, Ovo Frito Com Queijo e Vinagrete",
    price: 12.00,
    image: "https://res.cloudinary.com/dxkaqghiy/image/upload/v1750257937/Cuscuz_com_ovo_tqdhxl.jpg",
    category: "Cuscuz"
  },
  {
    id: "27",
    name: "Cuscuz de Queijo e Presunto",
    description: "Cuscuz, Queijo, Presunto e Vinagrete",
    price: 12.00,
    image: "https://res.cloudinary.com/dxkaqghiy/image/upload/v1750257937/Cuscuz_com_queijo_e_presunto_paicne.jpg",
    category: "Cuscuz"
  },
  
  // TAPIOCA
  {
    id: "28",
    name: "Tapioca de Carne",
    description: "Tapioca, Carne em Tiras e Queijo",
    price: 15.00,
    image: "https://res.cloudinary.com/dxkaqghiy/image/upload/v1750263859/Tapioca_de_carne_jqghhv.jpg",
    category: "Tapioca"
  },
  {
    id: "29",
    name: "Tapioca de Calabresa",
    description: "Tapioca, Calabresa em Cubos e Queijo",
    price: 15.00,
    image: "https://res.cloudinary.com/dxkaqghiy/image/upload/v1750263859/Tapioca_de_calabresa_g5lunb.jpg",
    category: "Tapioca"
  },
  {
    id: "30",
    name: "Tapioca de Frango",
    description: "Tapioca, Frango Desfiado e Queijo",
    price: 15.00,
    image: "https://res.cloudinary.com/dxkaqghiy/image/upload/v1750263860/Tapioca_de_frango_kthivy.jpg",
    category: "Tapioca"
  },
  {
    id: "31",
    name: "Tapioca de Bacon",
    description: "Tapioca, Bacon em Tiras e Queijo",
    price: 15.00,
    image: "https://res.cloudinary.com/dxkaqghiy/image/upload/v1750263859/Tapioca_de_Bacon_ovq25g.jpg",
    category: "Tapioca"
  },
  {
    id: "32",
    name: "Tapioca de Ovo com Queijo",
    description: "Tapioca, Ovo Frito Com Queijo",
    price: 12.00,
    image: "https://res.cloudinary.com/dxkaqghiy/image/upload/v1750263860/Tapioca_de_ovo_com_queijo_s68b1l.jpg",
    category: "Tapioca"
  },
  {
    id: "33",
    name: "Tapioca de Queijo e Presunto",
    description: "Tapioca, Queijo e Presunto",
    price: 12.00,
    image: "https://res.cloudinary.com/dxkaqghiy/image/upload/v1750263860/Tapioca_de_queijo_e_presunto_qfb4mh.jpg",
    category: "Tapioca"
  },
  
  // ADICIONAIS
  {
    id: "34",
    name: "Adicional de Carne",
    description: "Adicional para Cuscuz, Tapioca ou Hamburguer",
    price: 5.00,
    image: "https://res.cloudinary.com/dxkaqghiy/image/upload/v1750286234/carne_frita_pfcbmt.jpg",
    category: "Adicionais"
  },
  {
    id: "35",
    name: "Adicional de Calabresa",
    description: "Adicional para Cuscuz, Tapioca ou Hamburguer",
    price: 4.00,
    image: "https://res.cloudinary.com/dxkaqghiy/image/upload/v1750286233/calabresa_mqw0gm.jpg",
    category: "Adicionais"
  },
  {
    id: "36",
    name: "Adicional de Frango",
    description: "Adicional para Cuscuz, Tapioca ou Hamburguer",
    price: 4.00,
    image: "https://res.cloudinary.com/dxkaqghiy/image/upload/v1750286233/frango_wvxu3s.jpg",
    category: "Adicionais"
  },
  {
    id: "37",
    name: "Adicional de Bacon",
    description: "Adicional para Cuscuz, Tapioca ou Hamburguer",
    price: 5.00,
    image: "https://res.cloudinary.com/dxkaqghiy/image/upload/v1750286222/bacon_yytjlc.jpg",
    category: "Adicionais"
  },
  {
    id: "38",
    name: "Adicional de Ovo",
    description: "Adicional para Cuscuz, Tapioca ou Hamburguer",
    price: 3.00,
    image: "https://res.cloudinary.com/dxkaqghiy/image/upload/v1750286224/ovo_arke7v.jpg",
    category: "Adicionais"
  },
  {
    id: "39",
    name: "Adicional de Queijo e Presunto",
    description: "Adicional para Cuscuz, Tapioca ou Hamburguer",
    price: 3.00,
    image: "https://res.cloudinary.com/dxkaqghiy/image/upload/v1750286233/queijo_e_presunto_viknug.jpg",
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
