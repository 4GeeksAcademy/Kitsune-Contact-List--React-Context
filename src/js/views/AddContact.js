//FORMULARIO --> ARREGLAR QUE SE PUEDA ALMACENAR INFORMACIÓN

import React, { useState, useContext } from 'react';
import { Link, useActionData } from 'react-router-dom';
import PropTypes from "prop-types";
import { Context } from '../store/appContext';

const AddContact = ( props) => {

    const { store, actions } = useContext(Context);

    const [contact, setContact] = useState ({
        full_name : props.contact ? props.contact.full_name: "" ,
        email: props.contact ? props.contact.email :""  ,
        phone: props.contact ? props.contact.phone :"" ,
        address: props.contact ? props.contact.address : "" ,
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setContact(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

const addContact = () => {
    const newContactData = {
        full_name: contact.full_name,
        email: contact.email,
        phone: contact.phone,
        address: contact.address,
        agenda_slug: "KitsuneDai",
    };

    fetch("https://playground.4geeks.com/apis/fake/contact/", {
        method: "POST",
        body: JSON.stringify(newContactData),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
            if (!response.ok) throw Error(response.statusText);
            return response.json();
          ;
        })
        .then((data) => {
          console.log("POST->", data);
        })
        .catch((err) => {
            console.log(err);
        });
    
}
    
  return (
    < >
        <div className='content' style={{padding: "50px"}}>
        
        <h1 className='tittle' style={{textAlign:"center"}}> <strong>Add a new contact </strong> </h1>
        <div className="mb-3"> 
            <label htmlFor="inputFullname" className="form-label">Full Name</label>
            <input type="text" className="form-control" id="inputFullname"   name="full_name" placeholder="Full Name"
           onChange={handleInputChange}
           value={contact.full_name}
            /> 
        </div>  
        <div className="mb-3">
            <label htmlFor="inputEmail" className="form-label">Email</label>
            <input type="email" className="form-control" id="inputEmail"  name="email" rows="3"  placeholder="Enter email"
                onChange={handleInputChange}
                value={contact.email}

            />
        </div>
        <div className="mb-3">
            <label htmlFor="inputPhone" className="form-label">Phone</label>
            <input type="text" className="form-control" id="inputPhone"  name="phone" rows="3"  placeholder="Enter phone"
                onChange={handleInputChange}
                value={contact.phone}
            /> 
        </div>
        <div className="mb-3">
            <label htmlFor="inputAddress" className="form-label">Address</label>
            <input type="text" className="form-control" id="inputAddress" rows="3"   name="address" placeholder="Enter address"
            onChange={handleInputChange}
            value={contact.address}
            /> 
        </div>

        <Link to={"/"}>
        <div className='d-grid gap-2'>
        <button onClick={addContact} className="  btn btn-primary" type="button">save</button>
 {/* BOTÓN SI addContact estuviera en el flux ---> <button onClick={actions.addcontact()} className="  btn btn-primary" type="button">save</button> */}
        </div>
        </Link>
        

        <Link to={"/"}>
        <button className=' btn buttonContact'>or get back to contacts</button>
        </Link>
    </div>
    </ >
  )
}

AddContact.propTypes = {
	match: PropTypes.object
};


export default AddContact