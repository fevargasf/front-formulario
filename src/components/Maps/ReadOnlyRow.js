import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { dataAutogestion } from "redux/reducers/autogestionSlice";
import { dataInformation } from "redux/reducers/informationSlice";
import { actsData } from "redux/reducers/actsExpSlice";
import { identifierActionsActs } from "redux/reducers/actsExpSlice";
import Modal from "components/Modal";
import MapExample from "components/Maps/MapExample.js";

const ReadOnlyRow = ({
  contact,
  handleEditClick,
  handleDeleteClick,
  idEtapa,
}) => {
  
  const data = useSelector(dataAutogestion);
  const expediente = useSelector(dataInformation);
  //const carga = useSelector((state) => state.auth.voerror)
  const actos = useSelector(actsData);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();


  /**states */
  const [see, setSee] = useState("");
  useEffect(() => {
    const secuenciaE = expediente.exp_sec;

    dispatch({ type: identifierActionsActs.FETCH_ACTS, payload: secuenciaE });
    const lista = actos?.map((i) => i.radicado);

    setSee(lista);
  }, []);

  const download = (e) => {
    e.preventDefault();
    const linkSource = `data:application/pdf;base64,${contact.archivo}`;
    const downloadLink = document.createElement("a");
    const fileName = `${contact.archivo_nombre}`;

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  };

  const defaultValues = {
    usuario: "",
  };

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({ defaultValues });
  const lista = data.map((i) => i.radicado_resolucion);

  const handleClose = (e) => {
    e.preventDefault();
    setShowModal(false);
  };
  const handleClick = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <>
      <tr className="border  " key={contact.doc_sec}>
        <td className="border   px-4 py-1 w-1/4 whitespace-nowrap text-sm font-medium text-gray-900">
          <select className="ml-2 mr-4 mt-4 text-black" name="" id="">
            {actos?.map((r) => (
              <option value="">{r.radicado}</option>
            ))}
          </select>
        </td>
        <td
          hidden
          className="border   px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
        >
          {contact?.obliga_linea}
        </td>
        <td className="border   text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          {contact?.obliga_obs}
        </td>
        <td className="border   text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          {contact?.obliga_descripcion}
        </td>
        <td className="border   text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          {contact?.comoTermina}
        </td>
        {/*   <td className="border   text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <a className=" cursor: pointer;" onClick={download}>Descargar</a>
                </td> */}
        <td className="border   text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"></td>
        <td className="border   text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"></td>
        <td>
          <div className="flex justify-center">
            <button
              onClick={(event) => handleEditClick(event, contact)}
              className=" mr-2 ml-2 mt-1 bg-blue-500 hover:bg-blue-500 text-gray-800 text-sm font-medium rounded-full"
            >
              <svg
                class="fill-white"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="20"
                height="20"
                viewBox="0 0 50 50"
              >
                <path d="M 46.574219 3.425781 C 45.625 2.476563 44.378906 2 43.132813 2 C 41.886719 2 40.640625 2.476563 39.691406 3.425781 C 39.691406 3.425781 39.621094 3.492188 39.53125 3.585938 C 39.523438 3.59375 39.511719 3.597656 39.503906 3.605469 L 4.300781 38.804688 C 4.179688 38.929688 4.089844 39.082031 4.042969 39.253906 L 2.035156 46.742188 C 1.941406 47.085938 2.039063 47.453125 2.292969 47.707031 C 2.484375 47.898438 2.738281 48 3 48 C 3.085938 48 3.171875 47.988281 3.257813 47.964844 L 10.746094 45.957031 C 10.917969 45.910156 11.070313 45.820313 11.195313 45.695313 L 46.394531 10.5 C 46.40625 10.488281 46.410156 10.472656 46.417969 10.460938 C 46.507813 10.371094 46.570313 10.308594 46.570313 10.308594 C 48.476563 8.40625 48.476563 5.324219 46.574219 3.425781 Z M 45.160156 4.839844 C 46.277344 5.957031 46.277344 7.777344 45.160156 8.894531 C 44.828125 9.222656 44.546875 9.507813 44.304688 9.75 L 40.25 5.695313 C 40.710938 5.234375 41.105469 4.839844 41.105469 4.839844 C 41.644531 4.296875 42.367188 4 43.132813 4 C 43.898438 4 44.617188 4.300781 45.160156 4.839844 Z M 5.605469 41.152344 L 8.847656 44.394531 L 4.414063 45.585938 Z"></path>
              </svg>
            </button>
            <a
              onClick={(event) => {
                event.preventDefault();
                handleDeleteClick(contact?.obliga_linea);
              }}
              className="inline-flex items-center    bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-full "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </a>
            <button
              onClick={handleClick}
              className="  mr-2 ml-2 mt-1 bg-blue-500 hover:bg-blue-500 text-gray-800 text-sm font-medium rounded-full"
            >
              Reportar
            </button>
            {showModal && (
              <Modal onClose={handleClose}>
                <MapExample />
              </Modal>
            )}
          </div>
        </td>
      </tr>
  
    </>
  );
};

export default ReadOnlyRow;
