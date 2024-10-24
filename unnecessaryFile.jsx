//FURKAN HOCANIN KODU

// form.jsx

"use client";

import { searchUser } from "@/action";
import React, { useEffect } from "react";

export default function Form({ currentUser }){
    const [searchedUsers, setSearchedUsers] = React.useState([]);
    const [selectedUser, setSelectedUser] = React.useState(null);

    const handleInput = async (e) => {
        
        if(e.target.value.length > 2){
            const response = await searchUser(e.target.value);
            
            if(Array.isArray(response)){
                setSearchedUsers(response);
            }
        }
    };

    const handleFocusOut = (e) => {
        const user = searchedUsers.find(user => user.mail === e.target.value);
        setSelectedUser(user);
    };

    useEffect(() => {
        console.log(searchedUsers);
        
    }, [searchedUsers])

    return (
        <form action="">
            <input type="text" name="street" defaultValue={currentUser.street} /> <br />
            <input type="text" name="city" defaultValue={currentUser.city} /> <br />
            <input type="text" name="country" defaultValue={currentUser.country} /> <br />
            <input type="text" name="postalCode" defaultValue={currentUser.postCode} /> <br />

            <div id="billTO">
                <label htmlFor="clients">Müşteri Adı:</label>
                <input
                    onKeyDown={handleInput}
                    onBlur={handleFocusOut}
                    list="clientsa"
                    id="clients"
                    name="clients"
                />

                <datalist id="clientsa">
                    {searchedUsers.map((user, index) => (
                        <option key={index} value={user.mail} />
                    ))}
                </datalist>
                <br />

                <input type="text" name="billToEmail" defaultValue={selectedUser?.mail} /> <br />
                <input type="text" name="billToStreet" defaultValue={selectedUser?.street} /> <br />
                <input type="text" name="billToCity" defaultValue={selectedUser?.city} /> <br />
                <input type="text" name="billToCountry" defaultValue={selectedUser?.country} /> <br />
                <input type="text" name="billToPostCode" defaultValue={selectedUser?.postCode} /> <br />
            </div>
            <button>gönder</button>
        </form>
    );
}
"use client";

import { searchUser } from "@/action";
import React, { useEffect } from "react";

export default function Form({ currentUser }){
    const [searchedUsers, setSearchedUsers] = React.useState([]);
    const [selectedUser, setSelectedUser] = React.useState(null);

    const handleInput = async (e) => {
        
        if(e.target.value.length > 2){
            const response = await searchUser(e.target.value);
            
            if(Array.isArray(response)){
                setSearchedUsers(response);
            }
        }
    };

    const handleFocusOut = (e) => {
        const user = searchedUsers.find(user => user.mail === e.target.value);
        setSelectedUser(user);
    };

    useEffect(() => {
        console.log(searchedUsers);
        
    }, [searchedUsers])

    return (
        <form action="">
            <input type="text" name="street" defaultValue={currentUser.street} /> <br />
            <input type="text" name="city" defaultValue={currentUser.city} /> <br />
            <input type="text" name="country" defaultValue={currentUser.country} /> <br />
            <input type="text" name="postalCode" defaultValue={currentUser.postCode} /> <br />

            <div id="billTO">
                <label htmlFor="clients">Müşteri Adı:</label>
                <input
                    onKeyDown={handleInput}
                    onBlur={handleFocusOut}
                    list="clientsa"
                    id="clients"
                    name="clients"
                />

                <datalist id="clientsa">
                    {searchedUsers.map((user, index) => (
                        <option key={index} value={user.mail} />
                    ))}
                </datalist>
                <br />

                <input type="text" name="billToEmail" defaultValue={selectedUser?.mail} /> <br />
                <input type="text" name="billToStreet" defaultValue={selectedUser?.street} /> <br />
                <input type="text" name="billToCity" defaultValue={selectedUser?.city} /> <br />
                <input type="text" name="billToCountry" defaultValue={selectedUser?.country} /> <br />
                <input type="text" name="billToPostCode" defaultValue={selectedUser?.postCode} /> <br />
            </div>
            <button>gönder</button>
        </form>
    );
}



// action.js


"use server"

export async function searchUser(name){
    const response = await fetch("", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name
        })
    })
    return await response.json();
}