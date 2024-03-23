import "./css/user.css"
import { useNavigate } from "react-router-dom";
import {useState} from 'react';
function Userportal(props){
    const[tvis,setTvis]=useState('hidden');
    const nav=useNavigate();
    return(
        <>
        <nav>
            <center><h1>Welcome....{props.name}</h1></center>
        <div className="profile">profile
        <div className="profile-details">Name:{props.name}</div>
        <div className="profile-details">Email:{props.email}</div>
        <div className="profile-details">Phone:{props.phone}</div>
        <div className="profile-details">Address:{props.add}</div>
        <div className="profile-details">Customer ID:{props.id}</div>
        <div  className="profile-details" onClick={()=>{nav('/')}}>Logout</div>
        </div>
        </nav>
        <section className="book-ticket">
            <div onClick={()=>setTvis('visible')}><center>Book Ticket</center></div>
        </section>
        <section className="user-content">
            <div style={{"flex-grow":"1"}}>1st</div>
            <div style={{"flex-grow":"3","display":"flex","justify-content":"center"}} >2nd
                <div class="ticket-entry" style={{"visibility":tvis}}>
                    ticket entry
                </div>
            
            </div>
            <div style={{"flex-grow":"1"}}>3rd</div>
        </section>
        </>
    )
}
export default Userportal;