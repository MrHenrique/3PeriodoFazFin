import {
  LeiteSchema,
  Fazenda,
  RebanhoSchema,
  VacasSchema,
  GastosSchema,
  ReproducaoSchema,
} from "../../src/Realm/Schemas/Schema";
import Realm from "realm";

export const getRealm = async () =>
  await Realm.open({
    path: "fazfin-app",
    schema: [LeiteSchema, Fazenda, RebanhoSchema, VacasSchema, GastosSchema, ReproducaoSchema],
    schemaVersion: 3,
    deleteRealmIfMigrationNeeded: true,
  });
