import React, { useState, useEffect, Fragment } from "react";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { useForm, Controller } from "react-hook-form";

import { dataAutogestion } from "redux/reducers/autogestionSlice";
import { useDispatch, useSelector } from "react-redux";
import { dataUserEx } from "redux/reducers/queryUserExpeSlice";
import { dataInformation } from "redux/reducers/informationSlice";
import { identifierActionsQuser } from "redux/reducers/queryUserExpeSlice";

//Error Component
const Error = ({ children }) => <p style={{ color: "red" }}>{children}</p>;
const ReadOnlyRowP = ({ contact, handleEditClick, handleDeleteClick }) => {
  const data = useSelector(dataAutogestion);
  const dataUser = useSelector(dataUserEx);
  const dataInfo = useSelector(dataInformation);
  const [selecU, setSelecU] = useState("");
  const [userExp, setUserExp] = useState(dataUser);
  const [movieDetails, setDetails] = useState([]);
  const [show, setHide] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const secuenciaEx = dataInfo.exp_sec;
    dispatch({
      type: identifierActionsQuser.FETCH_USER_EXPEDIENTE,
      payload:secuenciaEx,
    });
  }, []);

  const fetchMovie = async (e) => {
    setSelecU(e.target.value);
    console.log(setSelecU);
    try {
      dispatch({
        type: identifierActionsQuser.FETCH_USER_EXPEDIENTE,
        payload: dataInfo?.exp_sec,
      });
    } catch (error) {
      console.log(error);
    }
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

  //const lista = dataUser?.map(i=>i.nombres)
  //console.log(lista)

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <div className="wrapper">
      <form>
        <section>
          <label>Elegir Usuario :</label>
          <select className="ml-2 mr-4 mt-4 text-black" name="" id="">
            <option value="">Elija un Usuario</option>
            {dataUser?.map((usuario,i) => (
              <option key={i} value="">{usuario.nombres}</option>
            ))}
          </select>
        </section>
      </form>
    </div>
  );
};

export default ReadOnlyRowP;
