import React, { useState,useEffect }  from "react";
import { dataRecord } from "redux/reducers/recordExpSlice";
import { useDispatch, useSelector } from "react-redux";
import { identifierActions } from "redux/reducers/recordExpSlice"; 
import { useLocation } from "react-router";
import { identifierSaveRecordActions } from "redux/reducers/saveRecordSlice";
import { identifierSeeAction } from "redux/reducers/seeRecordSlice";
import { dataSeeRecord } from "redux/reducers/seeRecordSlice";
import { identifierDeleteRecordActions } from "redux/reducers/deleteRecordSlice";
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';

export default function AntecedentTable({color, idEtapa}) {
  var [noColumn, setNocol]= useState(1);
  const user = useSelector((state) => state.auth.usuario)
  const data = useSelector(dataRecord);
  const seeData = useSelector(dataSeeRecord)

  const _location = useLocation();
  const dispatch = useDispatch()
  const [mostrarComponente, setMostrarComponente] = useState(false);
  const [cerarComponente, setCerrarComponente] = useState(true);

  useEffect(() => {
  const pathname = _location.pathname;
    dispatch({type: identifierActions.FETCH_RECORD, payload:idEtapa})
       
   },[]);
  
   
   useEffect(() => {
  
      dispatch({type: identifierSeeAction.FETCH_SEE_RECORD, payload:idEtapa})
         
     },[]);


  async function handleSave(e,antecedente){
    e.preventDefault();
    const dataSave= {
      niSecEEta:Number(idEtapa),
      niSecDoc: Number(antecedente.doc_sec),
      viIdUsuario:user,
    }
  
     await dispatch({type:identifierSaveRecordActions.FETCH_SAVE_RECORD, payload:dataSave})
      await  dispatch({type: identifierActions.FETCH_RECORD, payload:idEtapa})
      await dispatch({type: identifierSeeAction.FETCH_SEE_RECORD, payload:idEtapa})
    
    }

   async function handleDelete(e, antecedente) {
      e.preventDefault();
      const dataDelete= {
        niSecEEta:Number(idEtapa),
        niSecDoc: Number(antecedente.doc_sec),
        viIdUsuario:user,
      }

             dispatch({type:identifierDeleteRecordActions.FETCH_DELETE_RECORD, payload:dataDelete})
      await  dispatch({type: identifierSeeAction.FETCH_SEE_RECORD, payload:idEtapa})
      await  dispatch({type: identifierActions.FETCH_RECORD, payload:idEtapa})
    }

  function setMostrar(e) {
      e.preventDefault();
    
      if (mostrarComponente === true) {
        setMostrarComponente(false);
      } else {
        setMostrarComponente(true);
      }
  }

  function setCerrar(e) {
    e.preventDefault();
      setCerrarComponente(!cerarComponente);
   }

    return (
      <>
       <hr />
       <button className="Upload__submit" onClick={(e) => setCerrar(e)}>
        {cerarComponente ? `Cerrar` : `Abrir`}
      </button>
        <div 
          className={
            " relative flex flex-col min-w-0 break-words w-full py-4 px-3 mx-3 mb-4 mt-0 shadow-lg rounded  text-black" 
          }>
          <div className="block w-full overflow-x-auto">
            {/* Projects table */}
            <div className={cerarComponente ? "show-element" : null}>
          {cerarComponente &&
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr >
                  <th
                    className={
                      "px-6 align-middle border border-solid py-2 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left text-black " } >
                        No.
                        </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left text-black "   } >
                   <h1>TIPO DOCUMENTO</h1>
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left text-black "  } >
                   <h1>RADICADO</h1>
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left text-black "}>
                   FECHA
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-black"}>
                    DESCRIPTOR
                  </th> 
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left text-black " } >
                   <h1>FECHA NOTIFICACIÓN</h1>
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid  text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-black "
                    }>
                    VER DOCUMENTO
                  </th> 
                  <th
                    className={
                      "px-6 align-middle border border-solid text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left text-black"
                    }>
                    QUITAR ANTECEDENTE
                  </th> 
                </tr>
              </thead>
               <tbody>
            
             {!!seeData && seeData.length > 0 && seeData.map((item,index)=>(
              
               <tr key={index}>
             
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                  {noColumn++}
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                   {item.tipo_documento}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <p>{item.radicado}</p>
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <p>{new Date(item.fecha).toLocaleString().split(',')[0]}</p>
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                   <br />
                  <p>{item.descriptor}</p>
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <p>{new Date(item.fecha_notificacion).toLocaleString().split(',')[0]}</p>
                  </td>
                  <td className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2 text-left">
                   <a style={{marginLeft:"50px"}} href={item.link_descarga}  target="_blank" rel="noreferrer">
                     📑
                  </a>
                  </td>
                  <button style={{marginLeft:"50px", color:"red"}} 
                  onClick={(e)=>handleDelete(e,item)} > 
                   <DeleteOutlinedIcon />
                  </button>
                </tr>
                
                ))} 
              </tbody>  
            
            </table>
           }
             </div>
          </div>
         </div>
          {/* end table */}
       <hr />
       <button className="Upload__submit" onClick={(e) => setMostrar(e)}>
        {/*Aqui solo cambio el texto de mi boton, para el ejemplo */}
        {mostrarComponente ? `Ocultar` : 'Agregar otros Antecedentes '}
        <AddCircleRoundedIcon/>
        </button>
        <div 
          className={
            " relative flex flex-col min-w-0 break-words w-full py-4 px-3 mx-3 mb-4 mt-0 shadow-lg rounded text-black"
          }>
          <div className="block w-full overflow-x-auto">
            {/* Projects table */}
            <div className={mostrarComponente ? "show-element" : null}>
        {mostrarComponente &&
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr >
                  <th
                    className={
                      "px-6 align-middle border border-solid py-2 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left text-black "} >
                        No.
                        </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left text-black "  } >
                   <h1>TIPO DOCUMENTO</h1>
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left text-black"  } >
                   <h1>RADICADO</h1>
                  </th>
            
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left text-black"}>
                   FECHA
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left text-black " 
                    }>
                    DESCRIPTOR
                  </th> 
                </tr>
              </thead>
               <tbody>
            
             {!!data && data.length > 0 && data.map((item,index)=>(
              
               <tr key={index}>
             
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                  {noColumn++}
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                   {item.tipo_documento}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <p>{item.radicado}</p>
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                   <br />
                  <p>{item.descriptor}-{item.doc_sec}</p>
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <button className="Upload__submit"
                  onClick={(e)=>handleSave(e,item)}
                  >Agregar</button>
               
                  </td> 
                </tr>
                
                ))} 
              </tbody>  
            
             </table>
             }
            </div>
            <div className="flex w-full">
            <textarea 
            placeholder="Sección texto para los Antecedentes..."
            className="flex w-full" />
            </div>
            
          </div>
        </div>
        
      </>
    );

  }
 