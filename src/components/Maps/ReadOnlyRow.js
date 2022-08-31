import React from "react";
import { dataRecord } from "redux/reducers/recordExpSlice"
import { useDispatch, useSelector } from "react-redux";

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick }) => {
 const data = useSelector(dataRecord);

  return (
    <tr key={contact.doc_sec}>
      
      <td>{contact.descriptor}</td>
      <td>{contact.fecha}</td>
      <td>{contact.phoneNumber}</td>
      <td>{contact.email}</td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, contact)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(contact.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;