import React, { useEffect, useState } from 'react';

const Users = () => {
    const [users,setusers]=useState([]);


    useEffect(() => {
        fetch("http://localhost:5000/users")
        .then(res=>res.json())
        .then(data=>setusers(data));
        
    }, [])

    //delete an user
    const handledeleteuser=id=>{
        const url=`http://localhost:5000/users/${id}`;
        fetch(url,{
            method:"DELETE"
        })

        .then(res=>res.json())
        .then(data=>{
            if(data.deletedCount>0){
                alert("SuccessFully")


                const remainingUsers=users.filter(user=>user._id !==id)
                setusers(remainingUsers)
            }
        })


    }
    return (
        <div>
            <h2> Users Available{users.length}</h2>

            <ul>
                {
                    users.map(user=><li
                    key={user._id}
                    
                    > <button>update</button>{user.name}::{user.email} <button onClick={()=>handledeleteuser(user._id)}>x</button></li>)
                   
                }
            </ul>
        </div>
    );
};

export default Users;