import React, { useState, useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Context } from '../store/appContext';

const EditContact = () => {
    const { store, actions } = useContext(Context);
    const { theid } = useParams(); // Obtener los parámetros de la URL correctamente
    
    const [editContact, setEditContact] = useState({
        full_name: store.contact[theid].full_name,
        email: store.contact[theid].email,
        phone: store.contact[theid].phone,
        address: store.contact[theid].address
    });

    // Realizar la llamada a la API para obtener la información del contacto    GET: /apis/fake/contact/{contact_id}
    useEffect(() => {
        fetch(`https://playground.4geeks.com/apis/fake/contact/${theid}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch contact');
                }
                return response.json();
            })
            .then(data => {
                // Al recibir los datos del contacto, actualizar el estado del formulario
                setEditContact(data);
            })
            .catch(error => {
                console.error('Error fetching contact:', error);
            });
    }, [theid]); // Se ejecuta cuando cambia "theid"

    return (
        <>
            <div className='content' style={{ padding: "50px" }}>
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
                    <button onClick={() => actions.updateContact(editContact)} className="btn btn-primary" type="button">Save</button>
                </div>

                <Link to={"/"}>
                    <button className='btn buttonContact'>Get back to contacts</button>
                </Link>
            </div>
        </>
    )
}

export default EditContact;