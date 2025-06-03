import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuração do Firebase do seu aplicativo web
const firebaseConfig = { 
  apiKey: "AIzaSyB_37MvU0kfUhHxrwUlrrsIjLW833pfMeU" , 
  authDomain: "pedidos-facil.firebaseapp.com",
  projectId: "pedidos-facil",
  storageBucket: "pedidos-facil.firebasestorage.app",
  messagingSenderId: "827914740118" , 
  appId: "1:827914740118:web:90df7bcafe65e30cee7db7" 
};

// Inicializar Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);