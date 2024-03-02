// UN SOLO CONTACTO

//NECESARIOS
import React, {useState, useContext, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import { Context } from "../store/appContext";

//ICONOS
import { IoLocationSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa";

const ContactCard = () => {
    const {store, action} = useContext(Context)
    const params = useParams();

    return(
    <>
      <div className="contactCard " style={{marginLeft: "50px"}} > 
        <div className="cardInfo d-flex" style={{border: "4px solid grey", width: "1200px", marginTop:"20px"}} >
        <img src="https://i.pinimg.com/236x/60/8a/7d/608a7d2de0cf6898c3869b116c4231be.jpg" className="card-img-top" alt="img contact" style={{margin: "10px"}}/>
        <div className="card-body" >
            <div className="card-tittle d-flex">
              <h5>{store.contact[params.theid].full_name}</h5>              
            </div>
        
          
            <div className="card-text d-flex">
                <div className='icons_contact'> 
                  <IoLocationSharp /><br/>
                  <FaPhone /><br/>
                  <MdEmail /> 
                </div>
                <div className='info_contact'>
                  <span style={{fontSize: "medium "}}>  {store.contact[params.theid].address} </span><br/>
                  <span style={{fontSize: "small "}}>  {store.contact[params.theid].phone} </span><br/>
                  <span style={{fontSize: "x-small "}}> {store.contact[params.theid].email} </span>
                </div>
            </div>
        </div>
        </div>
      
                <Link to={"/"}>
                    <button className=' btn buttonContact'>get back to contacts</button>
                </Link>
      </div>
    </>
)

}

export default ContactCard