import React, { useEffect, useRef, useState } from "react";
import {  useSelector } from "react-redux";
import { Camera } from "../camera";
import { dataAutogestion } from "redux/reducers/autogestionSlice";
import ThreeSixtyIcon from '@material-ui/icons/ThreeSixty';

function MapExample({ row }) {
  const [query, setQuery] = useState("");
  const data = useSelector(dataAutogestion);
  const videoRef = useRef(null);
  const file = useRef(null)
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cardImage, setCardImage] = useState();
  const [imagenUrl, setImagenUrl] = useState([]);
  const [fileArray, setFileArray]= useState([]);
  const [fileObj, setFileObj] = useState([]);
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

 function uploadMultipleFiles(e) {
   fileObj.push(e.target.files)
   console.log(e.target.files,"url")
    for (let i = 0; i < fileObj[0].length; i++) {
        fileArray.push(URL.createObjectURL(fileObj[0][i]))
    }
    setFileArray({ file: fileArray })
}

    function uploadFiles(e) {
        e.preventDefault()
        console.log(file)
    }
 
  return (
    <>
      <div className="overflow-x-auto relative mx-4">
        <div className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <h1>5. SITUACIÓN ENCONTRADA :</h1>
          <form
            className=" max-w-lg m-auto py-0 mt-0 px-10 "
            onSubmit={handleSubmit}
          >
            {addFormDataMovil.map((input, index) => {
              return (
                <>
                  {data
                    .filter((obli) => {
                      const obligs = obli.radicado_resolucion;
                      if (query === "") {
                        console.log(query);
                        return obligs;
                      } else if (obligs.includes(query)) {
                        //returns filtered array
                        return obligs;
                      }
                    })
                    .map((obligs, index) => (
                      <>
                      <div key={index}>
                      <div className=" border  ">
                          <label className="text-gray-600 font-medium ml-4 mb-2 mx-4">
                            Tipo de reporte:
                          </label>
                         <h3>{obligs.radicado_resolucion}</h3>
                        </div>
                        <div className="flex border py-2 ">
                          <label className="text-gray-600 font-medium ml-4 mb-2 mx-4">
                            Título Obligación / Aspecto:
                          </label>
                          <input
                            type="text"
                            className="w-full max-w-sm border-solid border-gray-300 border  text-black"
                            name="obliga_obs"
                            placeholder={obligs.obliga_obs}
                          />
                        </div>
                        <div className="flex  border py-2">
                          <label className="text-gray-600 font-medium ml-4 mb-2 mx-4 py-2">
                            Descripción:
                          </label>
                          <input
                            className="w-full max-w-sm border-solid border-gray-300 border rounded text-black"
                            name="descripcion"
                            placeholder={obligs.obliga_descripcion}
                          />
                        </div>
                      </div>
                     
                      </>
                    ))}
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

                  {/*   <div className=" border py-2">
                  <label className="text-gray-600 font-medium ml-4 mb-2 mx-4 py-2">
                    Sistema de Referencia:
                  </label>
                  <select onChange={event => handleFormChange(index, event)}  className=" border-solid border-gray-300 border rounded text-black" name="" id="">
                    <option value={input.sistema}>Origen único</option>
                    <option value={input.sistema}>WGS84</option>
                  </select>
                </div> */}
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
                          onChange={(event) => handleFormChange(index, event)}
                          value={input.coorX}
                        />
                        <input
                          className=" ml-2 mr-4 mt-4 border-solid border-gray-300 border py-2 px-2 rounded text-black w-1/4"
                          name="coorY"
                          placeholder="Coordenada en Y"
                          onChange={(event) => handleFormChange(index, event)}
                          value={input.coorY}
                        />
                      </div>
                      <button>
                        <ThreeSixtyIcon fontSize="large"/>
                      </button>
                    </div>
                  </div>
                  <div class="my-2">
                    
                      <input type="file" class="form-control" id="images" name="images[]" onChange={()=> uploadFiles } multiple/>
                      <textarea name="" id="" cols="30" rows="10"></textarea>
                  </div>
                    <div>
                      <input onclick="return resetForm();" type="reset" class="btn btn-danger" name='reset_images' value="Reset"/>
                    </div>
                    <hr />
                     <div class="row" id="image_preview">
                     
                     </div>
                   
                  <button className="Upload__submit" type="submit">
                    Enviar
                  </button>
                  {/*  <div className="flex justify-start">
            <button onClick={(event) => {
              event.preventDefault();
              removeFields(index)}} className="inline-flex items-center px-4 py-3   bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Quitar
            </button>
            <button onClick={addFields} className=" px-4 py-2 mr-2 mt-1 bg-blue-500 hover:bg-blue-500 text-gray-800 text-sm font-medium rounded-lg">
              <AddCircleRoundedIcon/>
              Agregar
            </button>
            </div> */}
                </>
              );
            })}
          </form>
        </div>
      </div>
    </>
  );
}

export default MapExample;
