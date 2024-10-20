import { useState } from "react";
import "../modal.css";

const EditModal = ({
  isOpen,
  closeModal,
  paymentTerms,
  handlePaymentChange,
}) => {
  if (!isOpen) return null;
  const [addNewInput, setAddNewInput] = useState([]);
  const handleNewAddItem = () => {
    setAddNewInput([
      ...addNewInput,
      {
        id: crypto.randomUUID(),
        itemName: { inputType: "text", placeholder: "Add new Item" },
        quantity: { inputType: "number", placeholder: "0" },
        price: { inputType: "text", placeholder: "0.00" },
        total: { inputType: "text", placeholder: "400.00" },
      },
    ]);
  };
  function itemDelete(sil) {
    setAddNewInput(addNewInput.filter((x) => x.id !== sil));
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Edit #{invoiceId}</h2>
        {/*error mesajı ekrana gelsin */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="billFrom">
          <h3>Bill From</h3>
          <div className="form-group">
            <label>Street Address</label>
            <input
              type="text"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>City</label>
              <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Post Code</label>
              <input type="text" value={postCode} onChange={(e) => setPostCode(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Country</label>
              <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
            </div>
          </div>
        </div>

        {/* Bill To Section */}
        <div className="billTo">
          <h3>Bill To</h3>
          <div className="form-group">
            <label>Client's Name</label>
            <input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Client's Email</label>
            <input
              type="email"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Street Address</label>
            <input
              type="text"
              value={clientStreetAddress}
              onChange={(e) => setClientStreetAddress(e.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>City</label>
              <input type="text" value={clientCity} onChange={(e) => setClientCity(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Post Code</label>
              <input
                type="text"
                value={clientPostCode}
                onChange={(e) => setClientPostCode(e.target.value)}
              />            </div>
            <div className="form-group">
              <label>Country</label>
              <input type="text" value={clientCountry} onChange={(e) => setClientCountry(e.target.value)} />
            </div>
          </div>
        </div>

        {/* Invoice Date Section */}
        <div className="invoiceDateSection">
          <div className="form-row">
            <div className="form-group">
              <label>Invoice Date</label>
              <input
                type="date"
                value={invoiceDate}
                onChange={(e) => setInvoiceDate(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Payment Terms</label>
              <div className="custom-select">
                <div className="selected-option">
                  {paymentTerms}
                  <span className="arrow">⌄</span>
                </div>
                <ul className="options">
                  <li onClick={() => handlePaymentChange("Net 1 Day")}>
                    Net 1 Day
                  </li>
                  <hr />
                  <li onClick={() => handlePaymentChange("Net 7 Days")}>
                    Net 7 Days
                  </li>
                  <hr />
                  <li onClick={() => handlePaymentChange("Net 14 Days")}>
                    Net 14 Days
                  </li>
                  <hr />
                  <li onClick={() => handlePaymentChange("Net 30 Days")}>
                    Net 30 Days
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label>Project Description</label>
            <input
              type="text"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
            />
          </div>
        </div>

        {/* Item List Section */}
        <div className="itemListSection">
          <h3>Öğe Listesi</h3>
          <div className="item">
            <input type="text" defaultValue="Banner Design" />
            <input type="number" defaultValue="1" />
            <input type="number" defaultValue="156.00" />
            <span>156.00</span>
          </div>
          <div className="item">
            <input type="text" defaultValue="Email Design" />
            <input type="number" defaultValue="2" />
            <input type="number" defaultValue="200.00" />
            <span>400.00</span>
          </div>
          <button className="addInput" type="button" onClick={handleNewAddItem}>
            + Yeni Ekle
          </button>
          {addNewInput.map((input, index) => (
            <div key={index} className="item">
              <input
                type={input.itemName.inputType}
                placeholder={input.itemName.placeholder}
              />
              <input
                type={input.quantity.inputType}
                placeholder={input.quantity.placeholder}
              />
              <input
                type={input.price.inputType}
                placeholder={input.price.placeholder}
              />
              <span>{input.total.placeholder}</span>

              <button type="button" onClick={() => itemDelete(input.id)}>
                sil
              </button>
            </div>
          ))}
        </div>


        <div className="modal-buttons">
          <button type="button" className="cancel-btn" onClick={closeModal}>
            Cancel
          </button>
          <button type="submit" className="save-btn">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
