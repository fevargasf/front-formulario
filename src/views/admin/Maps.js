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
import { identifierActionsUser } from "redux/reducers/userQuerySlice";
import { identifierActionsActs } from "redux/reducers/actsExpSlice";
import {actsData} from "redux/reducers/actsExpSlice";
import { dataUserQuery } from "redux/reducers/userQuerySlice";
import Conclusiones from "components/Maps/Conclusiones";
import Recomendaciones from "components/Maps/Recomendaciones";
import SearchForm from "./SearchForm";
import Problematica from "components/Maps/Problematica";
import cora from "../../assets/img/cora.png"; 
import MapReportOb from "components/Maps/MapReportOb";
import { ActionButton } from "./ActionButton";

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
  const [visible, setVisible] = useState(false);
  const [checked, setChecked] = useState(false);

  function toggle(value){
    setChecked(false)
  }
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
     
     function fetchConsultaSinTer() {
      const dataIt= {
        niSecEETA: match.params.ID,
        niSecTer:"" /* cambiar back*/ 
      }
      dispatch({type: identifierActionsUser.FETCH_USER_IT,payload:dataIt});
      setVerIt(!verIt)
      };
      useEffect(() => {
        fetchConsultaSinTer();

      }, [match.params.ID]);

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
        content={() => componentToPrint.current }
      />
     
    </div>
    <div  ref={(el) => (componentToPrint.current = el)}>
      <div className="flex flex-wrap relative py-1 sm:mx-auto sm:max-w-xl opacity-5  text-black" >
        <div className="w-full border mt-12" >
          <div className="relative mt-4 flex flex-col min-w-0 break-words text-black opacity-5 w-full mb-6 shadow-lg rounded">
          <div className=" mt-4 mb-4  text-black">
          <form className="container border mt-0 mx-auto bg-[#50d71e] opacity-5">
          <button
                className="bg-indigo-500 font-bold rounded-full py-2 px-4  flex mx-4 shadow-lg uppercase tracking-wider text-black focus:outline-none"
                onClick={goPage}>
                HOME
            </button>
       {/*    <button
              type="button"
              onClick={handleThemeSwitch}
              className=" fixed mr-12 z-10 ml-4  bg-indigo-500 text-lg p-0 rounded-md">
              {theme === 'dark' ? '🌙' : '🌞'}
              </button> */}
            <div className="  overflow-x-auto justify-center text-center text-black py-10   mb-8">
         
            <table className="border flex w-full">
              <tbody>
                  <tr><th></th><th className="border">SISTEMA DE GESTIÓN INTEGRAL - SGI</th></tr>
                  <tr><td className="px-4 mr-2"><img style={{ width: "50%" ,height: "auto",marginLeft: "4rem", marginBottom:"1rem" }} src={cora}/>
                  </td><td className="border">INFORME TÉCNICO CONTROL Y SEGUIMIENTO PERMISO, CONCESIONES,
                                      <p> AUTORIZACIONES, LICENCIAS Y DEMÁS INSTRUMENTOS DE MANEJO </p>
                                      <p align="center">AMBIENTAL</p>
                                      <p className="flex mt-4" align="left"></p>
                                      <hr />
                                      <div className="flex  ">
                                        <div className="w-1/2 p-2 text-center ">CÓDIGO: F-ARN-34</div>
                                        <div className="w-1/2 p-2 text-center">VERSIÓN: 03</div>
                                        <div className="w-1/2 p-2 text-center">PÁGINA</div>
                                      </div>
                                      </td>
                  </tr>
                   </tbody>
          </table>
            {/*     
             <h1  className="text-2xl font-bold">CONTROL Y SEGUIMIENTO TÉCNICO</h1> */}
            </div>

            <h1 className="font-bold text-2xl text-gray-900 border-b-2 border-gray-100 p-2 mb-2">1. Información General:</h1>
            <div className="mr-4 px-12">
            <ol class="space-y-2  list-decimal list-inside text-black mb-4 dark:text-gray-400">
                <li>
                    <span class="font-semibold text-black text-xl mb-4 py-2 dark:text-white">Asunto :</span> {data['nombre_asunto']} 
                </li>
                <li>
                    <span class="font-semibold text-black text-xl mb-4 py-2 dark:text-white">Interesado :</span>{data['nombre_interesado']} 
                </li>
                <li>
                    <span class="font-semibold text-black text-xl mb-4 py-2 dark:text-white">Expediente :</span> {data['expediente']}
                </li>
                <li>
                    <span class="font-semibold text-black text-xl mb-4 py-2 dark:text-white">Expedientes Relacionados :</span> {data['expedientes_relacionados']}
                </li>
                <li>
                    <span class="font-semibold text-black text-xl mb-4 py-2 dark:text-white">Municipio :</span> {data['municipio']}
                </li>
                <li>
                    <span class="font-semibold text-black text-xl mb-4 py-2 dark:text-white">Fecha de visita  :</span> {data['numero_visita']}
                </li>
                <li>
                    <span class="font-semibold text-black text-xl mb-4 py-2 dark:text-white"> Acompañante  :</span> {data['acompagnantes_visita']}
                </li>
            </ol>
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
              <h1 className="font-bold text-2xl text-gray-900 border-b-2 border-gray-100 p-2 mb-2">5. SITUACIÓN ENCONTRADA :</h1>
              <hr />
              <br />
              <MapReportOb />
              <br />
              <br />
         <h1 className="font-bold text-2xl text-gray-900 border-b-2 border-gray-100 p-2 mb-2">6. ANÁLISIS DE INFORMACIÓN Y/O DOCUMENTACIÓN APORTADA :</h1>
              <hr />
              <br />
              <ToolsDocumento idEtapa={match.params.ID}/>
              <br /><br /> 
              <hr />
              <br />
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
              <h1>Se recomienda requerir al usuario para que de cumplimiento a las siguientes obligaciones :</h1>
              <br />
              <h1>(Incorporar obligaciones no cumplidas o cumplidas parcialmente, para orientar al área jurídica y las que considere necesarias):</h1>
              <br />
              <Recomendaciones/>
              <br />
              <br />
              <div>
                <h1>
                NOTA: El presente informe no constituye decisión de fondo, frente a la solicitud del permiso, autorización, concesión o licencia ambiental requerida; por lo tanto, la implementación de obras o actividades en él recomendadas, no podrá realizarse hasta tanto no se haya expedido el respectivo acto administrativo. 
                </h1>
              </div>
              {/* <SearchForm/>  */}
              <Upload idEtapa={match.params.ID}/>
            {/*   <PruebasA /> */}
             
            </form>
            <ActionButton/>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
