import {
  LeiteSchema,
  Fazenda,
  RebanhoSchema,
  VacasSchema,
  GastosSchema,
} from "../../src/Realm/Schemas/Schema";
import Realm from "realm";

export const getRealm = async () =>
  await Realm.open({
    path: "fazfin-app",
    schema: [LeiteSchema, Fazenda, RebanhoSchema, VacasSchema, GastosSchema],
    schemaVersion: 2,
    deleteRealmIfMigrationNeeded: true,
  });
