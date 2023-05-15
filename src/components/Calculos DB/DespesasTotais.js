export function DespesasTotais(dataGastos) {
  const precosProdutos = dataGastos.map(gasto => gasto.valorProd * gasto.qtdProd);
  const totalDespesas = precosProdutos.reduce((total, preco) => total + preco, 0);
  return Number(totalDespesas.toFixed(2));
}
