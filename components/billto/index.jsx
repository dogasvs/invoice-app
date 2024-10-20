"use client";

import { useState } from "react";

export default function BiilTo() {
  const { filteredUSer, setFilteredUser } = useState([]);
  const handleChange = (e) => {
    setTimeout(() => {
      setFilteredUser();
    }, 500);
  };

  // api / client (id)

  return (
    <>
      <label for="browser">Choose your browser from the list:</label>
      <input
        list="browsers"
        onKeyUp={handleChange}
        name="browser"
        id="browser"
      />
      <datalist id="users">
        {filteredUSer.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </datalist>
    </>
  );
}
