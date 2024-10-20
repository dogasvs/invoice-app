import { useState, useEffect } from "react";
import "../modal.css";
import handleNewAddItem from "../modal-add/index.jsx";
import handleSaveChanges from "../modal-edit/index.jsx";
import { updateInvoiceData } from "@/app/actions/serverActions"; 
import Trash from "@/svgs/trash";

const EditModal = ({
  isOpen,
  closeModal,
  invoiceId,
  invoiceData,
}) => {
  const [formData, setFormData] = useState({
    streetAddress: "",
    city: "",
    postCode: "",
    country: "",
    clientName: "",
    clientEmail: "",
    clientStreetAddress: "",
    clientCity: "",
    clientPostCode: "",
    clientCountry: "",
    invoiceDate: "",
    projectDescription: "",
    paymentTerms: "Net 30 Days",
    items: [],
  });

  const [newItem, setNewItem] = useState({
    itemName: "",
    quantity: 1,
    price: 0,
  });

  const [showNewItemForm, setShowNewItemForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (invoiceData) {
      setFormData({ ...invoiceData, items: invoiceData.items || [] });
    }
  }, [invoiceData]);

  const handleAddNewItem = () => {
    if (!newItem.itemName || newItem.quantity <= 0 || newItem.price <= 0) {
      setErrorMessage("Geçerli bir öğe ekleyin.");
      return;
    }

    const total = newItem.quantity * newItem.price;
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        { name: newItem.itemName, quantity: newItem.quantity, price: newItem.price, total },
      ],
    });

    setNewItem({ itemName: "", quantity: 1, price: 0 });
    setErrorMessage(null);
  };

  const handleDeleteItem = (index) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: updatedItems });
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    try {
      await updateInvoiceData(invoiceId, formData);
      closeModal();
    } catch (error) {
      console.error("Fatura güncellenirken hata:", error);
      setErrorMessage("Fatura güncellenirken bir hata oluştu.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleItemChange = (id, field, value) => {
    const updatedItems = formData.items.map((item, index) =>
      index === id ? { ...item, [field]: value } : item
    );
    setFormData({ ...formData, items: updatedItems });
  };

  return isOpen ? (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Edit #{invoiceId}</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {/* Fatura Kaynağı */}
        <div className="billFrom">
          <h3>Bill From</h3>
          <div className="form-group">
            <label>Street Address</label>
            <input
              type="text"
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Post Code</label>
              <input
                type="text"
                name="postCode"
                value={formData.postCode}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
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
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Client's Email</label>
            <input
              type="email"
              name="clientEmail"
              value={formData.clientEmail}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Street Address</label>
            <input
              type="text"
              name="clientStreetAddress"
              value={formData.clientStreetAddress}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="clientCity"
                value={formData.clientCity}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Post Code</label>
              <input
                type="text"
                name="clientPostCode"
                value={formData.clientPostCode}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Country</label>
              <input
                type="text"
                name="clientCountry"
                value={formData.clientCountry}
                onChange={handleChange}
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
                name="invoiceDate"
                value={formData.invoiceDate}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Payment Terms</label>
              <div className="custom-select">
                <div className="selected-option">
                  {formData.paymentTerms}
                  <span className="arrow">⌄</span>
                </div>
                <ul className="options">
                  <li onClick={() => setFormData({ ...formData, paymentTerms: "Net 1 Day" })}>
                    Net 1 Day
                  </li>
                  <li onClick={() => setFormData({ ...formData, paymentTerms: "Net 7 Days" })}>
                    Net 7 Days
                  </li>
                  <li onClick={() => setFormData({ ...formData, paymentTerms: "Net 14 Days" })}>
                    Net 14 Days
                  </li>
                  <li onClick={() => setFormData({ ...formData, paymentTerms: "Net 30 Days" })}>
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
              name="projectDescription"
              value={formData.projectDescription}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Item List Section */}
        <div className="itemListSection">
          <h3>Item List</h3>
          {formData.items.map((item, index) => (
            <div key={index} className="item">
              <input
                type="text"
                value={item.name}
                placeholder="Item Name"
                onChange={(e) => handleItemChange(index, 'name', e.target.value)}
              />
              <input
                type="number"
                value={item.quantity}
                placeholder="Quantity"
                onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
              />
              <input
                type="number"
                value={item.price}
                placeholder="Price"
                onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value))}
              />
              <span>{(item.quantity * item.price).toFixed(2)}</span>
              <button className="trash" type="button" onClick={() => handleItemDelete(item.id)}> <Trash /> </button>
              <button className="trash"  type="button" onClick={() => handleDeleteItem(index)}> <Trash /> </button>
            </div>
          ))}
          {/* Yeni öğe ekleme formu */}
          {showNewItemForm && (
            <div className="item">
              <input
                type="text"
                name="itemName"
                value={newItem.itemName}
                onChange={(e) => setNewItem({ ...newItem, itemName: e.target.value })}
                placeholder="Öğe Adı"
              />
              <input
                type="number"
                name="quantity"
                value={newItem.quantity}
                onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) })}
                placeholder="Adet"
              />
              <input
                type="number"
                name="price"
                value={newItem.price}
                onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
                placeholder="Fiyat"
              />
              <button className="addInput" type="button" onClick={handleAddNewItem}>
                + Add New Item
              </button>
            </div>
          )}

          {/* Formu göstermek için düğme */}
          {!showNewItemForm && (
            <button className="addInput" type="button" onClick={() => setShowNewItemForm(true)}>
              + Add New Item
            </button>
          )}
        </div>
        {/* Modal Buttons */}
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
  ) : null;
};

export default EditModal;
