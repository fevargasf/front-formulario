import { axiosInstance } from 'config/axiosConfig';
import React, { useState } from 'react';
//import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from "react-redux";
import { identifierQueryAction } from 'redux/reducers/querySignSlice';
import { dataQuerySign } from 'redux/reducers/querySignSlice';

export default function Upload({ history, mostrarError,idEtapa,color }) {
    const [imagenUrl, setImagenUrl] = useState('');
    const [subiendoImagen, setSubiendoImagen] = useState(false);
    const [enviandoPost, setEnviandoPost] = useState(false);
    const [horas, setHoras] = useState('');
    const [minutos, setMinutos] = useState('');
    const user = useSelector(dataQuerySign)
    const dispatch = useDispatch()
    
  console.log(user.data)


    useState(()=>{

     dispatch({
        type:identifierQueryAction.FETCH_QUERY_SIGN, payload:idEtapa
      }) 

    },[])

    async function handleImagenSeleccionada(e) {
      try {
        setSubiendoImagen(true);
        const file = e.target.files[0];
  
        const config = {
          headers: {
            'Content-Type': file.type
          }
        };
  
      //  const { data } = await axiosInstance.post('/api/posts/upload', file, config);
        setImagenUrl(URL.createObjectURL(e.target.files[0]));
        console.log(e.target.files[0])
        setSubiendoImagen(false);
      } catch (error) {
        setSubiendoImagen(false);
    
        console.log(error);
      }
    }
  
    async function handleSubmit(evento) {
      evento.preventDefault();
  
      if (enviandoPost) {
        return;
      }
  
      if (subiendoImagen) {
        mostrarError('No se ha terminado de subir la imagen');
        return;
      }
  
      if (!imagenUrl) {
        mostrarError('Primero selecciona una imagen');
        return;
      }
  
      try {
        setEnviandoPost(true);
        const body = {
          horas,
          minutos,
          url: imagenUrl
        };
        await axiosInstance.post('/api/posts', body);
        setEnviandoPost(false);
        history.push('/');
      } catch (error) {
        mostrarError(error.response.data);
      }
    }
 
 
    
    
   
  
    return (
        <>
        <br />
        <hr />

        <div className="flex justify-left">
      
            <br /><br /><br />
            <div 
          className={
            " relative flex flex-col min-w-0 break-words w-full py-4 px-3 mx-3 mb-4 mt-20 shadow-lg rounded " +
            (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
          }>
          <div className="rounded-t mb-0 px-6 py-0 border-0">
          </div>
          <div className="block w-full overflow-x-auto">
            {/* Projects table */}
      
             
     
                
          { user.lista_firmas.map((item, index) => (
                     
               <ul key={item.sec}>
                  <li className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                  {item.nombre}
                  </li>
                  <li className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                   {item.cargo}
                  </li>
                  <li className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                 <img style={{width:150}} src={`data:image/png;base64,${item.firma}`}  alt="" />
                 </li>
                </ul>
             
             ))} 
           
        
          </div>
        </div>
          
         {/*         <ul>
                
                    <p>NOMBRES Y APELLIDOS  </p> 
               <li class="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg">{user.nombre}</li>
               <p>Perfil profesional</p>
               <li class="px-6 py-2 border-b border-gray-200 w-full">d</li>
               <p>Duración visita:</p>
               <li class="px-6 py-2 border-b border-gray-200 w-full">A third item</li>
               <p>Transporte:</p>
               <li class="px-6 py-2 border-b border-gray-200 w-full">A fourth item</li>
               <p>Asignación:</p>
               <li class="px-6 py-2 w-full rounded-b-lg">And a fifth one</li>
               <p>Expediente:</p>
               <li class="px-6 py-2 w-full rounded-b-lg">And a fifth one</li>
               <p>Elaboró:</p>
                 </ul>
           */}
          

 
            
            <hr />
        </div>
        <div className="Upload">
          <form onSubmit={handleSubmit}>
            <div className="Upload__image-section">
              <SeccionSubirImagen
                imagenUrl={imagenUrl}
                subiendoImagen={subiendoImagen}
                handleImagenSeleccionada={handleImagenSeleccionada}
              />
            </div>
            <br />
            <h1>Duración Informe :</h1>
            <input
              name="Horas"
              className="Upload__caption"
              required
              maxLength="180"
              placeholder="Horas."
              value={horas}
              onChange={e => setHoras(e.target.value)}
            /><input
              name="Minutos"
              className="Upload__caption"
              required
              maxLength="180"
              placeholder="Minutos."
              value={minutos}
              onChange={e => setMinutos(e.target.value)}
            />
            <button className="Upload__submit" type="submit">
              Firmar
            </button>
          </form>
        </div>
        </>
       
     
    );
  }
  
  function SeccionSubirImagen({
    subiendoImagen,
    imagenUrl,
    handleImagenSeleccionada
  }) {
    if (subiendoImagen) {
      return (
        <>
        <h1>Cargando</h1>
        </>
        );
    } else if (imagenUrl) {
      return <img src={imagenUrl} alt="" />;
    } else {
      return (
        
        <label className="Upload__image-label">
         
          <span> <p style={{margin:"0px 10px 0px 55px",fontsize:"25px"}}>&#x1f4e4;</p>Cargar firma</span>
          <input
            type="file"
            className="hidden"
            name="imagen"
            onChange={handleImagenSeleccionada}
          />
        </label>
      );
    }
  }
  