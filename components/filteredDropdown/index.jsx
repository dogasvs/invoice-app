export default function FilteredDropdown() {
  return (
    <>
      <div className="dropdown">
        <button className="invoicesFilterInfo">Duruma göre filtrele</button>
        <button className="invoicesFilterRespo">Filtre</button>
        <div className="dropdown-content">
          <label htmlFor="">
            <input  className="cb3" type="checkbox" />
            <p>Draft</p>
          </label>
          <label htmlFor="">
            <input className="cb3" type="checkbox" />
            <p>Pending</p>
          </label>
          <label htmlFor="">
            <input className="cb3" type="checkbox" />
            <p>Paid</p>
          </label>
        </div>
      </div>
    </>
  );
}
