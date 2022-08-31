import React, { useState,useEffect }  from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { identifierActions } from "redux/reducers/asignacionSlice";
import {Link} from "react-router-dom";
import { dataLogin } from "redux/reducers/authSlice";
import { dataAssignament } from "redux/reducers/asignacionSlice";
export default function CardTable({ color}) {

  const [query, setQuery] = useState("");
   var [noColumn, setNocol]= useState(1);
   const user = useSelector(dataLogin)
   const data = useSelector(dataAssignament);
   const history = useHistory();
   const dispatch = useDispatch()
   


  useEffect(() => {
   
    dispatch({type: identifierActions.FETCH_ALL_ASINGNAMENTS, payload: user.usuario})

    }, []);

    
    return (
      
      <>
        <div 
          className={
            " relative flex flex-col min-w-0 break-words w-full py-4 px-3 mx-3 mb-4 mt-20 shadow-lg rounded " +
            (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
          }>
             <div className="relative flex w-full flex-wrap items-stretch">
              <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                <i className="fas fa-search"></i></span>
                <input type="text"
                 placeholder="Buscar Asignación..." 
                 onChange={event => setQuery(event.target.value)}
                 className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"/>
                 
              </div> 
    
          <div className="rounded-t mb-0 px-6 py-0 border-0">
            <div className="flex flex-wrap  py-4 items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h1
                  className={"font-semibold text-lg " +(color === "light" ? "text-blueGray-700" : "text-white")}> Mis asignaciones</h1>
              </div>
            </div>
          </div>
          <div className="block w-full overflow-x-auto">
            {/* Projects table */}
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr >
                  <th
                    className={
                      "px-6 align-middle border border-solid py-2 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")}>No.
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                    } >
                    Expediente
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                    }>
                    Radicado
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                    } >
                    Asignación
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                    }>
                    Tipo de Actuación
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                    }>
                    Etapa
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                    }>
                    Fecha de <br />asignación
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                    }
                  >Tipo de trámite</th>
                   <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                    }
                  >Aplica Estrategia</th>
                </tr>
              </thead>
       <tbody>
                
          { data.filter(itemnNum => {
           const item = itemnNum.expediente
                        if (query === "") {
                          console.log(query)
                          return item;
                        }  else if (item.includes(query)) {
                          //returns filtered array
                          return item;
                        }
                      }).map((item, index) => (
                     
               <tr key={index}>
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                  {noColumn++}
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                   {item.expediente}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {item.radicado}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4" >
                    {item.numero_asignacion}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {item.nom_tipo_actuacion}
                  
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 bg-transparent text-xs  whitespace-nowrap p-4 text-right">
                  <Link  to={`asignaciones/formulario/${item.tipo_etapa}/${item.sec}`}>
                   <h1 className="text-xs text-indigo-900 font-bold py-2">{item.tipo_etapa}  <i className="fas fa-chevron-right"></i></h1>
                  </Link>
                    
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                  {new Date(item.fecha_asignacion).toLocaleString().split(',')[0]}
                 
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                  {item.tipo_tramite}
                 
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                  {item.estrategia}
                 
                  </td>
                </tr>
             
             ))} 
              </tbody>  
            </table>
          </div>
        </div>
        
      </>
    ); 

}


CardTable.defaultProps = {
  color: "dark",
};

CardTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
