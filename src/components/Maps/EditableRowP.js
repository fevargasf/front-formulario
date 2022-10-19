import React from "react";

const EditableRowP = ({
  ibIts,
  
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
          value={ibIts.linea}
          onChange={handleEditFormChange}
        />
      
        <input
          hidden
          type="number"
          className="ml-2 mr-4 mt-4 text-black"
          placeholder="niSecDoc"
          name="niSecDoc"
          value={ibIts.niSecDoc}
          onChange={handleEditFormChange}
        />
           <input
          hidden
          type="number"
          className="ml-2 mr-4 mt-4 text-black"
          placeholder="niSecEEta"
          name="niSecEEta"
          value={ibIts.niSecEEta}
          onChange={handleEditFormChange}
        />
     
    
        
        <input
          hidden
          type="text"
          className="ml-2 mr-4 mt-4 text-black"
          placeholder="Enter a niSecTer..."
          name="niSecTer"
          value={ibIts.niSecTer}
          onChange={handleEditFormChange}
        />
    <td>
    <input
          type="text"
          className="ml-2 mr-4 mt-4 text-red"
          placeholder="Enter a obligacion..."
          name="viObligacion"
          value={ibIts.viObligacion}
          onChange={handleEditFormChange}
        />
    </td>
      <td>
        <input
          type="text"
          className="ml-2 mr-4 mt-4 text-black"
          placeholder="Enter an descripcion..."
          name="viObs"
          value={ibIts.viObs}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
    <input
          type="text"
          className="ml-2 mr-4 mt-4 text-black"
          placeholder="cumplimiento..."
          name="viCumple"
          value={ibIts.viCumple}
          onChange={handleEditFormChange}
        /> 
      </td>
      <td>
        <input
          type="text"
          className="ml-2 mr-4 mt-4 text-black"
          placeholder="plazo..."
          name="niPlazo"
          value={ibIts.niPlazo}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          className="ml-2 mr-4 mt-4 text-black"
          placeholder="periodica..."
          name="viPeriodica"
          value={ibIts.viPeriodica}
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
