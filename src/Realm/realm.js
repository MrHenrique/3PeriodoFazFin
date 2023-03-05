import {
  LeiteSchema,
  Fazenda,
  RebanhoSchema,
  VacasSchema,
  GastosSchema,
  EstoqueEntradaSchema,
  AtualEstoqueSchema,
  EstoqueConsumoSchema,
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
      GastosSchema,
      EstoqueEntradaSchema,
      AtualEstoqueSchema,
      EstoqueConsumoSchema,
    ],
    schemaVersion: 10,
    deleteRealmIfMigrationNeeded: true,
  });
