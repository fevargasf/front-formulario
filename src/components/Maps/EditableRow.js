import React, { useState, useEffect } from "react";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { actsData } from "redux/reducers/actsExpSlice";
import { dataInformation } from "redux/reducers/informationSlice";
import { identifierActionsActs } from "redux/reducers/actsExpSlice";
import { identifierObliActions } from "redux/reducers/saveObligSlice";

const EditableRow = ({
  editFormData,
  ibIts,
  addFields,
  handleItUpload,
  handleEditFormChange,
  handleCancelClick,
}) => {
  const expediente = useSelector(dataInformation);
  const actos = useSelector(actsData);
  const dispatch = useDispatch();
  /**states */
  const [see, setSee] = useState("");
  const [sec, setSec] = useState();
  const [selecId, setSelectId] = useState([]);
  const [niSecDoc, setNiSecDoc] = useState("");


  useEffect(() => {
    dispatch({
      type: identifierActionsActs.FETCH_ACTS,
      payload: expediente.exp_sec,
    });

    const lista = actos?.map((i) => i.radicado);
    const listaSec = actos?.map((f) => f.sec);

    let object = {};

    for (let i = 0; i < lista.length; i++) {
      object[lista[i]] = listaSec[i];

      setSelectId(object);
      setSee(lista);
      setSec(Object.values(object));
    }
   
 

  }, []);

  const defaultValues = {
    actos: "",
    obliga_obs: "",
  };

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({ defaultValues });

  return (
    <tr key={editFormData.doc_sec}>
      <td>
  {/*       <Controller
          className=" border ml-2 mr-4 mt-4 text-black"
          name="actos"
          control={control}
          rules={{ required: true }}
          defaultValue={actos}
          render={({ field }) => (
            <DropDownListComponent
              dataSource={see}
              select={({ itemData }) => {
                field.onChange(itemData.value);
                const indices = [];

                var numberofcourses = see.length;
                var listofcourses = sec;
                for (let i = 0; i < numberofcourses; i++) {
                  //  usercourses[i] = new Object();
                  var usercourses = new Object();
                  usercourses.radicado = see[i];
                  usercourses.id = listofcourses[i];
                  indices.push(usercourses);
                }
                indices
                  .filter((i) => i.radicado === itemData.value)
                  .map((item, i) => setNiSecDoc(item.id));
              }}
              value={field.value}
            />
          )}
        /> */}
      </td>
      <input
          hidden
          type="number"
          className="ml-2 mr-4 mt-4 text-black"
          placeholder="linea"
          name="linea"
          value={editFormData.linea}
          onChange={handleEditFormChange}
        />
      
        <input
          hidden
          type="number"
          className="ml-2 mr-4 mt-4 text-black"
          placeholder="niSecDoc"
          name="niSecDoc"
          value={editFormData.niSecDoc}
          onChange={handleEditFormChange}
        />
           <input
          hidden
          type="number"
          className="ml-2 mr-4 mt-4 text-black"
          placeholder="niSecEEta"
          name="niSecEEta"
          value={editFormData.niSecEEta}
          onChange={handleEditFormChange}
        />
     
    
        
        <input
          hidden
          type="text"
          className="ml-2 mr-4 mt-4 text-black"
          placeholder="Enter a niSecTer..."
          name="niSecTer"
          value={editFormData.niSecTer}
          onChange={handleEditFormChange}
        />
    
      <input
          type="text"
          className="ml-2 mr-4 mt-4 text-black"
          placeholder="Enter a obligacion..."
          name="viObligacion"
          value={editFormData.viObligacion}
          onChange={handleEditFormChange}
        />
      <td>
        <input
          type="text"
          className="ml-2 mr-4 mt-4 text-black"
          placeholder="Enter an descripcion..."
          name="viObs"
          value={editFormData.viObs}
          onChange={handleEditFormChange}
        />

      </td>
      <td>
    <input
          type="text"
          className="ml-2 mr-4 mt-4 text-black"
          placeholder="cumplimiento..."
          name="viCumple"
          value={editFormData.viCumple}
          onChange={handleEditFormChange}
        /> 
      </td>
      <td>
        <input
          type="text"
          className="ml-2 mr-4 mt-4 text-black"
          placeholder="plazo..."
          name="niPlazo"
          value={editFormData.niPlazo}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          className="ml-2 mr-4 mt-4 text-black"
          placeholder="periodica..."
          name="viPeriodica"
          value={editFormData.viPeriodica}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <div className="flex justify-start">
          <button
           onClick={(e)=>{handleItUpload()
                e.preventDefault()}
               }
            className=" px-4 py-2 mr-2 mt-1 bg-blue-500 hover:bg-blue-500 text-gray-800 text-sm font-medium rounded-lg"
            type="submit"
          >
            Save
          </button>
          <button
            className="inline-flex items-center px-4 py-3   bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg"
            type="button"
            onClick={handleCancelClick}
          >
            Cancelar
          </button>
        </div>
      </td>
    </tr>
  );
};

export default EditableRow;
