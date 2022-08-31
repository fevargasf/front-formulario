

 import React, { useState,useEffect }  from "react";
import { axiosInstance } from "Helpers/auth-helpers";

export default function AntecedentTable({color}) {

    return (
      <>
        <div 
          className={
            " relative flex flex-col min-w-0 break-words w-full py-4 px-3 mx-3 mb-4 mt-0 shadow-lg rounded " +
            (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
       
          }>
          <div className="block w-full overflow-x-auto">
            {/* Projects table */}
        <table className="items-left w-full bg-transparent border-collapse">
       
        <thead>
          <tr>
            <th className="border border-green-600 w-1/4">Descripción:</th>
            <th className="border border-green-600">
            xxxxxxxxxx</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-green-600">Sistema de referencia</td>
            <td className="border border-green-600">
                xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            </td>
          </tr>
          <tr>
            <td className="border border-green-600">Coordenadas</td>
            <td className="border border-green-600">
            <h1>X</h1><br />
            <h1>Y</h1>
            </td>
          
          </tr>
          <tr>
            <td className="border border-green-600">Observación</td>
            <td className="border border-green-600">
               xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            </td>
          </tr>
        </tbody>
        </table>
    </div> 
</div>
     
        
      </>
    );

  }
 