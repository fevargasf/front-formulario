import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Camera } from "../camera";
import { dataUserQuery } from "redux/reducers/userQuerySlice";
import ThreeSixtyIcon from '@material-ui/icons/ThreeSixty';

function MapReportOb({ ibIts }) {
  const [query, setQuery] = useState("");
  const data = useSelector(dataUserQuery);
  const videoRef = useRef(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cardImage, setCardImage] = useState();
  const [addFormDataMovil, setAddFormDataMovil] = useState([
    {
      tipo: "Aspecto",
      titulo: "",
      descripcion: "",
      sistema: "Origen Único",
      coorX: "",
      coorY: "",
    },
  ]);

  const [visible, setVisible] = useState(false);
  const [checked, setChecked] = useState(false);
   useEffect(() => {
    
    let temporizador;

    if (visible) {
        console.log("Entro al effect");
    } 
  }, [visible]); 

  const handleFormChange = (index, event) => {
    event.preventDefault();
    let data = [...addFormDataMovil];
    data[index][event.target.name] = event.target.value;
    setAddFormDataMovil(data);
  };

  const addFields = (event) => {
    event.preventDefault();
    let newfield = {
      tipo: "Aspecto",
      titulo: "",
      descripcion: "",
      sistema: "Origen Único",
      coorX: "",
      coorY: "",
    };

    setAddFormDataMovil([...addFormDataMovil, newfield]);
  };
  const removeFields = (index) => {
    let data = [...addFormDataMovil];
    data.splice(index, 1);
    setAddFormDataMovil(data);
  };

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error("error:", err);
      });
  };

  async function handleSubmit(e) {
    e.preventDefault();
  }
  function toggle(value){
    setChecked(false)
  }

  return (
    <>
      <div className="overflow-x-auto relative mx-4">
        <div className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <form
            className=" max-w-lg m-auto py-0 mt-0 px-10 "
            onSubmit={handleSubmit}>
                <>
                 <>
                
                      <div className=" uppercase text-lg text-gray-600 font-medium ml-4 mb-4 mx-4  ">
                          <label className="">
                            Tipo de reporte:
                          </label>
                        
                         <h3 className="flex justify-items-center">{ibIts.doc_radicado}</h3>
                        </div>
                        <div className="uppercase text-lg mx-4 mb-2">
                        <label class="form-check-label">Aspecto</label>
                            &nbsp; &nbsp; 
                            <input class="form-check-input" type="radio" 
                             checked={checked}
                             onChange={() => setChecked(true)}
                              onClick={() => setVisible(true)}
                             />
                        </div>
                        <hr />
                        <div className="mt-2">
                          <label className="uppercase text-gray-600 font-medium ml-4 mb-2 mx-4">
                            Título :
                          </label>{" "}
                        
                         </div>
                            <input
                                type="text"
                                className="w-full max-w-sm border-solid border-gray-300 border py-2 mt-4 text-black"
                                name="obligacion"
                                placeholder={ibIts.obligacion}
                            />
                           <div className="flex mt-4">
                            <label className="uppercase text-gray-600 font-medium ml-4 mb-2 mx-4">
                                Descripción:
                            </label>{" "}
                           </div>
                            <input
                                className="w-full max-w-sm border-solid border-gray-300 border mt-4 py-4 text-black"
                                name="observaciones"
                                placeholder={ibIts.observaciones}
                            />
                            {/* */}
                            {visible  && checked && <>
                               
                                <div className="mt-2">
                                <button className='btn' 
                                onClick={toggle}>🅧</button>
                                <label className="uppercase text-gray-600 font-medium ml-4 mb-2 mx-4">
                                    Título Aspecto :
                                </label>{" "}
                                
                                </div>
                                    <input
                                        type="text"
                                        className="w-full max-w-sm border-solid border-gray-300 border py-2 mt-4 text-black"
                                        name="obligacion"
                                        
                                    />
                                <div className="flex mt-4">
                                    <label className="uppercase text-gray-600 font-medium ml-4 mb-2 mx-4">
                                        Descripción:
                                    </label>{" "}
                                </div>
                                    <input
                                        className="w-full max-w-sm border-solid border-gray-300 border mt-4 py-4 text-black"
                                        name="observaciones" />
                            </>}
                      
                     
                    </>
                  <div className="flex border py-2 ml-4 mt-4">
                    <div className="absolute  h-56 grid grid-cols-2 gap-4 mx-4 content-center ">
                      <button
                        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 mr-2 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                        onClick={(e) => {
                          e.preventDefault();
                          setIsCameraOpen(true);
                        }}
                      >
                        Iniciar camara
                      </button>
                      <button
                        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                        onClick={(e) => {
                          e.preventDefault();
                          setIsCameraOpen(false);
                          setCardImage(undefined);
                        }}
                      >
                        {" "}
                        Cerrar camara
                      </button>
                    </div>
                    <div className="flex text-gray-600 font-medium ml-4 mb-2 mx-4 mt-10 w-full">
                      <label>Registro Fotográfico:</label>
                    </div>
                    {isCameraOpen && (
                      <Camera
                        onCapture={(blob) => setCardImage(blob)}
                        onClear={() => setCardImage(undefined)}
                      />
                    )}
                    <div className="flex  mt-8 mb-2">
                      <video />
                    </div>
                  </div>
                  <div className="overflow-x-auto relative">
                    <div className="flex w-full mb-2 border py-2">
                      <label className="text-gray-600 font-medium ml-4 mb-2 mx-4 py-2">
                        Coordenadas:
                      </label>{" "}
                      <div className="">
                        <input
                          className=" ml-2 mr-4 mt-4 border-solid border-gray-300 border py-2 px-2 rounded text-black w-1/4"
                          name="coorX"
                          placeholder="Coordenada en X"
                   
                          
                        />
                        <input
                          className=" ml-2 mr-4 mt-4 border-solid border-gray-300 border py-2 px-2 rounded text-black w-1/4"
                          name="coorY"
                          placeholder="Coordenada en Y"
                        
                          
                        />
                      </div>
                      <button>
                        <ThreeSixtyIcon fontSize="large"/>
                      </button>
                    </div>
                  </div>
                  <button className="Upload__submit" type="submit">
                    Enviar
                  </button>
                </>
          </form> 
        </div>
      </div>
    </>
  );
}

export default MapReportOb;
