import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Camera } from "../camera";
import { dataUserQuery } from "redux/reducers/userQuerySlice";
import iconslocation from "../../assets/img/iconslocation.png";
import CreateIcon from "@material-ui/icons/Create";
import {Button, Snackbar} from "@material-ui/core";


const INITIAL_FILTERS = {
  currentLocation: undefined,
};

function MapReportOb({ row,key }) {
  const obligaciones = useSelector(dataUserQuery);
  const data = useSelector(dataUserQuery);
  const videoRef = useRef(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cardImage, setCardImage] = useState();
  const [filterState, setFilterState] = useState(INITIAL_FILTERS);
  
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
  const [visibleOb, setVisibleOb] = useState(false);
  const [checkedOb, setCheckedOb] = useState(false);
  const [selectOblig, setSelectOblig] = useState("");
  const [add, setAdd] = useState(false)
  const [fields, setFields] = useState([""]);
  const fieldRef = useRef();
 
  const fieldsIsValid =
  fields.length >= 1 && fields.every((field) => field.trim() !== "");

  function toggle(value){
    setChecked(false)
  }
  function toggleOb(value){
    setCheckedOb(false)
  }
   useEffect(() => {

    if (visible) {
        console.log("Entro al effect");
    } 
  }, [visible]); 

  function setSelectedOption(e,index) {

    let selectedState = e.target.value;
    setSelectOblig(selectedState)
  
  }

  console.log(filterState);

  function handleChange(i, event) {
    const values = [...fields];
    values[i] = event.target.value;
    setFields(values);
  }
 
  function handleAdd() {
    const values = [...fields];
    values.push("");
    setFields(values);
  }

  function handleRemove(i) {
    const values = [...fields];
    values.splice(i, 1);
    setFields(values);
  }


  {/*  const newField  = {
      row:"",
      key:"",
      obligacion:"",
      observaciones:"",
      aspecto:"",
      observaciones_aspec:"",
      lat:"",
      lng:"",
      cota:"",
    
    };*/ }

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

   function handleSubmit(e) {
    e.preventDefault();
    setSelectOblig("");
   console.log("submit")
  }

  function updateLocation({ coords }) {
    setFilterState({
      currentLocation: {
        lat: coords.latitude,
        lng: coords.longitude,
        hing:coords.heading
      
      }
        });

  }
  const successCallback = ({options}) => {
     options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };
  };

  function requestLocation(e) {
    e.preventDefault();
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(updateLocation,successCallback);
     console.log(navigator.geolocation)
    }
  }
 
  return (
    <>
      <div className="flex overflow-x-auto relative mx-4">
        <div className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          
          <form
            className=" max-w-lg m-auto py-0 mt-0 px-10 "
            onSubmit={()=>handleSubmit()}>
              
              {fields.map((field, idx)=>{
                return(
                  < div  key={`${"input"}-${idx}`}>
                  <>
                       <div className=" uppercase text-lg text-gray-600 font-medium ml-4 mb-4 mx-4  ">
                           <label className="">
                             Tipo de reporte:
                           </label>
                         </div>
                         <div className="uppercase text-lg mx-4 mb-2">
                         <label class="form-check-label">OBLIGACIÓN</label>{" "}
                             <input class="form-check-input" type="radio" 
                              checked={checkedOb}
                              onChange={() => setCheckedOb(true)}
                               onClick={() => setVisibleOb(true)} />
                           </div>
                           {visibleOb && checkedOb && 
                            <>
                            <button className='btn' 
                                 onClick={toggleOb}>🅧</button>
                            <section className="flex w-full">
                                <select 
                                onChange={setSelectedOption}
                                className="ml-2 mr-4 mt-4 text-black">
                                    <option value="">Elije una obligación</option>
                                    {obligaciones.lista_obligacionesIt?.map((row, index)=>(
                                        <option 
                                        
                                        key={index}
                                        value={row.obligacion}>{row.doc_radicado}</option>
                                    ))}
                                    
                                  </select>
                                </section>
                          <div className="mt-2">
                            <label className="uppercase text-gray-600 font-medium ml-4 mb-2 mx-4">
                              Transcripción de la Obligación :
                            </label>{" "}
                           </div>
                           <input 
                           className="w-full max-w-sm border-solid border-gray-300 border mt-4 py-4 text-black"
                           type="text"
                           placeholder="transcripción"
                           value={selectOblig}
                           onChange={(e) => setSelectOblig(e.target.value)}
                           />
                          
                             <div className="flex mt-4">
                              <label className="uppercase text-gray-600 font-medium ml-4 mb-2 mx-4">
                                  Descripción de la Situación:
                              </label>{" "}
                             </div>
                              <input
                              className="w-full max-w-sm border-solid border-gray-300 border mt-4 py-4 text-black"
                              name="observaciones"
                              value={field || ""}
                              ref={fieldRef}
                              onChange={(e) => handleChange(idx, e)}
                              />
                          </>
                           }
                        
                       
                         <div className="uppercase text-lg mx-4 mb-2">
                         <label class="form-check-label">Aspecto</label>
                             &nbsp; &nbsp; 
                             <input class="form-check-input" type="radio" 
                              checked={checked}
                              onChange={() => setChecked(true)}
                               onClick={() => setVisible(true)}
                              />
                         </div>
                         <br />
                         <hr />
                    
                           
                              {visible  && checked && 
                             <>
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
                                         Detalle del Aspecto:
                                     </label>{" "}
                                 </div>
                                     <input
                                         className="w-full max-w-sm border-solid border-gray-300 border mt-4 py-4 text-black"
                                         name="observaciones_as"
                                         value={field || ""}
                                          ref={fieldRef}
                                          onChange={(e) => handleChange(idx, e)}
                                         />
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
                  
                  <div className="">
                        <div className=" mb-2 border py-2">
                          <label className="text-gray-600 font-medium ml-4 mb-2 mx-4 py-2">
                            Sistema de referencia WGS84 :
                          </label>{" "}

                          {Object.values(filterState)?.map((key)=> (
                     
                            <div className="flex justify-center">
                              <div className=" flex items-stretch" >
                                 <br />
                            <div className="py-2 px-4" >
                            <label htmlFor="">Coordenada en X</label>
                            <br />
                              <div className=" border py-2" contenteditable="true">
                                {key?.lat}
                              </div>
                            </div>
                            <br />
                            <div className="py-2 px-4" >
                            <label htmlFor="">Coordenada en Y</label>
                               <div className=" border py-2"   contenteditable="true">
                                {key?.lng}
                                </div>
                            </div>
                            <br />
                              <div className="py-2 px-2"  >
                              <label htmlFor="">Cota</label>
                                <div className="border py-2"  contenteditable="true">
                                  {key?.hing}
                                </div>
                              </div>
                           </div> 
                            </div>
                          ))}
                            <div className=" relative justify-items-center">
                              <button  className="Upload_localiza" onClick={requestLocation}>
                                <img style={{width:"2rem",position:"absolute", bottom:"1.6rem"}} src={iconslocation}/>Permitir Geolocalización 
                              </button>
                          </div>
                        </div>
                        <br />
                      <button onClick={handleSubmit} className="Upload__submit">Reportar</button>
                      <button className="Upload__submit"  type="button" onClick={() => handleRemove(idx)}>X</button>
                    </div>
                 </div>
                )
              })}
               
               <button className="Upload__submit" type="button" onClick={() => handleAdd()}>
                Agregar
              </button>
          </form> 
        </div>
      </div>
    </>
  );
}

export default MapReportOb;
