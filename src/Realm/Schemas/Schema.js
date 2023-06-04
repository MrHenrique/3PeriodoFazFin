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
    valorProd: "float",
    qtdProd: "float",
    volumeProd: "float?",
    pesoProd: "float?",
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
    valorProd: "float",
    volumeProd: "float?",
    pesoProd: "float?",
    obserProd: "string?",
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
    valorProd: "float",
    qtdProd: "float",
    volumeProd: "float?",
    pesoProd: "float?",
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
    tipo: "float",
    precoL: "float",
    prodL: "float",
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
    valorProd: "float",
    qtdProd: "float",
    volumeProd: "float?",
    pesoProd: "float?",
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
    tipo: "float",
    precoL: "float",
    prodL: "float",
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
    descVaca: "string",
    createdAt: "date",
    genero: "float",
    receitas: "ReceitaSchema[]",
    despesas: "DespesasSchema[]",
    assignee: {
      type: "linkingObjects",
      objectType: "RebanhoSchema",
      property: "vacas",
    },
  },
};
