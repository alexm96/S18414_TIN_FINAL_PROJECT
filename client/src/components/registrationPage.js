// registration page needs email, name , lastname, location details, password
import React, { useState } from 'react';
const GeneralInput=(props)=>{
    return (
        <input className= "input-field" type={props.type ? props.type : "text" } name={props.name} placeholder={props.placeholder} required={true} onChange={props.updateFunction}></input>
    )
}
const  RegistrationPage=()=> {
    const generateEmptyFields=()=>{
        return {
            "f_name":"",
            "l_name":"",
            "email":"",
            "address_line1":"",
            "address_line2":"",
            "country":"",
            "postal_code":"",
            "username":"",
            "password":""
        }
    }
    
    const [registrationFields,setRegistrationFields]=useState(generateEmptyFields())
    const onUpdate=(event)=>{
        const keyItem=event.target.name;
        const value = event.target.value;
        const newFormData ={...registrationFields,[keyItem]:value}
        setRegistrationFields(newFormData)
        
    }
    const onClick=(event)=>{
        //post to endpoint here 
        event.preventDefault();
        console.log(registrationFields)
    }
    return (
      <div className="typical-form">
          <form>
              <GeneralInput name="f_name" placeholder="Your first name" updateFunction={onUpdate} ></GeneralInput>
              <GeneralInput name="l_name" placeholder="Your last name" updateFunction={onUpdate}></GeneralInput>
              <GeneralInput name="email" placeholder="Your email name" type="email" updateFunction={onUpdate}></GeneralInput>
              <GeneralInput name="address_line1" placeholder="Address line 1" updateFunction={onUpdate}></GeneralInput>
              <GeneralInput name="address_line2" placeholder="Address line 2" updateFunction={onUpdate}></GeneralInput>
              <GeneralInput name="country" placeholder="Country" updateFunction={onUpdate}></GeneralInput>
              <GeneralInput name="postal_code" placeholder="postal code" updateFunction={onUpdate}></GeneralInput>
              <GeneralInput name="city" placeholder="city" updateFunction={onUpdate}></GeneralInput>
              <GeneralInput name="username" placeholder="username" updateFunction={onUpdate}></GeneralInput>
              <GeneralInput name="password" placeholder="some super secure password" updateFunction={onUpdate}></GeneralInput>
            <button value="Submit details"  onClick={onClick}></button>
          </form>
      </div>
    );
  }
  export {RegistrationPage}