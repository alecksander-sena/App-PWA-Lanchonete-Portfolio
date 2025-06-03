import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebaseConfig"; // ajuste o caminho se necessário

interface AdminTaxaEntregaProps {
  lojaId: string;
  dadosIniciais?: {
    nome?: string;
    tipoTaxaEntrega?: "fixa" | "distancia";
    taxaEntregaFixa?: number;
    precoPorKm?: number;
    enderecoLoja?: string;
  };
}

export default function AdminTaxaEntrega({ lojaId, dadosIniciais }: AdminTaxaEntregaProps) {
  const [nome, setNome] = useState(dadosIniciais?.nome ?? "");
  const [tipoTaxaEntrega, setTipoTaxaEntrega] = useState<"fixa" | "distancia">(dadosIniciais?.tipoTaxaEntrega ?? "fixa");
  const [taxaEntregaFixa, setTaxaEntregaFixa] = useState(dadosIniciais?.taxaEntregaFixa ?? 0);
  const [precoPorKm, setPrecoPorKm] = useState(dadosIniciais?.precoPorKm ?? 0);
  const [enderecoLoja, setEnderecoLoja] = useState(dadosIniciais?.enderecoLoja ?? "");
  const [salvando, setSalvando] = useState(false);

  async function handleSalvar(e: React.FormEvent) {
    e.preventDefault();
    setSalvando(true);
    await setDoc(
      doc(db, "lojas", lojaId),
      {
        nome,
        tipoTaxaEntrega,
        taxaEntregaFixa: tipoTaxaEntrega === "fixa" ? Number(taxaEntregaFixa) : 0,
        precoPorKm: tipoTaxaEntrega === "distancia" ? Number(precoPorKm) : 0,
        enderecoLoja,
      },
      { merge: true }
    );
    setSalvando(false);
    alert("Dados salvos com sucesso!");
  }

  return (
    <form onSubmit={handleSalvar} style={{ maxWidth: 400, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }}>
      <h2>Configurar Taxa de Entrega</h2>
      <label>
        Nome da Loja:
        <input value={nome} onChange={e => setNome(e.target.value)} required />
      </label>
      <label>
        Endereço da Loja:
        <input value={enderecoLoja} onChange={e => setEnderecoLoja(e.target.value)} required />
      </label>
      <label>
        Tipo de Taxa:
        <select value={tipoTaxaEntrega} onChange={e => setTipoTaxaEntrega(e.target.value as "fixa" | "distancia")}>
          <option value="fixa">Taxa Fixa</option>
          <option value="distancia">Por Distância</option>
        </select>
      </label>
      {tipoTaxaEntrega === "fixa" ? (
        <label>
          Valor da Taxa Fixa (R$):
          <input
            type="number"
            min={0}
            value={taxaEntregaFixa}
            onChange={e => setTaxaEntregaFixa(Number(e.target.value))}
            step="0.01"
            required
          />
        </label>
      ) : (
        <label>
          Valor por Km (R$):
          <input
            type="number"
            min={0}
            value={precoPorKm}
            onChange={e => setPrecoPorKm(Number(e.target.value))}
            step="0.01"
            required
          />
        </label>
      )}
      <button type="submit" disabled={salvando}>
        {salvando ? "Salvando..." : "Salvar"}
      </button>
    </form>
  );
}