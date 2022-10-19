import React, { useState,useRef, useEffect, Fragment } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { axiosInstance } from "Helpers/auth-helpers";
import { TableRow, Paper } from "@material-ui/core";

import CreateIcon from "@material-ui/icons/Create";
import { Button, Snackbar } from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AddBoxIcon from "@material-ui/icons/AddBox";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import { identifierCoordAction } from "redux/reducers/coordinateQuerySlice";
import { dataCoordinate } from "redux/reducers/coordinateQuerySlice";
import Modal from "components/Modal";
import SearchForm from "views/admin/SearchForm";

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "rgb(12,74,110, 1)",
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
    backgroundColor: "blue",
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
    minWidth: 600,
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
  const goPage = () => {
    setEdit(false);
  };
  const coordinatesQ = useSelector(dataCoordinate);
  const [valueInput, setValueInput] = useState(coordinatesQ);
  const [showModal, setShowModal] = useState(false);
  const user = useSelector((state) => state.auth.usuario);
  const [editContactId, setEditContactId] = useState(null);
  const [isEdit, setEdit] = useState(false);
  const [disable, setDisable] = useState(true);
  const [open, setOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [rowsT, setRowsT] = useState([{
    name: "",
    mobile: ""
  }]);
  const fieldRef = useRef();


  useEffect(() => {
    const pathname = _location.pathname;
    const niSecEETA = pathname.split("/")[4];

    const base = {
      niSecEETA: niSecEETA,
      viUsuario: user,
    };
    dispatch({
      type: identifierCoordAction.FETCH_QUERY_COORDINATE,
      payload: base,
    });

    setValueInput(coordinatesQ);
  }, []);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      textField: "",
      checkbox: true,
      checkbox2: false,
    },
  });

  const classes = useStyles();

  // Showing delete confirmation to users
  const handleConfirm = () => {
    setShowConfirm(true);
    //
  };

  const handleNo = () => {
    setShowConfirm(false);
  };
  /*  const [roomInputs, setRoomInputs] = useState([{ dato1: "", dato2: "" }]); */

  const [rows, setRows] = useState([
    {
      niSecEEta: "",
      viUsuario: "",
      niLinea: editContactId,
      niSecCaptacion: "",
      niSecVertimiento: "",
      niSistemaCoorde: "",
      niX: "",
      niY: "",
      viTipoCoorde: "",
      viDescripcion: "",
      viObservaciones: "",

      /*  capta_sec: "",
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
    y:""  */
    },
  ]);
  const handleInputChange = (e, index) => {
    setDisable(false);
    const { name, value } = e.target;
    console.log(value);
    const list = [...rows];
    list[index][name] = value;
    setRows(list);
 
  };


  const handleRemoveClickRoom = (index) => {
    setEdit(false);
  };
  /*  const handleRemoveClickRoom = (index) => {
    const list = [...roomInputs];
    list.splice(index, 1);
    setRoomInputs(list);
  }; */

  const handleAdd = (e) => {
    e.preventDefault();
    setRows([
      ...rows,
      {
        /* capta_sec: "",cota:"",
      creado_por:"" ,descripcion: "",
      fecha_creacion:"",linea:"",
      municipio: "",nivel_subsiguiente: "",
    nombre_sistema_coordenadas:"",observaciones:"", sistema_coordenadas:"", vert_sec:"", x:"",y:""  */
        niSecEEta: "",
        viUsuario: "",
        niLinea: editContactId,
        niSecCaptacion: "",
        niSecVertimiento: "",
        niSistemaCoorde: "",
        niX: "",
        niY: "",
        viTipoCoorde: "",
        viDescripcion: "",
        viObservaciones: "",
      },
    ]);
    setEdit(true);
  };

  const handleCloseM = (e) => {
    e.preventDefault();
    setShowModal(false);
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
      f.append( "niLinea", r.niLinea ? String(r.niLinea) : "");
      f.append("niSecCaptacion", r.niSecCaptacion);
      f.append( "niSecVertimiento",r.niSecVertimiento ? String(r.niSecVertimiento) : "");
      f.append("niSistemaCoorde", r.niSistemaCoorde);
      f.append("niX", r.niX);
      f.append("niY", r.niY);
      f.append("viTipoCoorde", r.viTipoCoorde);
      f.append("viDescripcion", r.viDescripcion ? String(r.viDescripcion) : "");
      f.append("viObservaciones", r.viObservaciones ? String(r.viObservaciones) : "");
      f.append("viUsuario",user)
    })
        fetch("http://localhost:8082/editar_coordenada", {
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


  const action = (
    <Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        <ClearIcon />
      </Button>
    </Fragment>
  );
 const handleChange = idx => e => {
    const { name, value } = e.target;
    const rowsT = [...rowsT];
    rowsT[idx] = {
      [name]: value
    };
    setRowsT({
      rows
    });
  };
  const handleAddRow = (e) => {
    e.preventDefault();

   const item = {
      nombre: "",
      niX: "",
      niY: "",
      cota: "",
      municipio: "",
      nivel: "",
    }; 

    setRowsT(
       [...rowsT, item],
    );
  };

 const handleRemoveRow = (e) => {
   e.preventDefault();
    setRowsT([
      rowsT.slice(0, -1)
   ] );
  };


  return (
    <>
      <div className=" overflow-x-auto relative px-4">
        <div className="">
        {rowsT.map((item, idx) => (
           <div className="flex justify-center">
             
                   <br />
                   <br />
               <div className="">
                 <br />
                 <tbody className="">
                   <div>
                     <Snackbar
                       anchorOrigin={{
                         vertical: "top",
                         horizontal: "center",
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
                               <Button disabled align="right">
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
                         <Button align="right" onClick={handleEdit}>
                           <p className="button">
                             <CreateIcon />
                             Ingreso de coordenadas
                           </p>
                         </Button>
                       </>
                     )}
                   </>
                   <>
                   &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                   <input
                     type="text"
                     name="nombre"
                     placeholder="Concesión de aguas"
                     className="form-control"
                   
                   />
                       <table style={{marginRight:"-43rem"}}>
                       <tr
                       
                         style={{
                           backgroundColor: "rgba(12, 74, 110)",
                           color: "#FFFFFF",
                         }}
                       >
                         <th
                           className="border  text-sm font-medium text-gray-900 px-6 py-4"
                           align="left"
                         >
                           Coordenada X
                         </th>
                         <th
                           className="border  text-sm font-medium text-gray-900 px-6 py-4"
                           align="left"
                         >
                           Coordenada Y
                         </th>
                         {isEdit ?   <th   className="border  text-sm font-medium text-gray-900 px-6 py-4">
                           Sistema de Referencia
                         </th>:null}
                      
                         <th
                           className="border  text-sm font-medium text-gray-900 px-6 py-4"
                           align="left"
                         >
                           Cota
                         </th>
                         <th
                           className="border  text-sm font-medium text-gray-900 px-6 py-4"
                           align="left"
                         >
                           Nivel Subsiguiente
                         </th>
                         <th
                           className="border  text-sm font-medium text-gray-900 px-6 py-4"
                           align="left"
                         >
                           Acciones
                         </th>
               
                       </tr>
                       <tbody className=" w-full text-sm text-left text-gray-500 dark:text-gray-400">
                         {rows.map((row, i) => {
                           return (
                             <>
                               {isEdit ? (
                                 
                                   <tr className=" mb-4 py-4 mt-4">
                                    
                                   <td
                                     className="border  px-4 py-4 w-1/4 whitespace-nowrap text-sm font-medium text-gray-900"
                                     align="left"
                                   >
                                     <input
                                       type="number"
                                       className="form-control  text-black"
                                       name="niX"
                                       value={row.niX || ""}
                                       onChange={(e) => handleInputChange(e, i)}
                                     />
                                   </td>
                                   <td
                                     className="border  px-4 py-4 w-1/4 whitespace-nowrap text-sm font-medium text-gray-900"
                                     align="left"
                                   >
                                     <input
                                       type="number"
                                       name="niY"
                                       className="form-control  text-black"
                                       value={row.niY || ""}
                                       onChange={(e) => handleInputChange(e, i)}
                                     />
                                   </td>
                                   <td  className="border  px-4 py-4 w-1/4 whitespace-nowrap text-sm font-medium text-gray-900">
                                   <select 
                                    onChange={(e) => handleInputChange(e, i)}
                                    className="ml-2 mr-4 mt-4 text-black"
                                    name="niSistemaCoorde"
                                   >
				                            	<option value="4326">WGS84</option>
                                      <option value="3116">MAGNA-SIRGAS Colombia Bogota</option>
                                      <option value="3115">Origen Único</option>
                                   </select>
                                   </td>
                                   <td
                                     className="border  px-4 py-4 w-1/4 whitespace-nowrap text-sm font-medium text-gray-900"
                                     align="left"
                                   >
                                     <input
                                       type="number"
                                       name="cota"
                                       className="form-control text-black"
                                     />
                                   </td>
                                 
                                   <td className="border  px-4 py-4 w-1/4 whitespace-nowrap text-sm font-medium text-gray-900">
                                     <input
                                       type="text"
                                       name="nivel"
                                       className="form-control text-black"
                                     />
                                   </td>
                                   <td className="border  px-4 py-4 w-1/4 whitespace-nowrap text-sm font-medium text-gray-900">
                                   <button
                                     onClick={handleClick}
                                      className="  mr-2 ml-2 mt-1 bg-blue-500 hover:bg-blue-500 text-gray-800 text-sm font-medium rounded-full">
                                      Evaluar
                                    </button>
                                    {showModal && (
                                      <Modal onClose={handleClose}>
                                        <SearchForm row={row} />
                                      </Modal>
                                           )}
                                   </td>
       
                                   {!isEdit ? null : (
                                     <Button className="mr10" onClick={goPage}>
                                       <DeleteOutlineIcon />
                                     </Button>
                                   )}
                                 </tr>
                               ) : (
                                 <>
                                   {coordinatesQ.lista_coordenadas?.map(
                                     (q, index) => (
                                       <tr className="mt-4 py-4">
                                         <td
                                           className="border  px-4 py-4 w-1/4 whitespace-nowrap text-sm font-medium text-gray-900"
                                           align="left"
                                         >
                                           <input
                                             type="number"
                                             className="form-control  text-black"
                                             name="x"
                                             value={q.x || ""}
                                           />
                                         </td>
                                         <td
                                           className="border   px-4 py-4 w-1/4 whitespace-nowrap text-sm font-medium text-gray-900"
                                           align="left"
                                         >
                                           <input
                                             type="number"
                                             name="y"
                                             className="form-control  text-black"
                                             value={q.y || ""}
                                           />
                                         </td>
                                         <td
                                           className="border   px-4 py-4 w-1/4 whitespace-nowrap text-sm font-medium text-gray-900"
                                           align="left"
                                         >
                                           <input
                                             type="number"
                                             name="cota"
                                             className="form-control text-black"
                                             value={q.cota || ""} />
                                         </td>
                                         <td  className="border   px-4 py-4 w-1/4 whitespace-nowrap text-sm font-medium text-gray-900" >
                                         <input
                                             type="text"
                                             name="nivel"
                                             className="form-control text-black"
                                             value={q?.nivel || ""}
                                           />
                                         </td>
                                         <td hidden></td>
                                         <td className="border   px-4 py-4 w-1/4 whitespace-nowrap text-sm font-medium text-gray-900">
                                           <button
                                             onClick={handleClick}
                                             className="  mr-2 ml-2 mt-1 bg-blue-500 hover:bg-blue-500 text-gray-800 text-sm font-medium rounded-full">
                                             Evaluar
                                           </button>
                                           {showModal && (
                                             <Modal onClose={handleClose}>
                                               <SearchForm q={q} />
                                             </Modal>
                                           )}
                                         </td>
       
                                         {isEdit ? (
                                           <Button
                                             className="mr10"
                                             onClick={handleConfirm}>
                                             <DeleteOutlineIcon />
                                           </Button>
                                         ) : null}
                                       </tr>
                                     )
                                   )}
                                 </>
                               )}
                             </>
                           );
                         })}
                       </tbody>
                     </table>
                     <br /><br /><br />
                   </>
                 </tbody>
               </div>
             </div>
             ))}
        </div>
      </div>
         <div className="flex justify-center">
         <button onClick={handleAddRow} className="Upload__submit"> Agregar formulario </button>
         <button onClick={handleRemoveRow}  className="Upload__submit">Eliminar formulario </button>
         </div>
           
            </>
            );
          }
