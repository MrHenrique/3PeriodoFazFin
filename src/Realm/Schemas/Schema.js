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
    assignee: {
      type: "linkingObjects",
      objectType: "Farm",
      property: "rebanhos",
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
export const ReproducaoSchema = {
  name: "ReproducaoSchema",
  primaryKey: "_id",
  properties: {
    _id: "string",
    cobertura: "date",
    cria: "date",
    cio: "date",
    assignee: {
      type: "linkingObjects",
      objectType: "VacasSchema",
      property: "reproducao",
    },
  },
};
