export const Fazendas = {
    name: "Farm",
    primaryKey: "_id",
    properties: {
        _id: "string",
        name: "string",
        owner: "string",
        createdAt: "date",
        contaleite: "Leite[]",
    },
};

export const LeiteSchema = {

    name: "Leite",
    primaryKey: "_id",
    properties: {
        _id: "string",
        precoleite: "float",
        litros: "float",
        descricao: "string",
        createdAt: "date",
    },
    assignee: {
        type: 'linkingObjects',
        objectType: 'Farm',
        property: 'contaleite'
    }
};