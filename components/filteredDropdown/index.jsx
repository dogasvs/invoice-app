"use clinet";

import { useState } from "react";

export default function FilteredDropdown() {
  const [selectedStatus, setSelectedStatus] = useState(null);

  return (
    <>
      <div className="dropdown">
        <button className="dropbtn">Duruma göre filtrele</button>
        <div class="dropdown-content">
          <label htmlFor="">
            <input className="cb3" type="checkbox" value="draft" />
            <p>Askıda</p>
          </label>
          <label htmlFor="">
            <input className="cb3" type="checkbox" value="pending" />
            <p>Ödenmemiş</p>
          </label>
          <label htmlFor="">
            <input className="cb3" type="checkbox" value="paid" />
            <p>Ödenmiş</p>
          </label>
        </div>
      </div>
    </>
  );
}
