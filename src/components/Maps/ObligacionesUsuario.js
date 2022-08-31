import { axiosInstance } from 'config/axiosConfig';
import React, { useState,useEffect,Fragment  } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { dataRecord } from "redux/reducers/recordExpSlice"
import ReadOnlyRow from  "components/Maps/ReadOnlyRow";
import EditableRow from "components/Maps/EditableRow";
import { identifierQueryAction } from 'redux/reducers/querySignSlice';
import  {dataQuerySign}  from 'redux/reducers/querySignSlice';

const Obliga = ({idEtapa}) => {
   const dataFirmas = useSelector(dataQuerySign)
    const data = useSelector(dataRecord);
    const [contacts, setContacts] = useState(data);
    const dispatch = useDispatch();
    console.log(dataFirmas)
    
    useEffect(() => {
    
      dispatch({type: identifierQueryAction.FETCH_QUERY_SIGN, payload: idEtapa })
  
       },[]);
  
    const [addFormData, setAddFormData] = useState({
      descriptor: "",
      fecha: "",
      phoneNumber: "",
      email: "",
    });
  
    const [editFormData, setEditFormData] = useState({
      descriptor: "",
      fecha: "",
      phoneNumber: "",
      email: "",
    });
  
    const [editContactId, setEditContactId] = useState(null);
    console.log(editContactId)
  
    const handleAddFormChange = (event) => {
      event.preventDefault();
  
      const fieldName = event.target.getAttribute("name");
      const fieldValue = event.target.value;
  
      const newFormData = { ...addFormData };
      newFormData[fieldName] = fieldValue;
  
      setAddFormData(newFormData);
    };
  
    const handleEditFormChange = (event) => {
      event.preventDefault();
  
      const fieldName = event.target.getAttribute("name");
      const fieldValue = event.target.value;
  
      const newFormData = { ...editFormData };
      newFormData[fieldName] = fieldValue;
  
      setEditFormData(newFormData);
    };
  
    const handleAddFormSubmit = (event) => {
      event.preventDefault();
       
    var row = data.map(i =>{
        console.log(i.descriptor)
    })
      const newContact = {
        id: row.doc_sec,
        descriptor: row.descriptor,
        fecha: row.fecha,
        phoneNumber: addFormData.phoneNumber,
        email: addFormData.email,
      };
      
      const newContacts = [...contacts, newContact];
      setContacts(newContacts);
    };
    console.log(addFormData.descriptor)
    const handleEditFormSubmit = (event) => {
      event.preventDefault();
  
      const editedContact = {
        id: editContactId,
        descriptor: editFormData.descriptor,
        fecha: editFormData.fecha,
        phoneNumber: editFormData.phoneNumber,
        email: editFormData.email,
      };
  
      const newContacts = [...contacts];
  
      const index = contacts.findIndex((contact) => contact.doc_sec=== editContactId);
  
      newContacts[index] = editedContact;
  
      setContacts(newContacts);
      setEditContactId(null);
    };
  
    const handleEditClick = (event, contact) => {
      event.preventDefault();
      setEditContactId(contact.id);
      console.log(contact.id)
  
      const formValues = {
        fullName: contact.fullName,
        fecha: contact.fecha,
        phoneNumber: contact.phoneNumber,
        email: contact.email,
      };
  
      setEditFormData(formValues);
    };
  
    const handleCancelClick = () => {
      setEditContactId(null);
    };
  
    const handleDeleteClick = (contactId) => {
      const newContacts = [...contacts];
  
      const index = contacts.findIndex((contact) => contact.id === contactId);
  
      newContacts.splice(index, 1);
  
      setContacts(newContacts);
    };
  
    return (
      <div className="app-container">
        <form onSubmit={handleEditFormSubmit}>
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Obligaciones</th>
                <th>Descripción</th>
                <th>Link</th>
                <th>Cumplió</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <Fragment>
                  {editContactId!= contact.id ? (
                    <EditableRow
                      editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick}
                    />
                  ) : (
                    <ReadOnlyRow
                      contact={contact}
                      handleEditClick={handleEditClick}
                      handleDeleteClick={handleDeleteClick}
                    />
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </form>
  
        <h2>Add a Contact</h2>
        <form onSubmit={handleAddFormSubmit}>
          <input
            type="text"
            name="fullName"
            required="required"
            placeholder="Enter a name..."
            onChange={handleAddFormChange}
          />
          <input
            type="text"
            name="address"
            required="required"
            placeholder="Enter an addres..."
            onChange={handleAddFormChange}
          />
          <input
            type="text"
            name="phoneNumber"
            required="required"
            placeholder="Enter a phone number..."
            onChange={handleAddFormChange}
          />
          <input
            type="email"
            name="email"
            required="required"
            placeholder="Enter an email..."
            onChange={handleAddFormChange}
          />
          <button type="submit">Add</button>
        </form>
      </div>
    );
  };
  
  export default Obliga;