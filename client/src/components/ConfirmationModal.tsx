import { Button } from '@/components/ui/button';
import { Check, MessageCircle } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConfirmationModal({ isOpen, onClose }: ConfirmationModalProps) {

  if (!isOpen) return null;
  
  const handleWhatsAppClick = () => {
    // Usar o número de WhatsApp brasileiro diretamente
    const phoneNumber = "5574999414864"; // Seu número com prefixo do Brasil
    
    window.open(`https://wa.me/${phoneNumber}`, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-w-md mx-4 md:mx-0 p-6 text-center">
        <div className="relative">
          <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center bg-green-100 rounded-full">
            <Check className="h-10 w-10 text-green-500" strokeWidth={3} />
          </div>
          <div className="absolute -top-2 -right-2 bg-[#25D366] text-white rounded-full p-2 shadow-lg animate-bounce">
            <MessageCircle size={20} />
          </div>
        </div>
        
        <h2 className="text-2xl font-poppins font-bold mb-2">Pedido Enviado!</h2>
        <p className="text-[#737373] mb-2">
          Seu pedido foi enviado para o WhatsApp do restaurante.
        </p>
        <p className="text-[#737373] mb-6 text-sm">
          Se a janela do WhatsApp não abriu automaticamente, verifique os bloqueadores de pop-up do seu navegador.
        </p>
        
        <div className="flex flex-col space-y-3">
          <Button 
            className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-3 rounded-lg font-medium flex items-center justify-center"
            onClick={handleWhatsAppClick}
          >
            <MessageCircle size={18} className="mr-2" />
            Abrir WhatsApp
          </Button>
          
          <Button 
            variant="outline"
            className="w-full py-3 rounded-lg font-medium border-gray-300"
            onClick={onClose}
          >
            Voltar ao Menu
          </Button>
        </div>
      </div>
    </div>
  );
}
