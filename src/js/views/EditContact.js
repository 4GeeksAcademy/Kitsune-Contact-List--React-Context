import React, { useState, useContext, useEffect } from 'react';
import { Link, useParams, useNavigate  } from 'react-router-dom';
import { Context } from '../store/appContext';

const EditContact = () => {
    const { store, actions } = useContext(Context);
    const { theid } = useParams(); // Obtener los parámetros de la URL correctamente
    const navigate = useNavigate();


    const [editContact, setEditContact] = useState({
        full_name: store.contact[parseInt(theid)].full_name,
        email: store.contact[parseInt(theid)].email,
        phone: store.contact[parseInt(theid)].phone,
        address: store.contact[parseInt(theid)].address,
        agenda_slug: store.contact[parseInt(theid)].agenda_slug,
        id: store.contact[parseInt(theid)].id
    });
    
    const handleSubmit = (e) => {
        e.preventDefault(); //evita eventos de copy,paste,
        actions.updateContact(editContact);
        (navigate("/")); // returns to contact list

    }

    

    return (
        <>
        
            <div className='content' style={{ padding: "50px" }}>
            <form onSubmit={handleSubmit}>
                <h1 className='tittle' style={{ textAlign: "center" }}><strong>Edit the contact</strong></h1>
                <div className="mb-3"> 
                    <label htmlFor="inputFullname" className="form-label">Full Name</label>
                    <input type="text" className="form-control" id="inputFullname" name="full_name" placeholder="Full Name" 
                        onChange={(e) => setEditContact({ ...editContact, full_name: e.target.value })}
                        value={editContact.full_name}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputEmail" className="form-label">Email</label>
                    <input type="email" className="form-control" id="inputEmail" name="email" rows="3" placeholder="Enter email"
                        onChange={(e) => setEditContact({ ...editContact, email: e.target.value })}
                        value={editContact.email}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputPhone" className="form-label">Phone</label>
                    <input type="text" className="form-control" id="inputPhone" name="phone" rows="3" placeholder="Enter phone"
                        onChange={(e) => setEditContact({ ...editContact, phone: e.target.value })}
                        value={editContact.phone}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputAddress" className="form-label">Address</label>
                    <input type="text" className="form-control" id="inputAddress" rows="3" name="address" placeholder="Enter address"
                        onChange={(e) => setEditContact({ ...editContact, address: e.target.value })}
                        value={editContact.address}
                    />
                </div>
            
                <div className='d-grid gap-2'>
                    <button  className="btn btn-primary" type="submit" >Update</button>
                </div>
                
                
                <Link to={"/"}>
                    <button className='btn buttonContact' type="submit" >Cancel, get back to contacts</button>
                </Link>
                </form>
            </div>
            
        </>
    )
}

export default EditContact;