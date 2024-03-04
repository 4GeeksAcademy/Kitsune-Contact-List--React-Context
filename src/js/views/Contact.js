//LISTA CONTACTOS

//NECESARIOS
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";


//ICONOS
import { IoLocationSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { IoTrashSharp } from "react-icons/io5";

import "../../styles/cards.css";


const Contact = () => {

  const { store, actions } = useContext(Context);


  return (
    < >

{/* Card */}

        <div className="container " style={{paddingTop: "10px"}}>

{/* Button add contacto*/}
    <div className='d-grid gap-2 d-md-flex justify-content-md-end'style={{ marginBottom: "15px"}}>
          <Link to={"/new-contact"}>
          <button type="button" className="btn btn-success " >Add new contact</button>
          </Link>
        </div>

          <ul className="list-group">
            {store.contact.map((item, index)=>{
              return (
               
              <li key={item.id}
                
                className="list-group-item  d-flex justify-content-between">
                
                    <div className='container card-button' >
                      <div className="cardInfo d-flex" >
                      <Link to={"/" + index}>
                      <img src="https://i.pinimg.com/236x/60/8a/7d/608a7d2de0cf6898c3869b116c4231be.jpg" className="card-img-top" alt="img contact" style={{margin: "10px"}}/>
                      </Link>
                      <div className="card-body" >
                        <div className="card-tittle d-flex">
                          <h5>{item.full_name}</h5>
                          <div className='icons'>
                          <FaPencil style={{marginRight: "30px"}}/>
                          <IoTrashSharp onClick={() => actions.deleteContact(item.id)}/>
                          </div>
                        </div>  
                        
                        <div className="card-text d-flex" style={{textAlign: "left"}}>
                          <div className='icons_contact' style={{paddingRight:" 15px"}} > 
                            <IoLocationSharp /><br/>
                            <FaPhone /><br/>
                            <MdEmail /> 
                          </div>
                          <div className='info_contact'>
                            <span style={{fontSize: "medium "}}>  {item.address} </span><br/>
                            <span style={{fontSize: "small "}}>  {item.phone} </span><br/>
                            <span style={{fontSize: "x-small "}}> {item.email} </span>
                            </div>
                        </div>
                      </div>
                     </div>
                    </div>
                </li>
            
              );
            })}
          </ul>
        </div>

    </>
  )
}



export default Contact