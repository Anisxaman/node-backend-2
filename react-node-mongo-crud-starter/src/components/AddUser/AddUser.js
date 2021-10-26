// create post
// url: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch



import React, { useRef } from 'react';

const AddUser = () => {
    const nameRef=useRef();
    const emailRef=useRef();
const handleAddUser=e=>{
    e.preventDefault();
    const name=nameRef.current.value;
    const email=emailRef.current.value;

    const newUser={
        name:name,
        email:email
    }
    fetch("http://localhost:5000/users",{
        method:"post",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)

    })
    .then(res=>res.json())
    .then(data=>{
        if(data.insertedId){
            alert("users added successfully")
            e.target.reset();
        }
    })









}


    return (
        <div>
            <h2>This is Add User</h2>
            <form onSubmit={handleAddUser}>
                <input type="text" ref={nameRef}></input>
                <input type="email" ref={emailRef}></input>
                <input type="submit" value="Add" />



            </form>
        </div>
    );
};

export default AddUser;