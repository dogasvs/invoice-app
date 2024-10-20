import { useState, useEffect } from "react";
import "../modal.css";
import handleNewAddItem from "../modal-add/index.jsx";
import handleSaveChanges from "../modal-edit/index.jsx";

const EditModal = ({
  isOpen,
  closeModal,
  paymentTerms,
  handlePaymentChange,
  invoiceId,
  invoiceData 
}) => {
  if (!isOpen) return null;

  const [streetAddress, setStreetAddress] = useState(invoiceData?.streetAddress || "");
  const [city, setCity] = useState(invoiceData?.city || "");
  const [postCode, setPostCode] = useState(invoiceData?.postCode || "");
  const [country, setCountry] = useState(invoiceData?.country || "");
  const [clientName, setClientName] = useState(invoiceData?.clientName || "");
  const [clientEmail, setClientEmail] = useState(invoiceData?.clientEmail || "");
  const [clientStreetAddress, setClientStreetAddress] = useState(invoiceData?.clientStreetAddress || "");
  const [clientCity, setClientCity] = useState(invoiceData?.clientCity || "");
  const [clientPostCode, setClientPostCode] = useState(invoiceData?.clientPostCode || "");
  const [clientCountry, setClientCountry] = useState(invoiceData?.clientCountry || "");
  const [invoiceDate, setInvoiceDate] = useState(invoiceData?.invoiceDate || "");
  const [projectDescription, setProjectDescription] = useState(invoiceData?.projectDescription || "");
  const [items, setItems] = useState(invoiceData?.items || []);

  useEffect(() => {
    if (invoiceData) {
      setStreetAddress(invoiceData.streetAddress);
      setCity(invoiceData.city);
      setPostCode(invoiceData.postCode);
      setCountry(invoiceData.country);
      setClientName(invoiceData.clientName);
      setClientEmail(invoiceData.clientEmail);
      setClientStreetAddress(invoiceData.clientStreetAddress);
      setClientCity(invoiceData.clientCity);
      setClientPostCode(invoiceData.clientPostCode);
      setClientCountry(invoiceData.clientCountry);
      setInvoiceDate(invoiceData.invoiceDate);
      setProjectDescription(invoiceData.projectDescription);
    }
  }, [invoiceData]);

  const [errorMessage, setErrorMessage] = useState(null);

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Edit #{invoiceId}</h2>
        {/* error mesajı ekrana gelsin */}
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
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Post Code</label>
              <input
                type="text"
                value={postCode}
                onChange={(e) => setPostCode(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Country</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Bill To Section */}
        <div className="billTo">
          <h3>Bill To</h3>
          <div className="form-group">
            <label>Client's Name</label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
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
              <input
                type="text"
                value={clientCity}
                onChange={(e) => setClientCity(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Post Code</label>
              <input
                type="text"
                value={clientPostCode}
                onChange={(e) => setClientPostCode(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Country</label>
              <input
                type="text"
                value={clientCountry}
                onChange={(e) => setClientCountry(e.target.value)}
              />
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

        {/* Item List Section */}
        <div className="itemListSection">
          <h3>Item List</h3>
          {items.map((item, index) => (
            <div key={item.id} className="item">
              <input
                type="text"
                value={item.name}
                placeholder="Item Name"
                onChange={(e) => handleItemChange(item.id, 'name', e.target.value)}
              />
              <input
                type="number"
                value={item.quantity}
                placeholder="Quantity"
                onChange={(e) => handleItemChange(item.id, 'quantity', parseInt(e.target.value))}
              />
              <input
                type="number"
                value={item.price}
                placeholder="Price"
                onChange={(e) => handleItemChange(item.id, 'price', parseFloat(e.target.value))}
              />
              <span>{(item.quantity * item.price).toFixed(2)}</span>
              <button type="button" onClick={() => handleItemDelete(item.id)}>Sil</button>
            </div>
          ))}
          <button className="addInput" type="button" onClick={handleNewAddItem}>
            + Add New Item
          </button>
        </div>

        <div className="modal-buttons">
          <button type="button" className="cancel-btn" onClick={closeModal}>
            Cancel
          </button>
          <button type="button" className="save-btn" onClick={handleSaveChanges}>
            Save Changes
          </button>
        </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EditModal;
