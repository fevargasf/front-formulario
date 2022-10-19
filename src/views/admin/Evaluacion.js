import React, { useState,useEffect }  from "react";
import { useDispatch, useSelector } from "react-redux";
import MapExample from "components/Maps/MapExample.js";
import TablaAntecedentes from "components/Maps/twoPartInforme";
import Coordenadas from "components/Maps/Coordenadas"
import { useLocation } from "react-router";
import { identifierActions } from "redux/reducers/informationSlice"; 
import { dataInformation } from "redux/reducers/informationSlice";
import { useHistory } from 'react-router-dom';
import Obliga from "components/Maps/ObligacionesUsuario";
import Upload from "components/Maps/Firma";
import ToolsDocumento from "components/Maps/ToolsDocumentos";
import Problematica from "components/Maps/Problematica";
import { dataAutogestion } from "redux/reducers/autogestionSlice";
import { identifierAutogestionAction } from "redux/reducers/autogestionSlice";
import Conclusiones from "components/Maps/Conclusiones";
import Recomendaciones from "components/Maps/Recomendaciones";


export default function Evaluacion({match, color}) {
  const dataAuto = useSelector(dataAutogestion);
  const history = useHistory();
  const goPage = () => {history.push("/asignaciones")}
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.usuario)
  const data = useSelector(dataInformation);
  const location = useLocation();

  useEffect(() => {
    console.log(location)
    console.log(match)
    
        const dataInformacion = {
          niSecEEta: match.params.ID,
          viIdUsuario:user
        }
        dispatch({type: identifierActions.FETCH_INFORMATION, payload: dataInformacion })
      
        const updateDataAutogestion= ()=>{

          dispatch({
            type: identifierAutogestionAction.FETCH_QUERY_AUTOGESTION, payload: dataInformacion.niSecEEta});
        }
        
         updateDataAutogestion();
         },[]);


  
  return (
    <>
      <div className="flex flex-wrap bg-lightBlue-900 text-white">
        <div className="w-full mt-12" >
          <div className="relative mt4 flex flex-col min-w-0 break-words bg-lightBlue-900 w-full mb-6 shadow-lg rounded">
          <div className="flex  mt-4 mb-4">

          <form className="container mt-0 mx-auto bg-[#50d71e]">
            <div className="text-center py-10  shadow-md mb-8">
            <button
                className="bg-indigo-500 font-bold rounded-full py-2 px-4  flex mx-4 shadow-lg uppercase tracking-wider text-white focus:outline-none"
                onClick={goPage}>
                HOME
            </button>
              <h1  className="text-2xl font-bold">CONTROL Y SEGUIMIENTO TÉCNICO</h1>
            </div>
          
            <h1 className="font-bold text-2xl text-gray-900 border-b-2 border-gray-100 p-2 mb-2">1. Información General:</h1>
            <div className={" mt-4 grid gap-y-6 grid-cols-2" +
            (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")}>
                  <div className="flex mt-4 gap-x-4">
                    <div className="w-full md:w-1 px-3 mb-6 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                        Asunto:
                      </label>
                      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                      id="grid-password" 
                      disabled
                      type="password" placeholder={data['nombre_asunto']}/>
                     
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                        Interesado:
                      </label>
                      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                      id="grid-password" 
                      disabled
                      type="password" placeholder={data['nombre_interesado']}/>
                     
                    </div>
                  </div>
                  <div className="flex mt-4 gap-x-4">
                    <div className="w-full md:w-1 px-3 mb-6 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                        Expediente:
                      </label>
                      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                      id="grid-password" 
                      disabled
                      type="password" placeholder={data['expediente']}/>
                     
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                        Expedientes Relacionados:
                      </label>
                      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                      id="grid-password"
                      disabled
                      type="password"placeholder={data['expedientes_relacionados']}/>
                     
                    </div>
                  </div>
              </div>
              <div className="flex mt-4 gap-x-4">
                <div className="w-full md:w-1 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                    Municipio:
                  </label>
                  <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                  id="grid-password" 
                  disabled
                  type="password" placeholder={data['municipio']}/>
                 
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                    Fecha de visita:
                  </label>
                  <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                   id="grid-password"
                   disabled
                   type="password" placeholder={data['numero_visita']}/>
                </div>
              </div>
              
              <div className="flex mt-4 gap-x-4">
                <div className="w-full md:w-1 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                    Acompañante:
                  </label>
                  <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                   id="grid-password"
                   disabled
                   type="password" placeholder={data['acompagnantes_visita']}/>
                </div>     
              </div>
              <h1 className="font-bold text-2xl text-gray-900 border-b-2 border-gray-100 p-2 mb-2 text-xs uppercase ">2. Antecedentes:</h1>
              <TablaAntecedentes idEtapa={match.params.ID}/>
              <h1 className="font-bold text-2xl text-gray-900 border-b-2 border-gray-100 p-2 mb-2 text-xs uppercase ">3. Coordenadas asociadas al trámite ambiental:</h1>
              <Coordenadas/>
              <h1 className="font-bold text-2xl text-gray-900 border-b-2 border-gray-100 p-2 mb-2 text-xs uppercase ">4. OBLIGACIONES DEL USUARIO A SER VERIFICADAS</h1>
              <hr />
              <Obliga idEtapa={match.params.ID}/>
              <br />
              <br />
              <hr />
              <br />
              <br />
              <h1 className="font-bold text-2xl text-gray-900 border-b-2 border-gray-100 p-2 mb-2">6. ANÁLISIS DE INFORMACIÓN Y/O DOCUMENTACIÓN APORTADA :</h1>
              <hr />
              <br /><br />
              <ToolsDocumento/>
              <br /><br />
              <hr />
              <br />
              <br />
              <h1 className="font-bold text-2xl text-gray-900 border-b-2 border-gray-100 p-2 mb-2">7. IDENTIFICACIÓN DE PRESUNTA AFECTACIÓN  AMBIENTAL  Y/O CONFLICTO AMBIENTAL:</h1>
              <hr />
              <br />
               <h3>(Este punto solo aplica en los casos en que se presente un incumplimiento reiterado, frente a las obligaciones y condiciones del respectivo permiso ambiental, mediante acto administrativo) </h3>
               <Problematica/>
               <br />
              <br />
              <h1 className="font-bold text-2xl text-gray-900 border-b-2 border-gray-100 p-2 mb-2">8. CONCLUSIONES :</h1>
              <hr />
              <br />
              <h1>El usuario a cumplido con las siguientes obligaciones:</h1>
              <br />
              <h1>
              (Incorporar conclusiones relacionadas con el cumplimiento de obligaciones evaluadas en el numeral de obligaciones, asi como de asuntos relevantes identificados tanto en el numeral de análisis de información como en el numeral de situación encontrada, entre otras)</h1>
              <br />
              <Conclusiones/>
              <br />
              <br />
              <h1 className="font-bold text-2xl text-gray-900 border-b-2 border-gray-100 p-2 mb-2">9. RECOMENDACIONES :</h1>
              <hr />
              <br />
              <h1>(Incorporar obligaciones no cumplidas o cumplidas parcialmente, para orientar al área jurídica y las que considere necesarias):</h1>
              <br />
              <Recomendaciones/>
              <br />
              <br />
              <Upload idEtapa={match.params.ID}/>
         
            </form>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}
