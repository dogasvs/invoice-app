"use client";

import { useEffect, useState } from "react";

export default function BiilToForm() {
  const { searchedUsers, setSearchedUsers } = useState([]);
  const [query, setQuery] = useState(""); // arama sorgusu icin

  const handleInput = async (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);
    if (searchQuery.length > 3) {
      const response = await searchedUsers(searchQuery);
      if (Array.isArray(response)) {
        console.log("test");

        setSearchedUsers(response);
      }
    }
    // setTimeout(() => {
    //   fetchFilteredUsers(searchQuery);
    // }, 500);
  };

  // const fetchFilteredUsers = async (searchQuery) => {
  //   // mock datadan gelen kullanıcı verilerini filtreler
  //   if (!searchQuery) {
  //     setFilteredUser([]); // Arama kutusu bossa listeyi temizle
  //     return;
  //   }

  //   try {
  //     // api cekilcek
  //     const response = await fetch(`/api/client${id}`); // api / client (id)
  //     const users = await response.json();

  //     // Kull. adlarına göre filtreleme
  //     const filtered = users.filter((user) =>
  //       user.name.toLowerCase().includes(searchQuery.toLowerCase())
  //     );

  //     setFilteredUser(filtered);
  //   } catch (error) {
  //     console.error("Kullanıcı verisi alınırken hata oluştu:", error);
  //   }
  // };

  const handleFocusOut = (e) => {
    const user = searchedUsers.find((user) => user.email === e.target.value);
    console.log(user);
  };

  useEffect(() => {});

  return (
    <>
      <form action="">
        <input
          onInput={handleInput}
          defaultValue={currentUser.name}
          onChange={handleFocusOut}
          list="clients"
          name="clients"
          id="clients"
        />
        <datalist id="users">
          {searchedUsers.map((user, index) => (
            <option key={index} value={user.id}>
              {user.name}
            </option>
          ))}
        </datalist>
      </form>
    </>
  );
}
