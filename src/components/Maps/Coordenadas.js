import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { axiosInstance } from "Helpers/auth-helpers";
import {Grid,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Button,Checkbox,FormControlLabel,TextField} from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import { identifierCoordAction } from "redux/reducers/coordinateQuerySlice";
import {dataCoordinate} from "redux/reducers/coordinateQuerySlice";
import Modal from "components/Modal";
import ModalEditarT from "./ModalEditarT";

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "rgb(12,74,110, 1)"
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    padding: "30px 40px",
    marginTop: "50px",
    marginLeft: "20px",
    marginRight: "20px",
  },

  heading: {
    paddingLeft: "10px",
  },

  label: {
    lineHeight: "2",
    fontSize: "14px",
  },
  input: {
    height: "10px",
  },
  table: {
    minWidth: 700,
  },
}));

const options = [
  { value: 1, label: 1 },
  { value: 2, label: 2 },
  { value: 3, label: 3 },
];

export default function CoordenatesQuery({ color, idEtapa }) {
  
  const dispatch = useDispatch();
  const _location = useLocation();
  const coordinatesQ = useSelector(dataCoordinate);
  const [valueInput, setValueInput] = useState(coordinatesQ);
  const [showModal, setShowModal] = useState(false);
  const user = useSelector((state) => state.auth.usuario)

  useEffect(()=>{
    const pathname = _location.pathname;
    const niSecEETA = pathname.split("/")[4]
  
    const base = {
      niSecEETA:niSecEETA,
      viUsuario:user
    }
    dispatch({type:identifierCoordAction.FETCH_QUERY_COORDINATE, payload:base})
   
    setValueInput(coordinatesQ)
  },[])


  const { control, handleSubmit } = useForm({
    defaultValues: {
      textField: "",
      checkbox: true,
      checkbox2:false
    }
  });

  const classes = useStyles();

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
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="col-sm-12">
            <div class="card">
              <div class="card-header">
                <small>
                  Para concesión de aguas, registro de uso y de vertimiento no
                  permite agregar ni borrar, solo actualizar
                </small>
              </div>
              <br />
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-4">
                    <div class="input-group">
                      <input
                        type="text"
                        name="nombre"
                        placeholder="Nombre Trámite"
                        className="form-control"
                      />
                      <br />
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

                <div class="row">
                  <div class="col-sm-12 mb-4">
                    <br />
                    <Grid item sm={12}>
                      <TableContainer component={Paper} >
                        <Table
                          className={classes.table}
                          aria-label="customized table">
                          <TableHead  >
                            <TableRow style={{ backgroundColor: "rgb(12,74,110, 1)"}}>
                              <TableCell >#</TableCell>
                              <TableCell align="left">Coordenada X</TableCell>
                              <TableCell align="left">Coordenada Y</TableCell>
                              <TableCell align="left">Cota</TableCell>
                              <TableCell align="left">Municipio</TableCell>
                              <TableCell align="left">Acciones</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {roomInputs.map((x, i) => (
                              <StyledTableRow key={i}>
                                <TableCell component="th" scope="row">
                                  {i + 1}
                                </TableCell>
                              { coordinatesQ.lista_coordenadas?.map((q, index)=>( 
                               < >
                                 <TableCell align="left">
                                  <input
                                  
                                    type="number"
                                    className="form-control  text-black"
                                    name="x"
                                    value={q.x}
                                    onChange={(option) =>
                                      handleRoomChange(option, i, "x")
                                    }
                                  />
                                </TableCell>
                                <TableCell align="left">
                                  <input
                                    type="number"
                                    name="y"
                                    className="form-control  text-black"
                                    value={q.y}
                                    onChange={(option) =>
                                      handleRoomChange(option, i, "y")
                                    }
                                  />
                                </TableCell>
                                <TableCell align="left">
                                  <input
                                    type="number"
                                    name="cota"
                                    className="form-control text-black"
                                    value={q.cota}
                                    onChange={(option) =>
                                      handleRoomChange(option, i, "cota")
                                    }
                                  />
                                </TableCell>
                                <TableCell align="left">
                                  <input
                                    type="text"
                                    name="municipio"
                                    className="form-control text-black"
                                    value={q.municipio}
                                    onChange={(option) =>
                                      handleRoomChange(option, i, "municipio")
                                    }
                                  />
                                </TableCell>
                               </>

                              ))}
                               

                                <TableCell align="left">
                                  {roomInputs?.length !== 1 && (
                                  <> 
                                    <DeleteIcon
                                      onClick={() => handleRemoveClickRoom(i)}
                                      style={{
                                        marginRight: "10px",
                                        marginTop: "4px",
                                        cursor: "pointer",
                                      }}
                                    />
                                   </> 
                                  )}
                                  {roomInputs?.length - 1 === i && (
                                    <>
                                      <button  onClick={handleClick}  className="  mr-2 ml-2 mt-1 bg-blue-500 hover:bg-blue-500 text-gray-800 text-sm font-medium rounded-full">
                                      Reportar
                                    </button>
                                    {showModal && (
                                          <Modal onClose={handleClose}>
                                            <ModalEditarT/>
                                          </Modal>
                                        )}
                                    <AddCircleOutlineIcon
                                      onClick={handleAddClickRoom}
                                      style={{
                                        marginTop: "4px",
                                        cursor: "pointer",
                                      }}/>
                                    </>
                                 
                                  )}
                                </TableCell>
                              </StyledTableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                    <br /><br />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   
  );
}
