import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";

import { useDispatch, useSelector } from "react-redux";
import ReadOnlyRow from "./ReadOnlyRowP";
import EditableRow from "./EditableRowP";
//import  {dataAutogestion}  from 'redux/reducers/autogestionSlice';


const data=
[
    {
      "id": 1,
      "fullName": "Jenny Chan",
      "address": "3 waterfoot road",
      "phoneNumber": "333-962-7516",
      "email": "jenny.chan@email.com"
    },
    {
      "id": 2,
      "fullName": "Jessica warren",
      "address": "4 tall town",
      "phoneNumber": "011-211-7516",
      "email": "jessica.warren@email.com"
    },
    {
      "id": 3,
      "fullName": "Tony Frank",
      "address": "11 lesly road",
      "phoneNumber": "788-962-7516",
      "email": "tony.frank@email.com"
    },
    {
      "id": 4,
      "fullName": "Jeremy Clark",
      "address": "333 miltown manor",
      "phoneNumber": "011-962-111",
      "email": "jeremy.clark@email.com"
    },
    {
      "id": 5,
      "fullName": "Raymond Edwards",
      "address": "99 blue acres",
      "phoneNumber": "3231-962-7516",
      "email": "raymon.edwards@email.com"
    }
  ]
  
const PruebasA = () => {
  
  const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    email: "",
  });
  
  const [editFormData, setEditFormData] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    email: "",
  });

  const [editContactId, setEditContactId] = useState(null);
 console.log(editContactId)
  const handleAddFormChange = (event) => {
    event.preventDefault();
    event.target.reset();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
    console.log(newFormData,"input")
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
   console.log("agregarrrrrrrrrrr")
    const newContact = {
      id:editContactId + 1,
      fullName: addFormData.fullName,
      address: addFormData.address,
      phoneNumber: addFormData.phoneNumber,
      email: addFormData.email,
    };
     console.log(newContact,"Add")
    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
    //event.target.reset();
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    event.target.reset();
    const editedContact = {
      id: editContactId,
      fullName: editFormData.fullName,
      address: editFormData.address,
      phoneNumber: editFormData.phoneNumber,
      email: editFormData.email,
    };
   console.log(editedContact)
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      fullName: contact.fullName,
      address: contact.address,
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
              <th>Name</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <Fragment>
                {editContactId === contact.id ? (
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
      <form onSubmit={handleSubmit}>
        <input

          type="text"
          className="text-black"
          name="fullName"
          required="required"
          placeholder="Enter a name..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          className="text-black"
          name="address"
          required="required"
          placeholder="Enter an addres..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          className="text-black"
          name="phoneNumber"
          required="required"
          placeholder="Enter a phone number..."
          onChange={handleAddFormChange}
        />
        <input
         className="text-black"
          type="email"
          name="email"
          required="required"
          placeholder="Enter an email..."
          onChange={handleAddFormChange}
        />
       <button onClick={handleSubmit} type="submit">Add</button>
      </form>
      
    </div>
  );
};

export default PruebasA;
