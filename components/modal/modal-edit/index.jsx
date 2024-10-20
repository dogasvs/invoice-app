'use client';
import { useState } from 'react';
import '../modal.css';
import { advancedFetch } from '@/utils/fetch';

const EditModal = ({ isOpen, closeModal, paymentTerms, handlePaymentChange, onSave, invoiceId }) => {
  if (!isOpen) return null;

  const [streetAddress, setStreetAddress] = useState("19 Union Terrace");
  const [city, setCity] = useState("London");
  const [postCode, setPostCode] = useState("E1 3EZ");
  const [country, setCountry] = useState("United Kingdom");
  const [clientName, setClientName] = useState("Alex Grim");
  const [clientEmail, setClientEmail] = useState("alexgrim@mail.com");
  const [clientStreetAddress, setClientStreetAddress] = useState("84 Church Way");
  const [clientCity, setClientCity] = useState("Bradford");
  const [clientPostCode, setClientPostCode] = useState("BD1 9PB");
  const [clientCountry, setClientCountry] = useState("United Kingdom");
  const [invoiceDate, setInvoiceDate] = useState("2021-08-21");
  const [projectDescription, setProjectDescription] = useState("Graphic Design");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [items, setItems] = useState([
    { name: 'Banner Design', quantity: 1, price: 156.00 },
    { name: 'Email Design', quantity: 2, price: 200.00 },
  ]);

  const handleAddNewItem = () => {
    setItems([...items, { name: '', quantity: 1, price: 0 }]); // Varsayılan boş bir öğe ekle
  };

  const handleItemChange = (index, field, value) => {
    const newItems = items.map((item, i) => {
      if (i === index) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setItems(newItems);
  };

  const handleSaveChanges = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    const updatedData = {
      streetAddress,
      city,
      postCode,
      country,
      clientName,
      clientEmail,
      clientStreetAddress,
      clientCity,
      clientPostCode,
      clientCountry,
      invoiceDate,
      paymentTerms,
      projectDescription,
      items,
    };

    try {
      const response = await advancedFetch(`/api/invoices/${invoiceId}`, 'PUT', updatedData);
      onSave(updatedData);
      closeModal();
    } catch (error) {
      setErrorMessage('Değişiklikler kaydedilemedi: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };


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
                <div className="selected-option">{paymentTerms}
                  <span className="arrow">⌄</span>

                </div>
                <ul className="options">
                  <li onClick={() => handlePaymentChange('Net 1 Day')}>Net 1 Day</li>
                  <hr />
                  <li onClick={() => handlePaymentChange('Net 7 Days')}>Net 7 Days</li>
                  <hr />
                  <li onClick={() => handlePaymentChange('Net 14 Days')}>Net 14 Days</li>
                  <hr />
                  <li onClick={() => handlePaymentChange('Net 30 Days')}>Net 30 Days</li>
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
          <h3>Item List</h3>
          {items.map((item, index) => (
            <div className="item" key={index}>
              <input
                type="text"
                value={item.name}
                onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                placeholder="Item Name"
              />
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
                placeholder="Quantity"
              />
              <input
                type="number"
                value={item.price}
                onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value))}
                placeholder="Price"
              />
              <span>{(item.quantity * item.price).toFixed(2)}</span>
            </div>
          ))}
          <button className="add-item-btn" onClick={handleAddNewItem}>+ Add New Item</button>
        </div>


        <div className="modal-buttons">
          <button type="button" className="cancel-btn" onClick={closeModal}>Cancel</button>
          <button
            type="submit"
            className="save-btn"
            onClick={handleSaveChanges}
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};


export default EditModal;
