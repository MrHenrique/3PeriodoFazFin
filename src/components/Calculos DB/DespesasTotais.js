export function DespesasTotais(dataGastos) {
  var testes = 0;
  for (var i in dataGastos) {
    testes +=
      (dataGastos[i].valorAli / dataGastos[i].qtdAli) *
      dataGastos[i].consumoAli;
  }

  const precoCF = testes.toFixed(2);
  return precoCF;
}
