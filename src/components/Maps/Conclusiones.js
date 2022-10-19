import React, { useState }  from "react";
import { useSelector } from "react-redux";

import { dataUserQuery } from "redux/reducers/userQuerySlice";

export default function Conclusiones() {
    const obligaciones = useSelector(dataUserQuery);
    const [query, setQuery] = useState(false);
    return (
        <div className="flex flex-col">
              <textarea 
           className="flex w-full"
           />
           <br /><br />
            <div className="overflow-x-auto">
                <div className="p-1.5 w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg">
                        <table className="w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase " >
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
                                       CUMPLIÓ
                                    </th>
                                  
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {obligaciones.lista_obligacionesIt?.filter(obj => obj.cumplio == "Total" ).map((item,index)=>(
                                  <tr key={index}>
                                  <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                      {item.obligacion}
                                  </td>
                                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                     {item.observaciones}
                                  </td>
                                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                     {item.cumplio}
                                  </td>
                              </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}