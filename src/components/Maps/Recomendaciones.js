import React, { useState }  from "react";
import { useSelector } from "react-redux";

import { dataUserQuery } from "redux/reducers/userQuerySlice";

export default function Recomendaciones() {
    const obligaciones = useSelector(dataUserQuery);
    const [query, setQuery] = useState(false);
   
    return (
        <div className="flex flex-col">
           <textarea 
           className="flex w-full"
           />
           <br />
            <h1>OBLIGACIONES A CONSIDERAR:</h1>
            <hr />
            <br />
           
            <div className="overflow-x-auto">
               
                    <div className="overflow-hidden border ">
                        <table className="w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">
                                      OBLIGACIÓN
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">
                                       DESCRIPCIÓN
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">
                                       PLAZO(meses)
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {obligaciones.lista_obligacionesIt?.filter(obj => obj.cumplio == "No cumple" ).map((item,index)=>(
                                  <tr key={index}>
                                  <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                      {item.obligacion}
                                  </td>
                                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                     {item.observaciones}
                                  </td>
                                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                     {item.plazo_meses}
                                  </td>
                              </tr>
                                ))}
                            </tbody>
                        </table>
                        <br />
                    </div>
                
            </div>

            <br /><br />
                        <h1>NUEVAS OBLIGACIONES A CONSIDERAR :</h1>
                        <hr />
                        <br />
                        <table className="border">
                            <thead>
                                <tr>
                                <th
                                 scope="col"
                                  className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                    >
                                       OBLIGACIÓN
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                    >
                                       DESCRIPCIÓN
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">
                                       CUMPLIÓ
                                    </th>
                                </tr>
                            </thead>
                            <tbody> 
                            {obligaciones.lista_obligacionesIt?.filter(obj => obj.cumplio === null ).map((item,index)=>(
                                  <tr key={index}>
                                  <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                      {item.obligacion}
                                  </td>
                                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                     {item.observaciones}
                                  </td>
                                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                     {item.plazo_meses}
                                  </td>
                              </tr>
                                ))}
                            </tbody>
                        </table>
        </div>
    );
}