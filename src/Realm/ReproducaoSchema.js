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