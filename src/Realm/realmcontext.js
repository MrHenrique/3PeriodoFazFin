import { createRealmContext } from "@realm/react";
import { LeiteSchema,Fazendas } from "../../src/Realm/Schemas/Schema";
export const { useRealm, useQuery, RealmProvider } = createRealmContext({
  schema: [LeiteSchema,Fazendas],
  deleteRealmIfMigrationNeeded: true,
});
