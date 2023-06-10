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
  const [precoCF, SetPrecoCF] = useState(0);
  function PrecoCF(precoCF) {
    SetPrecoCF(precoCF);
  }
  const [listaAli, SetListaAli] = useState([]);
  function ListaAli(dataGas) {
    SetListaAli(dataGas);
  }
  const [listaLeite, SetListaLeite] = useState([]);
  function ListaLeite(dataLeite) {
    SetListaLeite(dataLeite);
  }
  const [precoLeite, SetPrecoLeite] = useState(0);
  function PrecoLeite(precoLeite) {
    SetPrecoLeite(precoLeite);
  }
  const [precoCFReb, SetPrecoCFReb] = useState(0);
  function PrecoCFReb(precoCF) {
    SetPrecoCFReb(precoCF);
  }
  const [listaLeiteReb, SetListaLeiteReb] = useState([]);
  function ListaLeiteReb(dataLeite) {
    SetListaLeiteReb(dataLeite);
  }
  const [precoLeiteReb, SetPrecoLeiteReb] = useState(0);
  function PrecoLeiteReb(precoLeite) {
    SetPrecoLeiteReb(precoLeite);
  }
  const [listaAliReb, SetListaAliReb] = useState([]);
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
  }
  const [idEstoqueSaida, SetIdEstoqueSaida] = useState();
  function IdEstoqueSaida(dataID) {
    SetIdEstoqueSaida(dataID);
  }
  const [tipoEstoqueSaida, SetTipoEstoqueSaida] = useState();
  function TipoEstoqueSaida(dataTipo) {
    SetTipoEstoqueSaida(dataTipo);
  }
  const [shouldGoPageFinanceiro, setShouldGoPageFinanceiro] = useState();
  function ShouldGoPageFinanceiro(Pagegoto) {
    setShouldGoPageFinanceiro(Pagegoto);
  }
  const [filtroSelec, setFiltroSelec] = useState();
  function FiltroSelec(tipoFiltro) {
    setFiltroSelec(tipoFiltro);
  }
  const [idVaca, setIdVaca] = useState();
  function IdVaca(idVaca) {
    setIdVaca(idVaca);
  }
  const [machoFemea, setMachoFemea] = useState();
  function MachoFemea(value) {
    setMachoFemea(value);
  }
  const [genero, setGenero] = useState();
  function Genero(value) {
    setGenero(value);
  }
  return (
    <AuthContext.Provider
      value={{
        Genero,
        genero,
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
        shouldGoPageFinanceiro,
        ShouldGoPageFinanceiro,
        FiltroSelec,
        filtroSelec,
        idVaca,
        IdVaca,
        MachoFemea,
        machoFemea,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;
