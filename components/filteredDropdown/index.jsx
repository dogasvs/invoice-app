"use clinet";

export default function FilteredDropdown() {
  return (
    <>
      <div className="dropdown">
        <button className="invoicesFilterInfo">Duruma göre filtrele</button>
        <button className="invoicesFilterRespo">Filtre</button>
        <div className="dropdown-content">
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
