import {
  LeiteSchema,
  Fazenda,
  RebanhoSchema,
  VacasSchema,
  GastosSchema,
  EstoqueSchema,
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
      EstoqueSchema,
    ],
    schemaVersion: 4,
    deleteRealmIfMigrationNeeded: true,
  });
