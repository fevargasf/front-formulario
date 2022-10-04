import React from "react";

const EditableRowP = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
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
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRowP;
