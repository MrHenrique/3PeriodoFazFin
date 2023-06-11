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
  ReproducaoSchema,
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
      ReproducaoSchema,
    ],
    schemaVersion: 1,
    deleteRealmIfMigrationNeeded: true,
  });
