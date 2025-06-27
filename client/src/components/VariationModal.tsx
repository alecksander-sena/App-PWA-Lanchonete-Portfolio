import { useEffect, useRef, useState } from "react";
import { Product } from "@/types";
import { X as CloseIcon } from "lucide-react";

interface VariationModalProps {
  open: boolean;
  product: Product | null;
  onClose: () => void;
  onConfirm: (variationChoice: { [variationName: string]: string }) => void;
}

export default function VariationModal({ open, product, onClose, onConfirm }: VariationModalProps) {
  const [choices, setChoices] = useState<{ [key: string]: string }>({});

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && product?.variations) {
      setChoices(
        product.variations.reduce((acc, variation) => {
          acc[variation.name] = variation.options[0] ?? "";
          return acc;
        }, {} as { [key: string]: string })
      );
    }
  }, [open, product]);

  // Travar o scroll do body enquanto modal está aberto
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Fecha modal ao clicar fora dele
  useEffect(() => {
    if (!open) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose]);

  if (!open || !product) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[1000] bg-black/40"
      tabIndex={-1}
      aria-modal="true"
      role="dialog"
    >
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xs relative max-h-[90vh] overflow-y-auto"
        style={{ minWidth: 320 }}
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-900 transition"
          onClick={onClose}
          aria-label="Fechar"
          type="button"
        >
          <CloseIcon size={22} />
        </button>
        <h3 className="text-lg font-bold mb-2 text-center">Escolha as opções</h3>
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
            type="button"
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 rounded bg-[#af1a2d] text-white hover:bg-[#9a1626]"
            onClick={() => {
              onConfirm(choices);
              onClose();
            }}
            type="button"
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}