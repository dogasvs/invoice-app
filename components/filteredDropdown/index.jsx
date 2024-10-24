"use client";

export default function FilteredDropdown({ value, setValue }) {
  function handleCheckbox(e) {
    const result = Number(e.target.value);
    value.includes(result)
      ? setValue(value.filter((x) => x !== result))
      : setValue([...value, result]);
  }

  return (
    <>
      <div className="dropdown">
        <button className="invoicesFilterInfo">Duruma göre filtrele</button>
        <button className="invoicesFilterRespo">Filtre</button>
        <div className="dropdown-content">
          <label htmlFor="pending">
            <input
              id="pending"
              className="cb3"
              type="checkbox"
              value={0}
              onChange={handleCheckbox}
            />
            <p>Askıda</p>
          </label>
          <label htmlFor="unpaid">
            <input
              id="unpaid"
              className="cb3"
              type="checkbox"
              value={2}
              onChange={handleCheckbox}
            />
            <p>Ödenmemiş</p>
          </label>
          <label htmlFor="paid">
            <input
              id="paid"
              className="cb3"
              type="checkbox"
              value={1}
              onChange={handleCheckbox}
            />
            <p>Ödenmiş</p>
          </label>
        </div>
      </div>
    </>
  );
}
