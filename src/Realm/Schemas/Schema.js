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
    valorCompra: "float",
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
    valorCompra: "float",
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
    gastos: "GastosSchema[]",
    estoqueConsumo: "EstoqueConsumoSchema[]",
    assignee: {
      type: "linkingObjects",
      objectType: "Farm",
      property: "rebanhos",
    },
  },
};
export const EstoqueConsumoSchema = {
  name: "EstoqueConsumoSchema",
  primaryKey: "_id",
  properties: {
    _id: "string",
    nomeProd: "string",
    createdAt: "date",
    valorCompra: "float",
    volumeProd: "float?",
    pesoProd: "float?",
    obserProd: "string?",
    assignee: {
      type: "linkingObjects",
      objectType: "RebanhoSchema",
      property: "estoqueConsumo",
    },
  },
};
export const LeiteSchema = {
  name: "LeiteSchema",
  primaryKey: "_id",
  properties: {
    _id: "string",
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
    receitas: "LeiteSchema[]",
    assignee: {
      type: "linkingObjects",
      objectType: "RebanhoSchema",
      property: "vacas",
    },
  },
};
export const GastosSchema = {
  name: "GastosSchema",
  primaryKey: "_id",
  properties: {
    _id: "string",
    tipoAlim: "string?",
    qtdAli: "float?",
    valorAli: "float?",
    consumoAli: "float?",
    assignee: {
      type: "linkingObjects",
      objectType: "RebanhoSchema",
      property: "gastos",
    },
  },
};
