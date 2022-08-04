import React, { useState,useEffect }  from "react";
import axios from 'axios';
// components

import CardTable from "components/Cards/CardTable.js";

async function cargarAsignaciones() {
  const usuarioF= sessionStorage.getItem("usuario")
  const  verAsignacion  = await axios.post(`http://localhost:8082/asignacionesF?viIdUsuario=${usuarioF}`);

  return verAsignacion;
}

export default function Tables() {
  const [usuario, setUsuario]= useState(null);
  const [asignacion, setAsignacion] = useState([]);
  const [cargandoUsuario, setcargandoUsuario] = useState(true);


  useEffect(() => {
    async function cargarUsuario() {
     
      try {
        const verAsignacion = await cargarAsignaciones();
        setAsignacion(verAsignacion);
        setcargandoUsuario(false);
        console.log(verAsignacion)
      } catch (error) {
        console.log(error);
       
      }
    }

    cargarUsuario();
  }, []);

  function actualizarDatos(postOriginal, postActualizado) {
    setAsignacion(asignacion => {
      const postsActualizados = asignacion.map(post => {
        if (post !== postOriginal) {
          return post;
        }

        return postActualizado;
      });
      return postsActualizados;
    });
  }

  return (
    <>
      <div className="flex flex-wrap mt-4">
      {/*   <div className="w-full mb-12 px-4">
          <CardTable />
        </div> */}
        <div className="w-full mb-12 px-4">
          {asignacion.map(asignacion=>(
              <CardTable  
              asignacion={asignacion}
              actualizarDatos={actualizarDatos}
              usuario={usuario} 
              color="dark" />

          ))}
        
        </div>
      </div>
    </>
  );
}
