import React, { useState,useEffect }  from "react";
import axios from 'axios'; 
// components

import MapExample from "components/Maps/MapExample.js";
import TablaAntecedentes from "components/Maps/twoPartInforme";

export default function Maps() {
  const nomFuncionario='daniela_bonilla';
  const idAsignacion = '1219324';

  const [infoBasic, setInfoBasic] = useState([]);

  useEffect(() => {

    async function doPostRequest() {

      let res = await axios.post(`http://localhost:8082/informacionBasica?niSecEEta=${idAsignacion}&viIdUsuario=${nomFuncionario}`);
    
      let data = res.data;
      setInfoBasic(res.data)
      console.log(data);
    }
    doPostRequest();
  },[]);


  
  return (
    <>
      <div className="flex flex-wrap ">
        <div className="w-full mt-0" >
          <div className="relative mt-0 flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="flex  mt-0 mb-4">
        
      
          <form className="container mt-0 mx-auto bg-[#50d71e]">
            <div class="text-center py-10  shadow-md mb-8">
              <h1  class="text-2xl font-bold">CONTROL Y SEGUIMIENTO</h1>
            </div>
          
            <h1 class="font-bold text-2xl text-gray-900 border-b-2 border-gray-100 p-2 mb-2">1. Información General:</h1>
            <div className=" mt-10 grid gap-y-6 grid-cols-2 bg-blue-500 md:bg-green-500 ">
                  <div className="flex mt-4 gap-x-4">
                    <div className="w-full md:w-1 px-3 mb-6 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                        Asunto:
                      </label>
                      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                      id="grid-password" 
                      disabled="true"
                      type="password" placeholder={infoBasic.nombre_asunto}/>
                     
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                        Interesado:
                      </label>
                      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                      id="grid-password" 
                      disabled="true"
                      type="password" placeholder={infoBasic.nombre_interesado}/>
                     
                    </div>
                  </div>
                  <div className="flex mt-4 gap-x-4">
                    <div className="w-full md:w-1 px-3 mb-6 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                        Expediente:
                      </label>
                      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                      id="grid-password" 
                      disabled="true"
                      type="password" placeholder={infoBasic.expediente}/>
                     
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                        Expedientes Relacionados:
                      </label>
                      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                      id="grid-password"
                      disabled="true"
                      type="password" placeholder={infoBasic.expedientes_relacionados}/>
                     
                    </div>
                  </div>
              </div>
              
          
              <div className="flex mt-4 gap-x-4">
                <div className="w-full md:w-1 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                    Municipio:
                  </label>
                  <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                  id="grid-password" 
                  disabled="true"
                  type="password" placeholder={infoBasic.municipio}/>
                 
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                    Fecha de visita:
                  </label>
                  <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                   id="grid-password"
                   disabled="true"
                   type="password" placeholder={infoBasic.fecha_realiza_visita}/>
                </div>
              </div>
              
              <div className="flex mt-4 gap-x-4">
                <div className="w-full md:w-1 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                    Acompañante:
                  </label>
                  <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                   id="grid-password"
                   disabled="true"
                   type="password" placeholder={infoBasic.acompagnantes_visita}/>
                </div>     
              </div>
              <h1 class="font-bold text-2xl text-gray-900 border-b-2 border-gray-100 p-2 mb-2">2. Antecedentes:</h1>
              <TablaAntecedentes/>
              <h1 class="font-bold text-2xl text-gray-900 border-b-2 border-gray-100 p-2 mb-2">3. Coordenadas asociadas al trámite ambiental:</h1>
            </form>
          </div>
       
          {/*   <MapExample /> */}
          
          </div>
        </div>
      </div>
    </>
  );
}
