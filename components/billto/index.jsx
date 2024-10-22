"use client";

import { useState } from "react";

export default function BiilTo() {
  const { filteredUSer, setFilteredUser } = useState([]);
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    setTimeout(() => {
      fetchFilteredUsers(searchQuery);
    }, 500);
  };

  const fetchFilteredUsers = async (searchQuery) => {
    // mock datadan gelen kullanıcı verilerini filtreler
    if (!searchQuery) {
      setFilteredUser([]); // Arama kutusu bossa listeyi temizle
      return;
    }

    try {
      // api cekilcek
      const response = await fetch("/api/users"); // api / client (id)
      const users = await response.json();

      // Kull. adlarına göre filtreleme
      const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setFilteredUser(filtered);
    } catch (error) {
      console.error("Kullanıcı verisi alınırken hata oluştu:", error);
    }
  };

  return (
    <>
      <label for="browser">Listeden tarayıcınızı seçin:</label>
      <input
        list="browsers"
        onKeyUp={handleChange}
        name="browser"
        id="browser"
      />
      <datalist id="users">
        {filteredUSer ? (
          filteredUSer.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))
        ) : (
          <option value="">Kullanıcı bulunamadı</option>
        )}
      </datalist>
    </>
  );
}
