import {
  Fazenda,
  RebanhoSchema,
  VacasSchema,
  EstoqueEntradaSchema,
  AtualEstoqueSchema,
  DespesasSchema,
  ReceitaSchema,
  DespesaRebSchema,
  ReceitaRebSchema,
  AlertEstoqueSchema,
} from "../../src/Realm/Schemas/Schema";
import Realm from "realm";

export const getRealm = async () =>
  await Realm.open({
    path: "fazfin-app",
    schema: [
      Fazenda,
      RebanhoSchema,
      VacasSchema,
      DespesasSchema,
      ReceitaSchema,
      EstoqueEntradaSchema,
      AtualEstoqueSchema,
      DespesaRebSchema,
      ReceitaRebSchema,
      AlertEstoqueSchema,
    ],
    schemaVersion: 1,
    deleteRealmIfMigrationNeeded: true,
  });
