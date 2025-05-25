import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCart } from '@/context/CartContext';
import { saveOrder } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const checkoutSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  phone: z.string().min(10, 'Telefone deve ter pelo menos 10 dígitos'),
  address: z.string().min(10, 'Endereço deve ter pelo menos 10 caracteres'),
  payment: z.enum(['pix', 'cash', 'card'], {
    required_error: 'Selecione uma forma de pagamento',
  }),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function CheckoutModal({ isOpen, onClose, onConfirm }: CheckoutModalProps) {
  const { cart, subtotal, total, DELIVERY_FEE, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      payment: undefined,
    },
  });

  if (!isOpen) return null;

  // Payment method labels
  const paymentMethods = {
    pix: 'PIX',
    cash: 'Dinheiro',
    card: 'Cartão na entrega',
  };

  // Generate WhatsApp message with order details
  const generateWhatsAppMessage = (data: CheckoutFormValues) => {
    const itemsList = cart.map(item => 
      `- ${item.name} x${item.quantity}: ${(item.price * item.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
    ).join('\n');
    
    return `
*NOVO PEDIDO*
      
*Cliente:* ${data.name}
*Telefone:* ${data.phone}
*Endereço:* ${data.address}
*Forma de pagamento:* ${paymentMethods[data.payment]}

*ITENS DO PEDIDO:*
${itemsList}

*Subtotal:* ${subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
*Taxa de entrega:* ${DELIVERY_FEE.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
*Total:* ${total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
`.trim();
  };

  const onSubmit = async (data: CheckoutFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Create order object
      const order = {
        customer: {
          name: data.name,
          phone: data.phone,
          address: data.address,
        },
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        payment: data.payment,
        subtotal,
        deliveryFee: DELIVERY_FEE,
        total,
      };
      
      // Save order to Firebase
      await saveOrder(order);
      
      // Generate WhatsApp message
      const message = generateWhatsAppMessage(data);
      const encodedMessage = encodeURIComponent(message);
      
      // Usar o número de WhatsApp brasileiro diretamente (código do país + DDD + número)
      const phoneNumber = "5574999414864"; // Seu número com prefixo do Brasil
      
      // Formatamos a URL do WhatsApp e abrimos em uma nova janela
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
      console.log('Abrindo WhatsApp URL:', whatsappUrl);
      window.open(whatsappUrl, '_blank');
      
      // Clear cart and reset form
      clearCart();
      form.reset();
      
      // Show confirmation
      onConfirm();
    } catch (error) {
      console.error('Error submitting order:', error);
      toast({
        title: 'Erro ao finalizar pedido',
        description: 'Ocorreu um erro ao processar seu pedido. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-w-md mx-4 md:mx-0 max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b sticky top-0 bg-white z-10">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-poppins font-semibold">Finalizar Pedido</h2>
            <button className="p-2" onClick={onClose}>
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-6">
            <div className="space-y-4">
              <h3 className="font-poppins font-medium text-lg">Seus dados</h3>
              
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome completo</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        className="form-control w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="tel" 
                        className="form-control w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Endereço completo</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        rows={3} 
                        className="form-control w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="space-y-4">
              <h3 className="font-poppins font-medium text-lg">Forma de pagamento</h3>
              
              <FormField
                control={form.control}
                name="payment"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="space-y-2"
                      >
                        <div className="flex items-center space-x-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                          <RadioGroupItem 
                            value="pix" 
                            id="pix" 
                            className="h-4 w-4 text-[#af1a2d]" 
                          />
                          <Label htmlFor="pix" className="flex-1 flex items-center cursor-pointer">
                            <span className="mr-2 text-xl">💰</span>
                            <span>PIX</span>
                          </Label>
                        </div>
                        
                        <div className="flex items-center space-x-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                          <RadioGroupItem 
                            value="cash" 
                            id="cash" 
                            className="h-4 w-4 text-[#af1a2d]" 
                          />
                          <Label htmlFor="cash" className="flex-1 flex items-center cursor-pointer">
                            <span className="mr-2 text-xl">💵</span>
                            <span>Dinheiro</span>
                          </Label>
                        </div>
                        
                        <div className="flex items-center space-x-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                          <RadioGroupItem 
                            value="card" 
                            id="card" 
                            className="h-4 w-4 text-[#af1a2d]" 
                          />
                          <Label htmlFor="card" className="flex-1 flex items-center cursor-pointer">
                            <span className="mr-2 text-xl">💳</span>
                            <span>Cartão na entrega</span>
                          </Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-[#af1a2d] hover:bg-[#9a1626] text-white py-3 rounded-lg font-medium"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processando...' : 'Confirmar Pedido'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
