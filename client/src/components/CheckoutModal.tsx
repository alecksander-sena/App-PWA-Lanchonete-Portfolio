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

// ======== Esquema de validação ===========
const checkoutSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  phone: z.string().min(10, 'Telefone deve ter pelo menos 10 dígitos'),
  orderType: z.enum(['delivery', 'pickup']),
  address: z.string().optional(),
  payment: z.enum(['pix', 'cash', 'card'], {
    required_error: 'Selecione uma forma de pagamento',
  }),
  note: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.orderType === 'delivery') {
    if (!data.address || data.address.length < 10) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['address'],
        message: 'Endereço deve ter pelo menos 10 caracteres',
      });
    }
  }
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const paymentMethods = {
  pix: 'PIX',
  cash: 'Dinheiro',
  card: 'Cartão na entrega',
};

export default function CheckoutModal({ isOpen, onClose, onConfirm }: CheckoutModalProps) {
  // ======== Hooks =======
  const { cart, subtotal, DELIVERY_FEE, clearCart } = useCart();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');

  // ======== Taxa de entrega dinâmica ========
  const deliveryFee = orderType === 'delivery' ? DELIVERY_FEE : 0;
  const total = subtotal + deliveryFee;

  // ======== Formulário ========
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: '',
      phone: '',
      orderType: 'delivery',
      address: '',
      payment: undefined,
      note: '',
    },
  });

  // ======== Geração de mensagem do WhatsApp ========
  function generateWhatsAppMessage(data: CheckoutFormValues) {
    const itemsList = cart.map(item =>
      `- ${item.name} x${item.quantity}: ${(item.price * item.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
    ).join('\n');

    return `
*NOVO PEDIDO*

*Cliente:* ${data.name}
*Telefone:* ${data.phone}
*Tipo de pedido:* ${data.orderType === 'delivery' ? 'Entrega' : 'Retirada no balcão'}
${data.orderType === 'delivery' ? `*Endereço:* ${data.address}` : ''}
${data.note ? `*Observações:* ${data.note}` : ''}
*Forma de pagamento:* ${paymentMethods[data.payment]}

*ITENS DO PEDIDO:*
${itemsList}

*Subtotal:* ${subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
*Taxa de entrega:* ${deliveryFee.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
*Total:* ${total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
`.trim();
  }

  // ======== Submissão do formulário ========
  async function onSubmit(data: CheckoutFormValues) {
    setIsSubmitting(true);

    try {
      const order = {
        customer: {
          name: data.name,
          phone: data.phone,
          // Garantir que address nunca seja undefined:
          address: data.orderType === 'delivery'
            ? (data.address || '')
            : 'Retirada no balcão',
        },
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        payment: data.payment,
        orderType: data.orderType,
        note: data.note,
        subtotal,
        deliveryFee,
        total,
      };

      await saveOrder(order);

      // WhatsApp
      const message = generateWhatsAppMessage(data);
      const encodedMessage = encodeURIComponent(message);
      const phoneNumber = "5574999414864";
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
      window.open(whatsappUrl, '_blank');

      clearCart();
      form.reset();
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
  }

  // ======== Não renderiza se não estiver aberto ========
  if (!isOpen) return null;

  // ======== Render ========
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
            {/* Dados do cliente */}
            <div className="space-y-4">
              <h3 className="font-poppins font-medium text-lg">Seus dados</h3>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome completo</FormLabel>
                    <FormControl>
                      <Input {...field} className="form-control w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none" />
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
                      <Input {...field} type="tel" className="form-control w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Tipo de pedido */}
              <FormField
                control={form.control}
                name="orderType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de pedido</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={value => {
                          field.onChange(value);
                          setOrderType(value as 'delivery' | 'pickup');
                        }}
                        value={field.value}
                        className="flex space-x-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="delivery" id="delivery" />
                          <Label htmlFor="delivery">Entrega</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="pickup" id="pickup" />
                          <Label htmlFor="pickup">Retirar no balcão</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Endereço */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Endereço completo {orderType === 'delivery' && <span className="text-red-600">*</span>}
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        rows={3}
                        disabled={orderType === 'pickup'}
                        placeholder={orderType === 'pickup' ? 'Não necessário para retirada' : ''}
                        className="form-control w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Observações */}
              <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observações do pedido (opcional)</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        rows={2}
                        placeholder="Ex: sem cebola, entregar na portaria..."
                        className="form-control w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Pagamento */}
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
                          <RadioGroupItem value="pix" id="pix" className="h-4 w-4 text-[#af1a2d]" />
                          <Label htmlFor="pix" className="flex-1 flex items-center cursor-pointer">
                            <span className="mr-2 text-xl">💰</span>
                            <span>PIX</span>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                          <RadioGroupItem value="cash" id="cash" className="h-4 w-4 text-[#af1a2d]" />
                          <Label htmlFor="cash" className="flex-1 flex items-center cursor-pointer">
                            <span className="mr-2 text-xl">💵</span>
                            <span>Dinheiro</span>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                          <RadioGroupItem value="card" id="card" className="h-4 w-4 text-[#af1a2d]" />
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

            {/* Taxa de entrega dinâmica */}
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Taxa de entrega:</span>
              <span className={deliveryFee === 0 ? "text-green-600" : "text-red-600"}>
                {deliveryFee === 0 ? "Grátis (retirada)" : `R$ ${deliveryFee.toFixed(2)}`}
              </span>
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