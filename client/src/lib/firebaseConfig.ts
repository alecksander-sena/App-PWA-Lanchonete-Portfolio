import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuração do Firebase do seu aplicativo web
const firebaseConfig = {
  apiKey: "AIzaSyDFmQhT4nHI27ezkvxpFC7i2igJt0JXng8",
  authDomain: "lanchonete-bom-sabor-portfolio.firebaseapp.com",
  projectId: "lanchonete-bom-sabor-portfolio",
  storageBucket: "lanchonete-bom-sabor-portfolio.firebasestorage.app",
  messagingSenderId: "708974387697",
  appId: "1:708974387697:web:7165934a7857459b62a450",
  measurementId: "G-HVS9YSTBXL"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);