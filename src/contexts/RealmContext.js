import React, { createContext, useContext, useEffect, useState } from "react";
import Realm from "realm";
import { getRealm } from "../Realm/realm";

export const RealmContext = createContext(undefined);

const RealmContextProvider = ({ children }) => {
  const [realm, setRealm] = useState(undefined);
  useEffect(() => {
    (async () => {
      setRealm(await getRealm());
    })();
  }, []);
  return (
    <RealmContext.Provider value={realm}>{children}</RealmContext.Provider>
  );
};
export const useMainContext = () => useContext(RealmContext);

export default RealmContextProvider;
