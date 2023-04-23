export function DespesasTotais(dataGastos) {
  var testes = 0;
  for (var i in dataGastos) {
    testes += dataGastos[i].valorProd * dataGastos[i].qtdProd;
  }

  const precoCF = testes.toFixed(2);
  return precoCF;
}
