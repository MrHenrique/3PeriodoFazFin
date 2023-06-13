export const Fazenda = {
  name: "Farm",
  primaryKey: "_id",
  properties: {
    _id: "string",
    nomefaz: "string",
    proprietario: "string",
    tipoprod: "string",
    createdAt: "date",
    rebanhos: "RebanhoSchema[]",
    entradaEstoque: "EstoqueEntradaSchema[]",
    atualEstoque: "AtualEstoqueSchema[]",
  },
};
export const EstoqueEntradaSchema = {
  name: "EstoqueEntradaSchema",
  primaryKey: "_id",
  properties: {
    _id: "string",
    nomeProd: "string",
    createdAt: "date",
    valorProd: "double",
    qtdProd: "double",
    volumeProd: "double?",
    pesoProd: "double?",
    obserProd: "string?",
    assignee: {
      type: "linkingObjects",
      objectType: "Farm",
      property: "entradaEstoque",
    },
  },
};
export const AtualEstoqueSchema = {
  name: "AtualEstoqueSchema",
  primaryKey: "_id",
  properties: {
    _id: "string",
    nomeProd: "string",
    createdAt: "date",
    valorProd: "double",
    volumeProd: "double?",
    pesoProd: "double?",
    obserProd: "string?",
    alert: "AlertEstoqueSchema[]",
    assignee: {
      type: "linkingObjects",
      objectType: "Farm",
      property: "atualEstoque",
    },
  },
};
export const RebanhoSchema = {
  name: "RebanhoSchema",
  primaryKey: "_id",
  properties: {
    _id: "string",
    nomeReb: "string",
    createdAt: "date",
    vacas: "VacasSchema[]",
    despesas: "DespesaRebSchema[]",
    receitas: "ReceitaRebSchema[]",
    assignee: {
      type: "linkingObjects",
      objectType: "Farm",
      property: "rebanhos",
    },
  },
};
export const DespesaRebSchema = {
  name: "DespesaRebSchema",
  primaryKey: "_id",
  properties: {
    _id: "string",
    nomeProd: "string",
    createdAt: "date",
    valorProd: "double",
    qtdProd: "double",
    volumeProd: "double?",
    pesoProd: "double?",
    obserProd: "string?",
    assignee: {
      type: "linkingObjects",
      objectType: "RebanhoSchema",
      property: "despesas",
    },
  },
};
export const ReceitaRebSchema = {
  name: "ReceitaRebSchema",
  primaryKey: "_id",
  properties: {
    _id: "string",
    nomeProd: "string",
    tipo: "double",
    precoL: "double",
    prodL: "double",
    description: "string",
    createdAt: "date",
    assignee: {
      type: "linkingObjects",
      objectType: "RebanhoSchema",
      property: "receitas",
    },
  },
};
export const DespesasSchema = {
  name: "DespesasSchema",
  primaryKey: "_id",
  properties: {
    _id: "string",
    idTransacao: "string",
    nomeProd: "string",
    createdAt: "date",
    valorProd: "double",
    qtdProd: "double",
    volumeProd: "double?",
    pesoProd: "double?",
    obserProd: "string?",
    assignee: {
      type: "linkingObjects",
      objectType: "VacasSchema",
      property: "despesas",
    },
  },
};
export const ReceitaSchema = {
  name: "ReceitaSchema",
  primaryKey: "_id",
  properties: {
    _id: "string",
    idTransacao: "string",
    tipo: "double",
    precoL: "double",
    prodL: "double",
    description: "string",
    createdAt: "date",
    assignee: {
      type: "linkingObjects",
      objectType: "VacasSchema",
      property: "receitas",
    },
  },
};

export const VacasSchema = {
  name: "VacasSchema",
  primaryKey: "_id",
  properties: {
    _id: "string",
    nomeVaca: "string",
    nascimentoVaca: "string",
    brincoVaca: "string",
    descVaca: "string?",
    createdAt: "date",
    genero: "double",
    receitas: "ReceitaSchema[]",
    despesas: "DespesasSchema[]",
    reproducao: "ReproducaoSchema[]",
    assignee: {
      type: "linkingObjects",
      objectType: "RebanhoSchema",
      property: "vacas",
    },
  },
};
export const AlertEstoqueSchema = {
  name: "AlertEstoqueSchema",
  primaryKey: "_id",
  properties: {
    _id: "string",
    alertOn: "bool",
    alertMin: "int",
    assignee: {
      type: "linkingObjects",
      objectType: "AtualEstoqueSchema",
      property: "alert",
    },
  },
};
export const ReproducaoSchema = {
  name: "ReproducaoSchema",
  primaryKey: "_id",
  properties: {
    _id: "string",
    cio: "bool",
    cobertura: "bool",
    prenhez: "bool",
    dataCio: "date?",
    dataCobertura: "date?",
    dataParto: "date?",
    partos: "dataParto[]",
    notificacao: "bool?",
    assignee: {
      type: "linkingObjects",
      objectType: "VacasSchema",
      property: "reproducao",
    },
  },
};
export const dataParto = {
  name: "dataParto",
  primaryKey: "_id",
  properties: {
    _id: "string",
    dataParto: "date?",
    assignee: {
      type: "linkingObjects",
      objectType: "ReproducaoSchema",
      property: "partos",
    },
  },
};
