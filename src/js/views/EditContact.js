 //FORMULARIO --> ARREGLAR QUE SE PUEDA EDITAR INFORMACIÓN


import React, { useState, useContext } from 'react';
import { Link, useParams, } from 'react-router-dom';
import { Context } from '../store/appContext';
 


const EditContact = ()=> {
    const { store, actions } = useContext(Context);
    const { theid } = useParams();
   

    // Buscamos el contacto que queremos editar usando el ID proporcionado en los parámetros de la URL
    const contact = store.contact.find(contact => contact.id === parseInt(theid));
    
    // Si el contacto no se encuentra, mostramos un mensaje de error
    if (!contact) {
        return <p>Contacto no encontrado</p>;
    }

    // Inicializamos el estado del formulario con la información del contacto a editar
    const [editContact, setEditContact] = useState({ ...contact });

    // Función para manejar el evento de guardar los cambios en el contacto
    const handleSubmit = () => {
        // Llamamos a la acción para actualizar el contacto
        actions.updateContact(editContact);
        // Redireccionamos al usuario de vuelta a la página principal después de guardar los cambios
        
    };



    return (
        <>
      
        <div className='content' style={{padding: "50px"}}>
        
        <h1 className='tittle' style={{textAlign:"center"}}> <strong>Edit the contact </strong> </h1>
        <div className="mb-3"> 
            <label htmlFor="inputFullname" className="form-label">{store.contact[params.theid].full_name}</label>
            <input type="text" className="form-control" id="inputFullname"   name="full_name" placeholder="Full Name"
           onChange={(e)=>setEditContact({...editContact, full_name: e.target.value})}
           value={editContact.full_name}
            /> 
        </div>  
        <div className="mb-3">
            <label htmlFor="inputEmail" className="form-label">{store.contact[params.theid].email}</label>
            <input type="email" className="form-control" id="inputEmail"  name="email" rows="3"  placeholder="Enter email"
                onChange={(e)=>setEditContact({...editContact, email: e.target.value})}
                value={editContact.email}

            />
        </div>
        <div className="mb-3">
            <label htmlFor="inputPhone" className="form-label">{store.contact[params.theid].phone}</label>
            <input type="text" className="form-control" id="inputPhone"  name="phone" rows="3"  placeholder="Enter phone"
                onChange={(e)=>setEditContact({...editContact, phone: e.target.value})}
                value={editContact.phone}
            /> 
        </div>
        <div className="mb-3">
            <label htmlFor="inputAddress" className="form-label">{store.contact[params.theid].address}</label>
            <input type="text" className="form-control" id="inputAddress" rows="3"   name="address" placeholder="Enter address"
            onChange={(e)=>setEditContact({...editContact, address: e.target.value})}
            value={editContact.address}
            /> 
        </div>

      
        <div className='d-grid gap-2'>
        <button onClick={handleSubmit} className="  btn btn-primary" type="button">save</button>
        </div>
        

        <Link to={"/"}>
        <button className=' btn buttonContact'>get back to contacts</button>
        </Link>
    </div>
    </ >
  )
}


export default EditContact