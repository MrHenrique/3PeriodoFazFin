export function ReceitasTotais(dataRec) {
  var testes = 0;
  for (var i in dataRec) {
    testes += (dataRec[i].prodL * dataRec[i].precoL);
  }
  const precoLeite = testes.toFixed(2);
  return precoLeite;
}
