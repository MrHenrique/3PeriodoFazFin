import React, { createContext, useState } from "react";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [fazID, setFazID] = useState();
  function FazendaID(Fazid) {
    setFazID(Fazid);
  }
  const [rebID, setRebID] = useState();
  function RebanhoID(Rebid) {
    setRebID(Rebid);
  }
  const [fazProp, setFazProp] = useState({});
  function FazendaProp(FazProp) {
    setFazProp({
      FazProp: FazProp,
    });
  }
  const [precoCF, SetPrecoCF] = useState();
  function PrecoCF(precoCF) {
    SetPrecoCF(precoCF);
  }
  const [listaAli, SetListaAli] = useState();
  function ListaAli(dataGas) {
    SetListaAli(dataGas);
  }
  const [listaLeite, SetListaLeite] = useState();
  function ListaLeite(dataLeite) {
    SetListaLeite(dataLeite);
  }
  const [precoLeite, SetPrecoLeite] = useState();
  function PrecoLeite(precoLeite) {
    SetPrecoLeite(precoLeite);
  }
  const [precoCFReb, SetPrecoCFReb] = useState();
  function PrecoCFReb(precoCF) {
    SetPrecoCFReb(precoCF);
  }
  const [listaLeiteReb, SetListaLeiteReb] = useState();
  function ListaLeiteReb(dataLeite) {
    SetListaLeiteReb(dataLeite);
  }
  const [precoLeiteReb, SetPrecoLeiteReb] = useState();
  function PrecoLeiteReb(precoLeite) {
    SetPrecoLeiteReb(precoLeite);
  }
  const [listaAliReb, SetListaAliReb] = useState();
  function ListaAliReb(dataGas) {
    SetListaAliReb(dataGas);
  }
  const [grafVaca, SetGrafVaca] = useState();
  function GrafVaca(data) {
    SetGrafVaca(data);
  }
  const [tipoProd, SetTipoProd] = useState();
  function TipoProd(dataProd) {
    SetTipoProd(dataProd);
  }
  const [filtroMes, setFiltroMes] = useState();
  function FiltroMes(mesFiltro) {
    setFiltroMes(mesFiltro);
  }
  const [listaFiltrada, setListaFiltrada] = useState([]);
  function ListaFiltrada(listaFiltrada) {
    setListaFiltrada(listaFiltrada);
  }
  const [listaReceitaVacas, setListaReceitaVacas] = useState([]);
  function ListaReceitaVacas(receitaVacas) {
    setListaReceitaVacas(receitaVacas);
    const [idEstoqueSaida, SetIdEstoqueSaida] = useState();
    function IdEstoqueSaida(dataID) {
      SetIdEstoqueSaida(dataID);
    }
    const [tipoEstoqueSaida, SetTipoEstoqueSaida] = useState();
    function TipoEstoqueSaida(dataTipo) {
      SetTipoEstoqueSaida(dataTipo);
    }
    return (
      <AuthContext.Provider
        value={{
          ListaReceitaVacas,
          listaReceitaVacas,
          ListaFiltrada,
          listaFiltrada,
          FiltroMes,
          filtroMes,
          GrafVaca,
          grafVaca,
          TipoProd,
          tipoProd,
          FazendaID,
          fazID,
          RebanhoID,
          rebID,
          FazendaProp,
          fazProp,
          PrecoCF,
          precoCF,
          listaAli,
          ListaAli,
          ListaLeite,
          listaLeite,
          PrecoLeite,
          precoLeite,
          ListaLeiteReb,
          listaLeiteReb,
          PrecoLeiteReb,
          precoLeiteReb,
          PrecoCFReb,
          precoCFReb,
          listaAliReb,
          ListaAliReb,
          idEstoqueSaida,
          IdEstoqueSaida,
          tipoEstoqueSaida,
          TipoEstoqueSaida,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
}
export default AuthProvider;
