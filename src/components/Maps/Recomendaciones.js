import React from "react";

export default function Recomendaciones() {
    return (
        <div className="flex flex-col">
           
            <h1>OBLIGACIONES A CONSIDERAR:</h1>
            <hr />
            <br />
           
            <div className="overflow-x-auto">
                <div className="p-1.5 w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                    >
                                       DESCRIPCIÓN
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                    >
                                       PLAZO(meses)
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                <tr>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                        1
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                        sin datos
                                    </td>
                                  
                                </tr>
                            </tbody>
                        </table>
                        <br />
                    </div>
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
                                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                    >
                                       CUMPLIÓ
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                        1
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                       sin datos
                                    </td>
                                </tr>
                                
                            </tbody>
                        </table>
        </div>
    );
}