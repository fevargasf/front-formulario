import React, {useState, useEffect, useRef }  from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import ReactToPrint from "react-to-print";
import { makeStyles } from '@material-ui/core/styles';

import { identifierActions } from "redux/reducers/informationSlice";
import TablaAntecedentes from "components/Maps/twoPartInforme";
import Coordenadas from "components/Maps/Coordenadas"
import { useLocation } from "react-router";
import { dataInformation } from "redux/reducers/informationSlice";
import Upload from "components/Maps/Firma";
import Obliga from "components/Maps/ObligacionesUsuario";
import { dataQuerySign } from "redux/reducers/querySignSlice";
import { identifierQueryAction } from "redux/reducers/querySignSlice";
import ToolsDocumento from "components/Maps/ToolsDocumentos";
import Normal from "components/Maps/Normal";
import { identifierActionsUser } from "redux/reducers/userQuerySlice";
import { identifierActionsActs } from "redux/reducers/actsExpSlice";
import {actsData} from "redux/reducers/actsExpSlice";
import { dataUserQuery } from "redux/reducers/userQuerySlice";
import Conclusiones from "components/Maps/Conclusiones";
import Recomendaciones from "components/Maps/Recomendaciones";


const useStyles = makeStyles((theme) => ({
  btns:{
      '& > *': {
      margin: theme.spacing(1),
    },
      marginTop: "0rem",
      right: "37rem",
      zIndex:"1000000",
      position:"absolute"
  }
}));


export default function Maps({match, color,idEtapa }) {
  const classes = useStyles();
  const ActionButtonProps = {
    componentToPrint: useRef(null)
  };
 
  const history = useHistory();
 // const { componentToPrint } = ActionButtonProps;
  const componentToPrint = ActionButtonProps

  const goPage = () => {history.push("/asignaciones")}
  const user = useSelector((state) => state.auth.usuario)
  const data = useSelector(dataInformation);
  const acts = useSelector(actsData)
  const location = useLocation();
  const userFirma = useSelector(dataQuerySign)
  const dispatch = useDispatch()
  const obligaciones = useSelector(dataUserQuery)
  const [it,setIt] = useState(obligaciones);
  const [verIt, setVerIt] = useState(false);

  useEffect(() => {
    const dataInformacion = {
      niSecEEta: match.params.ID,
      viIdUsuario:user
    }
    const dataObli = {
      niSecEETA: match.params.ID,
      niSecTer:data.exp_sec
    }
   
    dispatch({type: identifierActions.FETCH_INFORMATION, payload: dataInformacion })
    dispatch({type:identifierQueryAction.FETCH_QUERY_SIGN, payload:dataInformacion.niSecEEta})
   
    dispatch({type:identifierActionsActs.FETCH_ACTS, payload:dataObli.niSecTer})

     },[]);
     
     function fetchPoema() {
      const dataIt= {
        niSecEETA: match.params.ID,
        niSecTer:115147 /* cambiar back*/ 
      }
      dispatch({type: identifierActionsUser.FETCH_USER_IT,payload:dataIt});
      setVerIt(!verIt)
      };
      
      useEffect(() => {
        fetchPoema();

      }, []);
  return (
    <>
    <div className={classes.btns}>
    <ReactToPrint
        trigger={() => (
          <Button id={"print"}   variant="contained" color="primary">
            {" "}
            {"PDF"}{" "}
          </Button>
        )}
        content={() => componentToPrint.current}
      />
    </div>
    <div ref={(el) => (componentToPrint.current = el)}>
    <div className="flex flex-wrap bg-lightBlue-900 text-white" >
        <div className="w-full mt-12" >
          <div className="relative mt-4 flex flex-col min-w-0 break-words bg-lightBlue-900 text-white w-full mb-6 shadow-lg rounded">
          <div className="flex  mt-4 mb-4 bg-lightBlue-900 text-white">
          <form className="container mt-0 mx-auto bg-[#50d71e]">
       {/*    <button
              type="button"
              onClick={handleThemeSwitch}
              className=" fixed mr-12 z-10 ml-4  bg-indigo-500 text-lg p-0 rounded-md">
              {theme === 'dark' ? '🌙' : '🌞'}
              </button> */}
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
                    Fecha de visita :
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
                    Acompañante :
                  </label>
                  <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                   
                   disabled
                   type="password" placeholder={data['acompagnantes_visita']}/>
                </div>     
              </div>
              <h1 className="font-bold text-2xl text-gray-900 border-b-2 border-gray-100 p-2 mb-2">2. ANTECEDENTES :</h1>
              <TablaAntecedentes idEtapa={match.params.ID}/>
              <h1 className="font-bold text-2xl text-gray-900 border-b-2 border-gray-100 p-2 mb-2">3. COORDENADAS ASOCIADAS AL TRÁMITE AMBIENTAL :</h1>
              <hr />
              <br />
              <br />
              <Coordenadas idEtapa={match.params.ID}/>
              <br />
              <br />
              <h1 className="font-bold text-2xl text-gray-900 border-b-2 border-gray-100 p-2 mb-2">4. OBLIGACIONES DEL USUARIO A SER VERIFICADAS :</h1>
              <hr />
              <br />
              <br />
          
              <Obliga  idEtapa={match.params.ID}/>
              <br />
              <br />
             {/*  <h1 className="font-bold text-2xl text-gray-900 border-b-2 border-gray-100 p-2 mb-2">5. SITUACIÓN ENCONTRADA :</h1>
              <hr />
              <MapExample /> */}
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
              <h1 className="font-bold text-2xl text-gray-900 border-b-2 border-gray-100 p-2 mb-2">7. IDENTIFICACIÓN DE AFECTACIÓN Y/O PROBLEMÁTICA AMBIENTAL :</h1>
              <hr />
              <br />
              <br />
              <Normal/>
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
            {/*   <PruebasA /> */}
             
            </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
