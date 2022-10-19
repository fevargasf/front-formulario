import { axiosInstance } from "config/axiosConfig";
import React, { useState, useEffect, Fragment,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { useLocation } from "react-router";
import { useForm} from "react-hook-form";


import { identifierQueryAction } from "redux/reducers/querySignSlice";
import { dataAutogestion } from "redux/reducers/autogestionSlice";
import { identifierAutogestionAction } from "redux/reducers/autogestionSlice";


import { dataUserQuery } from "redux/reducers/userQuerySlice";
import { identifierActionsUser } from "redux/reducers/userQuerySlice";

import { actsData } from "redux/reducers/actsExpSlice";
import { dataInformation } from "redux/reducers/informationSlice";
import { identifierActionsActs } from "redux/reducers/actsExpSlice";

import Modal from "components/Modal";

//import ReadOnlyRow from "components/Maps/ReadOnlyRow";
//import EditableRow from "components/Maps/EditableRow";

import CreateIcon from "@material-ui/icons/Create";
import {Button, Snackbar} from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AddBoxIcon from "@material-ui/icons/AddBox";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";


import { dataUserEx } from "redux/reducers/queryUserExpeSlice";
import { identifierActionsQuser } from "redux/reducers/queryUserExpeSlice";
import MapReportOb from "./MapReportOb";

// Creating styles
const useStyles = makeStyles({
  root: {
      "& > *": {
          borderBottom: "unset",
      },
  },
  table: {
      minWidth: 650,
  },
  snackbar: {
      bottom: "10rem",
      display: "block",
        height: "15rem",
        width: "30rem"
  },
});


const Obliga = ({ idEtapa, row}) => {
  
  const history = useHistory();
  const _location = useLocation();
  const obligaRef = useRef(null);
  const data = useSelector(dataAutogestion);
  const obligaciones = useSelector(dataUserQuery);
  const dataUser = useSelector(dataUserEx);
  const dataInfo = useSelector(dataInformation);
  const user = useSelector((state) => state.auth.usuario)
  const expediente = useSelector(dataInformation);
  const actos = useSelector(actsData);
  const dispatch = useDispatch();
  const pathname = _location.pathname;
  const goPage = () => {setEdit(false)}
  /**states */
  const [editContactId, setEditContactId] = useState(null);


  {/* todas la obligaciones*/}

  useEffect(() => {
    dispatch({
      type: identifierActionsActs.FETCH_ACTS,
      payload: expediente.exp_sec,
    });
  }, []);
 
  useEffect(() => {
    const dataIt= {
      niSecEETA: idEtapa,
      niSecTer:"" /* cambiar back*/ }
    dispatch({type: identifierActionsUser.FETCH_USER_IT,payload:dataIt});
  },[obligaRef])
  useEffect(() => {
    dispatch({
      type: identifierQueryAction.FETCH_QUERY_SIGN,
      payload: idEtapa,
    });
    const updateDataAutogestion = () => {
      const dataObli = {
        niSecEETA: idEtapa,
        niSecTer: "",
      };
  
      dispatch({
        type: identifierAutogestionAction.FETCH_QUERY_AUTOGESTION,
        payload: idEtapa,
      });
    };

    updateDataAutogestion();
  }, []);
  useEffect(() => {
    const secuenciaEx = dataInfo.exp_sec;
    dispatch({
      type: identifierActionsQuser.FETCH_USER_EXPEDIENTE,
      payload:secuenciaEx,
    });
  }, []);

  const defaultValues = {
    usuario: "",
    comoTermina: "",
    niSecEEta: "",
    nioLinea: "",
    niSecDoc: "",
    niSecTer: "",
    viObligacion: "",
    viPeriodica: "",
    niPlazo: "",
    viCumple: "",
    viObs: "",
    viMotivoParcial: "",
  };

  const {
    handleSubmit,
    register,
    control,
    watch,
    formState: { errors },
  } = useForm({ defaultValues });


  const califica = ["T", "P", "N"];
  const periodica = ["S","N"]
 
   // Creating style object
   const classes = useStyles();

   // Initial states
   const [open, setOpen] = useState(false);
   const [isEdit, setEdit] = useState(false);
   const [disable, setDisable] = useState(true);
   const [showConfirm, setShowConfirm] = useState(false);
   const [showModal, setShowModal] = useState(false);


   // Function For closing the alert snackbar
   const handleClose = (event, reason) => {
       if (reason === "clickaway") {
           return;
       }
       setOpen(false);
       const dataIt= {
        niSecEETA: idEtapa,
        niSecTer:"" /* cambiar back*/ }
      dispatch({type: identifierActionsUser.FETCH_USER_IT,payload:dataIt});
      
   };

   const action = (
    <Fragment>
      <Button  
        color="secondary" size="small" onClick={handleClose}>
         <ClearIcon />
      </Button>
      
    </Fragment>
  );
     
   // Defining a state named rows
   // which we can update by calling on setRows function
   const [rows, setRows] = useState([
    { 
   /*  niSecEEta: "",
    
    niSecDoc: "",
    niSecTer: "", 
     linea: editContactId ,
    obligacion: "",
    observaciones: "",
    plazo_meses: "",
    periodica:"",
    cumplio: "",
    motivo_parcial: "",
 
    */
    niSecEEta:"",
    nioLinea:editContactId,
    niSecDoc:"",
    niSecTer:"",
    viObligacion: "",
    viObs: "",
    viPeriodica: "",
    niPlazo: "",
    viCumple:"",
    viMotivoParcial: "",
    viIdUsuario: "",
}
]);

   // Function For adding new row object
   const handleAdd = (e) => {
    e.preventDefault();
       setRows([
           ...rows,
           {
              niSecEEta:"",
              nioLinea:editContactId,
              niSecDoc:"",
              niSecTer:"",
             viObligacion: "",
             viObs: "",
             viPeriodica: "",
             niPlazo: "",
             viCumple:"",
             viMotivoParcial: "",
             viIdUsuario: "",
      
           }
       ]);
       setEdit(true);
   };
  
  // Function to handle edit
  const handleEdit = (i) => {
      // If edit mode is true setEdit will 
      // set it to false and vice versa
      setEdit(!isEdit);
  };

  // Function to handle save
  const handleSave = () => {
      setEdit(!isEdit);
      setRows(rows);
      console.log("saved : ", rows);
      
     var f = new FormData();
   rows.map((r)=>{ 
    f.append("niSecEEta", idEtapa);
    f.append( "nioLinea", r.nioLinea ? String(r.nioLinea) : "");
    f.append("niSecDoc", r.niSecDoc);
    f.append( "niSecTer",r.niSecTer ? String(r.niSecTer) : "");
    f.append("viObligacion", r.viObligacion);
    f.append("viCumple", r.viCumple);
    f.append("viObs", r.viObs);
    f.append("viMotivoParcial", r.viMotivoParcial);
    f.append("comoTermina", r.comoTermina ? String(r.comoTermina) : "");
    f.append("niPlazo", r.niPlazo ? String(r.niPlazo) : "");
    f.append( "viPeriodica", r.viPeriodica ? String(r.viPeriodica) : "");
    f.append("viIdUsuario",user)
   })
      fetch("http://localhost:8082/guardar_ObligacionIt", {
      method: "POST",
      body: f,
    })
      .then((response) => response.json() )
      .then((data) => {
       console.log(data);
      })
      .catch((error) => {
        console.error(error);
      }); 
      setDisable(true);
      setOpen(true);
  };


  const handleInputChange = (e, index) => {
      setDisable(false);
      const { name, value } = e.target;
      console.log(value)
      const list = [...rows];
      list[index][name] = value;
      setRows(list);
  };

  // Showing delete confirmation to users
  const handleConfirm = () => {
      setShowConfirm(true);
     //
  };

  // Handle the case of delete confirmation where 
  // user click yes delete a specific row of id:i
  const handleRemoveClick = (i) => {
      const list = [...rows];
      list.splice(i, 1);
      setRows(list);
      setShowConfirm(false);
  };

   

  // Handle the case of delete confirmation 
  // where user click no 
  const handleNo = () => {
      setShowConfirm(false);
  };
   const lista = data.map((i) => i.radicado_resolucion);

   const handleCloseM = (e) => {
     e.preventDefault();
     setShowModal(false);
   };
   const handleClick = (e) => {
     e.preventDefault();
     setShowModal(true);
   };

  return (
    <>
      <div className="overflow-x-auto relative">
        <div className="flex justify-center">

        <tbody  className="">
        <section>
          <label>Elegir Usuario :</label>
          <select className="ml-2 mr-4 mt-4 mb-4 text-black" name="" id="">
            <option value="">Elija un Usuario</option>
            {dataUser?.map((usuario,i) => (
              <option key={i} value="">{usuario.nombres}</option>
            ))}
          </select>
        </section>
        <br />
        <div>
          <Snackbar
             anchorOrigin={{
              vertical: "top",
              horizontal: "center"
            }}
            open={open}
            autoHideDuration={10000}
            onClose={handleClose}
            message="Obligación creada exitosamente!"
            action={action}
          />
        </div>
          <>
            {isEdit ? (
              <>
              <Button onClick={handleAdd}>
                  <AddBoxIcon onClick={handleAdd} />
                  Agregar más
                </Button>
                {rows.length !== 0 && (
                  <>
                    {disable ? (
                         <Button disabled align="right" onClick={handleSave}>
                         <DoneIcon />
                         Guardar
                       </Button>
                     ) : (
                       <Button align="right" onClick={handleSave}>
                         <DoneIcon />
                         Guardar
                       </Button>
                    )}
                  </>
                )}
              </>
            ) : (
              <>
               
          {/*       <Button onClick={handleAdd}>
                  <AddBoxIcon onClick={handleAdd} />
                  ADD
                </Button> */}
                <Button align="right"  onClick={handleEdit}>
                  
                 <p className="button" >
                 <CreateIcon />
                  Crear Obligación
                 </p> 
                </Button>
              
              </>
            )}
          </>
         <>
       <table className="">
         
           <tr >
              <th 
                className="border  text-sm font-medium text-gray-900 px-6 py-4"
              >
                Resolución
              </th>
              <th
               
                className="border  text-sm font-medium text-gray-900 px-6 py-4 w-1/4"
              >
                Obligaciones
              </th>
              <th
               
                className="border  text-sm font-medium text-gray-900 px-6 py-4 w-1/2"
              >
                Descripción
              </th>
              <th
              
                className="border  text-sm font-medium text-gray-900 px-6 py-4 "
              >
                Cumplió
              </th>
              <th
               
                className=" border text-sm font-medium text-gray-900 px-6 py-4"
              >
                Plazo
              </th>
              <th
                
                className=" border text-sm font-medium text-gray-900 px-6 py-4 "
              >
                Periodica
              </th>
              <th
                
                className=" border text-xs font-medium text-gray-900 px-6 py-4 "
              >
                ACCIÓN
              </th>
              <th></th>
            </tr>
          <tbody className="w-full text-sm text-left text-gray-500 dark:text-gray-400" >
            {rows.map((row, i) => {
              return (
         
                  <>
                    {isEdit ? (
                      <tr>
                       <td className="border   ">
                         <select
                         onChange={(e) => handleInputChange(e, i)}
                          className="ml-2 mr-4 mt-4 text-black"
                          name="niSecDoc"
                          id="">
                            <option value="Elije"> Resolución</option>
                            {actos?.map((c, index) => (
                              
                                <option key={index} value={c.sec || ''}>
                                    {c.radicado }
                                  </option>
                                  ))}
                         </select>
                        </td>

                        <td >
                          <input
                            value={row.viObligacion || ''}
                            type="text"
                            className="ml-2 mr-4 mt-4 text-black"
                            placeholder="Enter a obligacion..."
                            name="viObligacion"
                            onChange={(e) => handleInputChange(e, i)}
                          />
                        </td>
                        <td >
                          <input
                            value={row.viObs || ''}
                            type="text"
                            className="ml-2 mr-4 mt-4 text-black"
                            placeholder="Enter an descripcion..."
                            name="viObs"
                            onChange={(e) => handleInputChange(e, i)}
                          />
                        </td>
                        <td >
                        <select
                            className="ml-2 mr-4 mt-4 text-black"
                            placeholder="cumplimiento..."
                            name="viCumple"
                            onChange={(e) => handleInputChange(e, i)}
                          >
                            <option value="Elije"> Calificación</option>
                            {califica.map((c, index) => (
                              <option key={index} value={c || ''}>
                                {c}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                            <input
                               value={row.niPlazo || ''}
                              type="text"
                              className="ml-2 mr-4 mt-4 text-black"
                              placeholder="plazo..."
                              name="niPlazo"
                              onChange={(e) => handleInputChange(e, i)}
                            />
                          </td>
                          <td>
                        <select
                          type="text"
                          onChange={(e) => handleInputChange(e, i)}
                           className="border  px-2 ml-2 mr-4 mt-4 text-black"
                           placeholder="periodica..."
                           name="viPeriodica"
                           id="">
                             <option value="Elije">Elije</option>
                             {periodica?.map((c, index) => (
                                 <option key={index} value={c || ''}>
                                     {c}{" "}
                                   </option>
                                   ))}
                          </select>
                          </td>
                          <td  className="border   px-4 py-1 w-1/4 whitespace-nowrap text-sm font-medium text-gray-900" >
                        <button
                        onClick={handleClick}
                        className=" py-2 px-2 mr-2 ml-2 mt-1 bg-blue-500 hover:bg-blue-500 text-gray-800 text-sm font-medium rounded-full">
                         <h1>Calificar</h1>
                        
                         </button>
                        
                        </td>
                        <td></td>
                        {!isEdit ? (
                            null
                          ) :   <Button className="mr10" onClick={goPage}>
                                <DeleteOutlineIcon />
                              </Button>}
                      </tr>
                    ) : (
                     
                      <>
                         {obligaciones.lista_obligacionesIt?.map((row, index)=>(
                            <tr>
                                <td  className="border   px-4 py-1 w-1/2 whitespace-nowrap text-sm font-medium text-gray-900">
                         <input 
                          value={row.doc_radicado}
                          type="text"
                          className="ml-2 mr-4 mt-4 text-black"
                          name="doc_radicado"
                         />
                        </td>
                        <td 
                          hidden
                           className="border whitespace-nowrap text-sm font-medium text-gray-900"
                        >
                          {row?.linea}
                        </td>
                        <td  className="border   px-4 py-1 w-full whitespace-nowrap text-sm font-medium text-gray-900" >
                        {row.obligacion}
                        </td>
                        <td  className="border   px-4 py-1 w-1/4 whitespace-nowrap text-sm font-medium text-gray-900" >
                        {row.observaciones}
                        </td>
                        <td  className="border   px-4 py-1 w-1/4 whitespace-nowrap text-sm font-medium text-gray-900" >
                        {row.cumplio}
                        </td>
                        <td  className="border   px-4 py-1 w-1/4 whitespace-nowrap text-sm font-medium text-gray-900" >
                        {row.plazo_meses}
                        </td>
                        <td   className="border">
                          <h1>{row.periodica}</h1>
                        </td>
                        <td  className="border   px-4 py-1 w-1/4 whitespace-nowrap text-sm font-medium text-gray-900" >
                        <button
                        onClick={handleClick}
                        className=" py-2 px-2 mr-2 ml-2 mt-1 bg-blue-500 hover:bg-blue-500 text-gray-800 text-sm font-medium rounded-full">
                         <h1>Calificar</h1>
                        
                         </button>
                        </td>
                        <td></td>

                        {isEdit ? (
                              <Button className="mr10" onClick={handleConfirm}>
                              <DeleteOutlineIcon />
                            </Button>
                          ) : null}
                            
                            </tr>
                         ))}
                      </>                    
                    )}
                    {showConfirm && (
                      <Fragment>
                        <Dialog
                          open={showConfirm}
                          onClose={handleNo}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle id="alert-dialog-title">
                            {"Confira Eliminar"}
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                              Esta segura de eliminarla
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button
                              onClick={() => handleRemoveClick(i)}
                              color="primary"
                              autoFocus
                            >
                              Si
                            </Button>
                            <Button
                              onClick={handleNo}
                              color="primary"
                              autoFocus
                            >
                              No
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </Fragment>
                    )}
                  </>
                    
                    );
                  })}
                </tbody>
               
              </table>
            </>
          </tbody>
        </div>
    </div>
      

    {/*   <form onSubmit={handleAddFormSubmit}
         className="overflow-x-auto relative">
        <br />
        <h1>Aquí agrega obligaciones identificadas :</h1>
        <table>
          <tbody>
            <tr>
              <td>
                <select
                  onChange={handleAddFormChange}
                  className="ml-2 mr-4 mt-4 text-black"
                  name="niSecDoc"
                  id=""
                >
                  {actos?.map((c, index) => (
                    <option key={index} value={c.sec}>
                      {c.radicado}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <input
                  hidden
                  type="number"
                  className="ml-2 mr-4 mt-4 text-black"
                  placeholder="nioLinea"
                  name="nioLinea"
                  onChange={handleAddFormChange}
                />
              </td>
              <td>
                <input
                  hidden
                  type="number"
                  className="ml-2 mr-4 mt-4 text-black"
                  placeholder="niSecEEta"
                  name="niSecEEta"
                  onChange={handleAddFormChange}
                />
              </td>

              <input
                hidden
                type="text"
                className="ml-2 mr-4 mt-4 text-black"
                placeholder="Enter a niSecTer..."
                name="niSecTer"
                onChange={handleAddFormChange}
              />

              <td>
                <input
                  type="text"
                  className="ml-2 mr-4 mt-4 text-black"
                  placeholder="Enter a obligacion..."
                  name="viObligacion"
                  onChange={handleAddFormChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="ml-2 mr-4 mt-4 text-black"
                  placeholder="Enter an descripcion..."
                  name="viObs"
                  onChange={handleAddFormChange}
                />
              </td>
              <td>
                <select
                  className="ml-2 mr-4 mt-4 text-black"
                  placeholder="cumplimiento..."
                  name="viCumple"
                  onChange={handleAddFormChange}
                >
                  <option value="Elije"> Calificación</option>
                  {califica.map((c, index) => (
                    <option key={index} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <input
                  type="text"
                  className="ml-2 mr-4 mt-4 text-black"
                  placeholder="plazo..."
                  name="niPlazo"
                  onChange={handleAddFormChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="ml-2 mr-4 mt-4 text-black"
                  placeholder="periodica..."
                  name="viPeriodica"
                  onChange={handleAddFormChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button
        onClick={handleItUpload} 
        
          type="submit"
          className="inline-flex items-center px-4 py-2 mr-2 mt-2 bg-blue-500 hover:bg-blue-500 text-gray-800 text-sm font-medium rounded-lg"
        >
          <AddCircleRoundedIcon />
          Agregar
        </button>
      </form> */}
    </>
  );
};

export default Obliga;
