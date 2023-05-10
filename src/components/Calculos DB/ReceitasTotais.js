export function ReceitasTotais(dataRec) {
  const valoresPorProduto = dataRec.map(produto => produto.prodL * produto.precoL);
  const receitaTotal = valoresPorProduto.reduce((total, valor) => total + valor, 0);
  return receitaTotal.toFixed(2);
}
