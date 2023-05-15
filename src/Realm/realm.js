import {
  LeiteSchema,
  Fazenda,
  RebanhoSchema,
  VacasSchema,
  EstoqueEntradaSchema,
  AtualEstoqueSchema,
  DespesasSchema,
} from "../../src/Realm/Schemas/Schema";
import Realm from "realm";

export const getRealm = async () =>
  await Realm.open({
    path: "fazfin-app",
    schema: [
      LeiteSchema,
      Fazenda,
      RebanhoSchema,
      VacasSchema,
      DespesasSchema,
      EstoqueEntradaSchema,
      AtualEstoqueSchema,
    ],
    schemaVersion: 2,
    deleteRealmIfMigrationNeeded: true,
  });
