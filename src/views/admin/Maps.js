import React, {useState, useEffect }  from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { identifierActions } from "redux/reducers/informationSlice";
import MapExample from "components/Maps/MapExample.js";
import TablaAntecedentes from "components/Maps/twoPartInforme";
import Coordenadas from "components/Maps/Coordenadas"
import { useLocation } from "react-router";
import { dataInformation } from "redux/reducers/informationSlice";
import Upload from "components/Maps/Firma";
import Obliga from "components/Maps/ObligacionesUsuario";



export default function Maps({match, color}) {
  const history = useHistory();
  const goPage = () => {history.push("/asignaciones")}
  const user = useSelector((state) => state.auth.usuario)
  const data = useSelector(dataInformation);
  const location = useLocation();

  const dispatch = useDispatch()

  useEffect(() => {
    const dataInformacion = {
      niSecEEta: match.params.ID,
      viIdUsuario:user
    }
    dispatch({type: identifierActions.FETCH_INFORMATION, payload: dataInformacion })

     },[]);
  
     const [theme, setTheme] = useState(null);

     useEffect(() => {
       if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
         setTheme('bg-black');
       } else {
         setTheme('bg-white');
       }
     }, []);
     
     const handleThemeSwitch = () => {
       setTheme(theme === 'bg-black' ? 'bg-white' : 'bg-black');
     };
     
     useEffect(() => {
       if (theme === 'bg-black') {
         document.documentElement.classList.add('bg-black');
       } else {
         document.documentElement.classList.remove('bg-black');
       }
     }, [theme]);

  
  return (
    <>
      <div className="flex flex-wrap bg-lightBlue-900 text-white" >
        <div className="w-full mt-12" >
          <div className="relative mt-4 flex flex-col min-w-0 break-words bg-lightBlue-900 text-white w-full mb-6 shadow-lg rounded">
          <div className="flex  mt-4 mb-4 bg-lightBlue-900 text-white">
          <form className="container mt-0 mx-auto bg-[#50d71e]">
          <button
              type="button"
              onClick={handleThemeSwitch}
              className=" fixed mr-12 z-10 ml-4  bg-indigo-500 text-lg p-0 rounded-md">
              {theme === 'dark' ? '🌙' : '🌞'}
              </button>
            <div className="text-center py-10  shadow-md mb-8">
              <button
                className="bg-indigo-500 font-bold rounded-full py-2 px-4  flex mx-4 shadow-lg uppercase tracking-wider text-white focus:outline-none"
                onClick={goPage}>
                HOME
            </button>
           
              <h1  className="text-2xl font-bold">CONTROL Y SEGUIMIENTO TÉCNICO</h1>
            </div>

            <h1 className="font-bold text-2xl text-gray-900 border-b-2 border-gray-100 p-2 mb-2">1. Información General:</h1>
            <div className={" mt-4 grid gap-y-6 grid-cols-2 bg-blue-500 md:bg-green-500 " +
            (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")}>
                  <div className="flex mt-4 gap-x-4">
                    <div className="w-full md:w-1 px-3 mb-6 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                        Asunto:
                      </label>
                      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                     
                      disabled
                      type="password" placeholder={data['nombre_asunto']}/>
                     
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                        Interesado:
                      </label>
                      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                     
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
                     
                      disabled
                      type="password" placeholder={data['expediente']}/>
                     
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                        Expedientes Relacionados:
                      </label>
                      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                      
                      disabled
                      type="password"placeholder={data['expedientes_relacionados']}/>
                     
                    </div>
                  </div>
            </div>
              
          
              <div className="flex mt-4 gap-x-4 bg-lightBlue-900 text-white">
                <div className="w-full md:w-1 px-3 mb-6 md:mb-0 ">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                    Municipio:
                  </label>
                  <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                 
                  disabled
                  type="password" placeholder={data['municipio']}/>
                 
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                    Fecha de visita:
                  </label>
                  <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                   id="grid-fecha"
                   disabled
                   type="password" placeholder={data['numero_visita']}/>
                </div>
              </div>
              
              <div className="flex mt-4 gap-x-4 bg-lightBlue-900 text-white">
                <div className="w-full md:w-1 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                    Acompañante:
                  </label>
                  <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                   
                   disabled
                   type="password" placeholder={data['acompagnantes_visita']}/>
                </div>     
              </div>
              <h1 className="font-bold text-2xl text-gray-900 border-b-2 border-gray-100 p-2 mb-2">2. Antecedentes:</h1>
              <TablaAntecedentes idEtapa={match.params.ID}/>
              <h1 className="font-bold text-2xl text-gray-900 border-b-2 border-gray-100 p-2 mb-2">3. Coordenadas asociadas al trámite ambiental:</h1>
              <Coordenadas/>
              <h1 className="font-bold text-2xl text-gray-900 border-b-2 border-gray-100 p-2 mb-2">4. OBLIGACIONES DEL USUARIO A SER VERIFICADAS</h1>
              <hr />
              <Obliga idEtapa={match.params.ID}/>
              <Upload idEtapa={match.params.ID}/>
           
            </form>
          </div>
       
          {/*   <MapExample /> */}
          
          </div>
        </div>
      </div>
    </>
  );
}
