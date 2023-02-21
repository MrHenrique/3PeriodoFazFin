import Realm from 'realm';
import { LeiteSchema, Far, Fazendas } from './Schemas';

export const getRealm = async () => await Realm.open({
    path: 'FazFin-DB',
    schema: [LeiteSchema, Fazendas],
    deleteRealmIfMigrationNeeded: true,
})