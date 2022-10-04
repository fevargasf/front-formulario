import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { axiosInstance } from "Helpers/auth-helpers";
import {Grid,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Button,Checkbox,FormControlLabel,TextField} from "@material-ui/core";
import {dataCoordinate} from "redux/reducers/coordinateQuerySlice";

import MapReporte from "./MapReporte";

const styles = theme => ({
  multilineColor:{
      color:'red',
      backgroundColor:'white',
      
  }
});

const options = [
  { value: 1, label: 1 },
  { value: 2, label: 2 },
  { value: 3, label: 3 },
];

export default function ModalEditarT({ color, idEtapa }) {
  
  const dispatch = useDispatch()
  const coordinatesQ = useSelector(dataCoordinate);
  const [valueInput, setValueInput] = useState(coordinatesQ);
  const [showModal, setShowModal] = useState(false);
 

  const { control, handleSubmit } = useForm({
    defaultValues: {
      textField: "",
      checkbox: true,
      checkbox2:false
    }
  });
  const baseUrlAd =
    "https://www.inventarios.gemcont.com/apiGemcont/compras/ingresos/";
  const [data, setData] = useState([]);
  const [frameworkSeleccionado, setFrameworkSeleccionado] = useState({
    id_ingreso: "",
    nombre: "",
    dato1: "",
    dato2: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFrameworkSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(frameworkSeleccionado);
  };

  const peticionPost = async () => {
    var f = new FormData();
    f.append("nombre", frameworkSeleccionado.nombre);
    f.append("dato1", frameworkSeleccionado.dato1);
    f.append("dato2", frameworkSeleccionado.dato2);
    f.append("METHOD", "POST_prueba");
    await axiosInstance
      .post(baseUrlAd, f)
      .then((response) => {
        setData(data.concat(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };



 /*  const [roomInputs, setRoomInputs] = useState([{ dato1: "", dato2: "" }]); */
 
 const [roomInputs, setRoomInputs] = useState([
  { 
  dato1: "",
  dato2: "",
  capta_sec: "",
  cota:"",
  creado_por:"" ,
  descripcion: "",
  fecha_creacion:"",
  linea:"",
  municipio: "",
  nivel_subsiguiente: "",
  nombre_sistema_coordenadas:"",
  observaciones:"", 
  sistema_coordenadas:"",
  vert_sec:"",
  x:"",
  y:"" 
}]);
  const handleRoomChange = (option, index, name) => {
    const value = option.value;
    console.log(value);
    const list = [...roomInputs];
    list[index][name] = value;
    setRoomInputs(list);
  };

  const handleRemoveClickRoom = (index) => {
    const list = [...roomInputs];
    list.splice(index, 1);
    setRoomInputs(list);
  };

  const handleAddClickRoom = () => {
    setRoomInputs([...roomInputs, { dato1: "", dato2: "",  capta_sec: "",cota:"",creado_por:"" ,descripcion: "",fecha_creacion:"",linea:"",municipio: "",nivel_subsiguiente: "",
    nombre_sistema_coordenadas:"",observaciones:"", sistema_coordenadas:"", vert_sec:"", x:"",y:""  }]);
  };
  /*  eventos modal*/
  const handleClose = (e) => {
    e.preventDefault();
    setShowModal(false);
  };
  const handleClick = (e) => {
    e.preventDefault();
     setShowModal(true);
    
  };
  return (
              <div className="overflow-x-auto  mb-4">
                <div>
                  <div >
                    <div  className="mx-8" >
                      <br />
                       <Controller
                          control={control}
                          name="checkbox"
                          render={({ field: { value, onChange } }) => (
                            // Checkbox accepts its value as `checked`
                            // so we need to connect the props here
                            <FormControlLabel
                              control={<Checkbox checked={value} onChange={onChange} />}
                              label="Magna origen Bogotá"
                            />
                          )}
                        />
                        <Controller
                          control={control}
                          name="checkbox2"
                          render={({ field: { value, onChange } }) => (
                            // Checkbox accepts its value as `checked`
                            // so we need to connect the props here
                            <FormControlLabel
                              control={<Checkbox checked={value} onChange={onChange} />}
                              label="Origen único"
                            />
                          )}
                        />
                             <Controller
                          control={control}
                          name="checkbox3"
                          render={({ field: { value, onChange } }) => (
                            // Checkbox accepts its value as `checked`
                            // so we need to connect the props here
                            <FormControlLabel
                              control={<Checkbox checked={value} onChange={onChange} />}
                              label="WGS84"
                            />
                          )}
                        />
                    </div>
                  </div>
                </div>

                <div >
                  <div >
                    <br />
                      <div >
                        <table className="flex justify-center w-full text-sm  text-gray-500 dark:text-gray-400">
                          <div className="mb-4">
                          <tr>
                              <th className=" text-sm font-medium text-white px-6 py-4" >Coordenada X</th >
                              <th className ="text-sm font-medium text-white px-6 py-4" >Coordenada Y</th >
                          </tr>
                          <MapReporte/>
                          <tbody>
                        
                            {roomInputs.map((x, i) => (
                              <>
                            <tr key={i}>
                                <td >
                                 <input
                                   type="number"
                                   className="form-control  text-black"
                                   name="x"
                                   onChange={(option) =>
                                     handleRoomChange(option, i, "x")}/>
                               </td>
                               <td >
                                 <input
                                   type="number"
                                   name="y"
                                   className="form-control  text-black"
                                   onChange={(option) =>
                                     handleRoomChange(option, i, "y")}/>
                               </td>
                              </tr>
                              
                              </>
                            ))}
                            
                          </tbody>
                          </div>
                        </table>
                        <div className="flex justify-items-center mt-4">
                          <labe>Observaciones:{" "}</labe>
                        <textarea type="text"  className="form-control  text-black" name="" id="" cols="30" rows="10"/>
                        <labe>Descripción:{" "}</labe>
                        <textarea type="text"  className="form-control  text-black" name="" id="" cols="30" rows="10"/>
                        </div>
                        
                     </div>
                   </div>
      
                <br />
                <button
                  className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 mr-2 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                  onClick={() => peticionPost()}
                >
                  {" "}
                  Registrar
                </button>
              </div>
            </div>
        );
      }
