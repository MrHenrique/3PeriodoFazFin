export function EstoqueAtual(dataEstoque,valorProd,qtdProd,volumeProd,pesoProd) {
    var testes = 0;
    for (var i in dataEstoque) {
      testes += (dataEstoque[i].prodL * dataEstoque[i].precoL);
    }
    const EstoqueAtual = testes.toFixed(2);
    return EstoqueAtual;
  }
 /* _id: "string",
  nomeProd: "string",
  createdAt: "date",
  valorProd: "float",
  qtdProd: "float",
  volumeProd: "float?",
  pesoProd: "float?",
  obserProd: "string?",*/