import { axiosInstance } from "config/axiosConfig";
import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import ReadOnlyRow from "components/Maps/ReadOnlyRow";
import EditableRow from "components/Maps/EditableRow";
import { identifierQueryAction } from "redux/reducers/querySignSlice";
import { dataAutogestion } from "redux/reducers/autogestionSlice";
import { identifierAutogestionAction } from "redux/reducers/autogestionSlice";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import ReadOnlyRowsP from "./ReadOnlyRowP";

import { useForm} from "react-hook-form";
import { dataUserQuery } from "redux/reducers/userQuerySlice";
import { identifierActionsUser } from "redux/reducers/userQuerySlice";
import ReadOblig from "./ReadOblig";
import { actsData } from "redux/reducers/actsExpSlice";
import { dataInformation } from "redux/reducers/informationSlice";
import { identifierActionsActs } from "redux/reducers/actsExpSlice";
import EditableRowP from "./EditableRowP";



const Obliga = ({ idEtapa, contact, ibIts }) => {
  const data = useSelector(dataAutogestion);
  const obligaciones = useSelector(dataUserQuery);
  const [contacts, setContacts] = useState(data);
  const [contactsO, setContactsO] = useState(obligaciones);
  const [ibIt, setIbIt] = useState(obligaciones);
  const [verIt, setVerIt] = useState(false);
  const user = useSelector((state) => state.auth.usuario)

  const expediente = useSelector(dataInformation);
  const actos = useSelector(actsData);
  const dispatch = useDispatch();
  /**states */
  const [see, setSee] = useState("");
  const [sec, setSec] = useState();
  const [selecId, setSelectId] = useState([]);


  useEffect(() => {
    const secuenciaE = expediente.exp_sec;

    dispatch({
      type: identifierActionsActs.FETCH_ACTS,
      payload: secuenciaE,
    });

    const lista = actos?.map((i) => i.radicado);
    const listaSec = actos?.map((f) => f.sec);

    let object = {};

    for (let i = 0; i < lista?.length; i++) {
      object[lista[i]] = listaSec[i];

      setSelectId(object);
      setSee(lista);
      setSec(Object.values(object));
    }
  }, []);
  const [addFormData, setAddFormData] = useState([
    {
      /*  obliga_linea: "",
      obliga_obs: "",
      obliga_descripcion: "", */
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
    },
  ]);
  const [editFormData, setEditFormData] = useState({
    /*   obliga_obs: "",
    obliga_descripcion: "",
     nioLinea: "",
     */
     comoTermina: "",
     niSecEEta: "",
     linea: "",
     niSecDoc: "",
     niSecTer: "",
     viObligacion: "",
     viPeriodica: "",
     niPlazo: "",
     viCumple: "",
     viObs: "",
     viMotivoParcial: "",
  });
  {/* todas la obligaciones*/}

  
  useEffect(() => {
    dispatch({
      type: identifierActionsActs.FETCH_ACTS,
      payload: expediente.exp_sec,
    });
  }, []);

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
  
      dispatch({ type: identifierActionsUser.FETCH_USER_IT, payload: dataObli });
      dispatch({
        type: identifierAutogestionAction.FETCH_QUERY_AUTOGESTION,
        payload: idEtapa,
      });
    };

    updateDataAutogestion();
  }, []);

  const [editContactId, setEditContactId] = useState(null);

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;
    setEditFormData(newFormData);
  };
  console.log(editFormData,"edit")
  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;
    const form = event.target;

    setAddFormData(newFormData);
  };

  /*                                      */
  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      /*   obliga_linea: null,
      obliga_obs: addFormData.obliga_obs,
      obliga_descripcion: addFormData.obliga_descripcion, */
      niSecEEta: addFormData.niSecEEta,
      nioLinea: addFormData.nioLinea,
      niSecDoc: addFormData.niSecDoc,
      niSecTer: addFormData.niSecTer,
      viObligacion: addFormData.viObligacion,
      viCumple: addFormData.viCumple,
      viObs: addFormData.viObs,
      viMotivoParcial: addFormData.viMotivoParcial,
      comoTermina: addFormData.comoTermina,
      niPlazo: addFormData.niPlazo,
      viPeriodica: addFormData.viPeriodica,
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      /*   obliga_linea: editContactId,
      obliga_obs: addFormData.obligacion,
      obliga_descripcion: addFormData.obliga_descripcion, */
      linea: editContactId,
      niSecDoc: addFormData.niSecDoc,
      niSecTer: addFormData.niSecTer,
      viObligacion: addFormData.viObligacion,
      viCumple: addFormData.viCumple,
      viObs: addFormData.viObs,
      viMotivoParcial: addFormData.viMotivoParcial,
      comoTermina: addFormData.comoTermina,
      niPlazo: addFormData.niPlazo,
      viPeriodica: addFormData.viPeriodica,
    };

    const newContacts = [...ibIt];
    const index = contacts.findIndex(
      (ibItO) => ibItO?.linea === editContactId
    );
    newContacts[index] = editedContact;
    setIbIt(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, ibItO) => {
    event.preventDefault();
    setEditContactId(ibItO?.linea);

    const formValues = {
      /*   obliga_obs: contact.obliga_obs,
      obliga_descripcion: contact.obliga_descripcion, 
      niSecDoc: contact?.niSecDoc,
      niSecTer: contact?.niSecTer,
      viCumple: contact?.viCumple,
      viObs: contact?.viObs,
      viObligacion: contact?.viObligacion,
      niPlazo: contact?.niPlazo,
      viPeriodica: contact?.viPeriodica,
       comoTermina: contact.motivo_parcial ,*/
     
       niSecDoc: ibItO?.niSecDoc,
       niSecTer: ibItO?.niSecTer,
       viObligacion: ibItO?.viObligacion,
       viCumple: ibItO?.viCumple,
       viObs: ibItO?.viObs,
       viMotivoParcial: ibItO?.viMotivoParcial,
       comoTermina: ibItO?.comoTermina,
       niPlazo: ibItO?.niPlazo,
       viPeriodica: ibItO?.viPeriodica,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId, e) => {
    e.preventDefault();
    const newContacts = [...contacts];
    //const index = contacts.findIndex((contact) => contact?.Linea === contactId);
    const index = contacts.findIndex((ibIts) => ibIts?.linea === contactId);
    newContacts.splice(index, 1);
    setContacts(newContacts);
  };

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

  const [result, setResult] = useState("");
  const handleImageUpload = (event) => {
    event.preventDefault();
    var f = new FormData();
    console.log(addFormData.niSecDoc);
    f.append("niSecEEta", idEtapa);
    f.append(
      "nioLinea",
      addFormData.nioLinea ? String(addFormData.nioLinea) : ""
    );
    f.append("niSecDoc", addFormData.niSecDoc);
    f.append(
      "niSecTer",
      addFormData.niSecTer ? String(addFormData.niSecTer) : ""
    );
    f.append("viObligacion", addFormData.viObligacion);
    f.append("viCumple", addFormData.viCumple);
    f.append("viObs", addFormData.viObs);
    f.append("viMotivoParcial", addFormData.viMotivoParcial);
    f.append(
      "comoTermina",
      addFormData.comoTermina ? String(addFormData.comoTermina) : ""
    );
    f.append("niPlazo", addFormData.niPlazo ? String(addFormData.niPlazo) : "");
    f.append(
      "viPeriodica",
      addFormData.viPeriodica ? String(addFormData.viPeriodica) : ""
    );
    f.append("viIdUsuario",user)

    console.log(f);
    fetch("http://localhost:8082/guardar_ObligacionIt", {
      method: "POST",
      body: f,
    })
      .then((response) => response.json())
      .then((data) => {
        setResult(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
 
  const califica = ["T", "P", "No"];


  return (
    <>
      <div className="overflow-x-auto relative">
        <form onSubmit={handleEditFormSubmit}>
          <div className="flex justify-center">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 mr-4 ml-8 mt-2 bg-blue-500 hover:bg-blue-500 text-gray-800 text-sm font-medium rounded-lg"
            >
              <AddCircleRoundedIcon />
              Agregar
            </button>
          </div>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <ReadOnlyRowsP contact={contact} />
            <br />
            <tr className="border  boder-gray-900 uppercase">
              <th
                scope="col"
                className="border  text-sm font-medium text-gray-900 px-6 py-4"
              >
                Resolución
              </th>
              <th
                scope="col"
                className="border  text-sm font-medium text-gray-900 px-6 py-4 w-1/4"
              >
                Obligaciones
              </th>
              <th
                scope="col"
                className="border  text-sm font-medium text-gray-900 px-6 py-4 w-1/2"
              >
                Descripción
              </th>
              <th
                scope="col"
                className="border  text-sm font-medium text-gray-900 px-6 py-4 "
              >
                Cumplió
              </th>
              <th
                scope="col"
                className=" border text-sm font-medium text-gray-900 px-6 py-4"
              >
                Plazo
              </th>
              <th
                scope="col"
                className=" border text-sm font-medium text-gray-900 px-6 py-4 "
              >
                Periodica
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 w-1/4"
              >
                Acciones
              </th>
            </tr>
            <tbody className="">
              {contacts?.map((contact) => (
                <>
                  <Fragment>
                    {editContactId === contact?.obliga_linea ? (
                      <EditableRow
                        idEtapa={idEtapa}
                        editFormData={editFormData}
                        handleEditFormChange={handleEditFormChange}
                        handleCancelClick={handleCancelClick}
                      />
                    ) : (
                      <ReadOnlyRow
                        idEtapa={idEtapa}
                        contact={contact}
                        handleEditClick={handleEditClick}
                        handleDeleteClick={handleDeleteClick}
                      />
                    )}
                  
                  </Fragment>
                </>
              ))}
               {ibIt.lista_obligacionesIt?.map((ibIts) => (
                      <>
                      <Fragment>
                      {editContactId === ibIts?.linea ?(
                           <EditableRowP
                           idEtapa={idEtapa}
                           editFormData={editFormData}
                           handleEditFormChange={handleEditFormChange}
                           handleCancelClick={handleCancelClick}
                           />
                      ):(
                      
                        <ReadOblig 
                        editFormData={editFormData}
                        handleEditFormChange={handleEditFormChange}
                        handleEditClick={handleEditClick}
                        handleCancelClick={handleCancelClick}
                        ibIts={ibIts} />
                      )}
                    
                      </Fragment>
                      
                      </>
                    ))}
            </tbody>
          </table>
        </form>
        <br />
        {/* Agregar formularios vacios */}
      </div>
      <form className="overflow-x-auto relative">
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
          onClick={handleImageUpload}
          type="submit"
          className="inline-flex items-center px-4 py-2 mr-2 mt-2 bg-blue-500 hover:bg-blue-500 text-gray-800 text-sm font-medium rounded-lg"
        >
          <AddCircleRoundedIcon />
          Agregar
        </button>
      </form>
    </>
  );
};

export default Obliga;
