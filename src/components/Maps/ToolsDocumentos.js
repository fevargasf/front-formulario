
import { axiosInstance } from "Helpers/auth-helpers";
import React, { useState,useEffect }  from "react";
import Loading from '../Loading';

export default function ToolsDocumento(){

    const [imagenUrl, setImagenUrl] = useState('');
    const [subiendoImagen, setSubiendoImagen] = useState(false);
    const [enviandoPost, setEnviandoPost] = useState(false);
    const [caption, setCaption] = useState('');
  
    async function handleImagenSeleccionada(evento) {
      try {
        setSubiendoImagen(true);
        const file = evento.target.files[0];
  
        const config = {
          headers: {
            'Content-Type': file.type
          }
        };
  
        const { data } = await axiosInstance.post('/api/posts/upload', file, config);
        setImagenUrl(data.url);
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
        alert('No se ha terminado de subir la imagen');
        return;
      }
  
      if (!imagenUrl) {
        alert('Primero selecciona una imagen');
        return;
      }
  
      try {
        setEnviandoPost(true);
        const body = {
          caption,
          url: imagenUrl
        };
        await axiosInstance.post('/api/posts', body);
        setEnviandoPost(false);
     
      } catch (error) {
        console.log(error.response.data);
      }
    }
  
    return (
    <div className="Main">
        <div className="Upload">
          <form  className=" w-full"  onSubmit={handleSubmit}>
            <div className="Upload__image-section">
              <SeccionSubirImagen
                imagenUrl={imagenUrl}
                subiendoImagen={subiendoImagen}
                handleImagenSeleccionada={handleImagenSeleccionada}
              />
            </div>
            <textarea
              name="caption"
              className="Upload__caption"
              required
              maxLength="180"
              placeholder="Digite el análisis de la documentación aportada ..."
              value={caption}
              onChange={e => setCaption(e.target.value)}
            />
            <button className="Registrar__submit" type="submit">
              Registrar
            </button>
          </form>
        </div>
         </div>
       
      
    );

}

function SeccionSubirImagen({
    subiendoImagen,
    imagenUrl,
    handleImagenSeleccionada
  }) {
    if (subiendoImagen) {
      return <Loading />;
    } else if (imagenUrl) {
      return <img src={imagenUrl} alt="" />;
    } else {
      return (
        <label className="Upload__image-label">
         
          <span>Buscar imagen</span>
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