import { axiosInstance } from 'config/axiosConfig';
import React, { useState } from 'react';
//import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from "react-redux";
import { identifierQueryAction } from 'redux/reducers/querySignSlice';
import { dataQuerySign } from 'redux/reducers/querySignSlice';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

export default function Upload({ history, mostrarError,idEtapa,color }) {
    const [imagenUrl, setImagenUrl] = useState('');
    const [subiendoImagen, setSubiendoImagen] = useState(false);
    const [enviandoPost, setEnviandoPost] = useState(false);
    const [horas, setHoras] = useState('');
    const [minutos, setMinutos] = useState('');
    const user = useSelector(dataQuerySign)
    const dispatch = useDispatch()
    



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
            " relative flex flex-col min-w-0 break-words w-full py-4 px-3 mx-3 mb-4 mt-20 shadow-lg rounded " }>
          <div className="rounded-t mb-0 px-6 py-0 border-0">
          </div>
          <div className="block w-full overflow-x-auto">
            {/* Projects table */}

          { user.lista_firmas?.map((item, index) => (     
               <ul key={item.sec}>
                  <li className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                  {item.nombre}
                  </li>
                  <li className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                   {item.cargo}
                  </li>
                  <li className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                 <img style={{width:150}} src={`data:image/png;base64,${item.firma}`}  alt="" />
                 <button  className="inline-flex items-center px-4 py-2 mb-4 mt-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Quitar firma
                  </button>
                 </li>
                 <li className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  Cantidad Horas: {item.cantidad_horas}
                 </li>
                 <li className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                 Cantidad Minutos: {item.cantidad_mins}
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
        <div className="Upload_firma">
          <form onSubmit={handleSubmit}>
            <div className='flex justify-center'>
            <div className="Upload__image-section_firma">
              <SeccionSubirImagen
                imagenUrl={imagenUrl}
                subiendoImagen={subiendoImagen}
                handleImagenSeleccionada={handleImagenSeleccionada}
              />
                 
            </div>
            </div>
            <br />
            <h1>Duración Informe :</h1>
            <input
              name="Horas"
              className="Upload__caption_firma"
              required
              maxLength="180"
              placeholder="Horas."
              value={horas}
              onChange={e => setHoras(e.target.value)}
            /><input
              name="Minutos"
              className="Upload__caption_firma"
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
        
        <label className="Upload__image-label_firma">
         
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
  