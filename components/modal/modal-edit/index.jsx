"use client";

import { useState, useEffect } from "react";
import { handleAddNewItem, handleSaveInvoice } from "../modal-add/index.jsx";
import { updateInvoiceData } from "@/app/actions/serverActions";
import Trash from "@/svgs/trash";
import "../modal.css"

const EditModal = ({
  isOpen,
  closeModal,
  invoiceId,
  invoiceData,
}) => {
  const [formData, setFormData] = useState({
    billFrom: {
      streetAddress: "",
      city: "",
      postCode: "",
      country: "",
    },
    billTo: {
      name: "",
      email: "",
      address: "",
      city: "",
      postCode: "",
      country: "",
    },
    invoiceDate: "",
    projectDescription: "",
    paymentTerm: 30,
    status: 0,
    items: [],
  });

  const [newItem, setNewItem] = useState({
    name: "",
    quantity: 1,
    price: 0,
  });

  const [showPaymentOptions, setShowPaymentOptions] = useState(false);

  const [showNewItemForm, setShowNewItemForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (invoiceData) {
      setFormData({
        billFrom: invoiceData.billFrom || {
          streetAddress: "",
          city: "",
          postCode: "",
          country: "",
        },
        billTo: invoiceData.billTo || {
          name: "",
          email: "",
          address: "",
          city: "",
          postCode: "",
          country: "",
        },
        invoiceDate: invoiceData.invoiceDate ? invoiceData.invoiceDate.split('T')[0] : "",
        projectDescription: invoiceData.projectDescription || "",
        paymentTerm: invoiceData.paymentTerm || 30,
        status: invoiceData.status || 0,
        items: invoiceData.items || [],
      });
    }
  }, [invoiceData]);

  const onSaveChanges = (e) => {
    handleSaveInvoice(e, invoiceId, formData, updateInvoiceData, closeModal, setErrorMessage, onSaveChanges);
  };

  const onAddNewItem = () => {
    handleAddNewItem(newItem, formData, setFormData, setNewItem, setErrorMessage, setShowNewItemForm);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("billFrom.")) {
      const field = name.split(".")[1];
      setFormData({
        ...formData,
        billFrom: {
          ...formData.billFrom,
          [field]: value,
        },
      });
    } else if (name.startsWith("billTo.")) {
      const field = name.split(".")[1];
      setFormData({
        ...formData,
        billTo: {
          ...formData.billTo,
          [field]: value,
        },
      });
    } else if (name === "paymentTerm") {
      setFormData({
        ...formData,
        paymentTerm: Number(value),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleItemChangeInternal = (index, field, value) => {
    const updatedItems = formData.items.map((item, i) =>
      i === index
        ? {
          ...item,
          [field]: value,
          totalPrice:
            field === "price" || field === "quantity"
              ? (field === "price" ? value : item.price) * (field === "quantity" ? value : item.quantity)
              : item.totalPrice,
        }
        : item
    );
    setFormData({ ...formData, items: updatedItems });
  };

  const getPaymentTermText = (term) => {
    switch (term) {
      case 1:
        return "Net 1 Day";
      case 7:
        return "Net 7 Days";
      case 14:
        return "Net 14 Days";
      case 30:
        return "Net 30 Days";
      default:
        return "";
    }
  };

  return isOpen ? (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>#{invoiceId}</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <form onSubmit={onSaveChanges}>
          {/* Bill From Section */}
          <div className="billFrom">
            <h3>Gelen Fatura</h3>
            <div className="form-group">
              <label>Adres</label>
              <input
                type="text"
                name="billFrom.streetAddress"
                value={formData.billFrom.streetAddress}
                onChange={handleChange}
                placeholder="19 Union Terrace"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Şehir</label>
                <input
                  type="text"
                  name="billFrom.city"
                  value={formData.billFrom.city}
                  onChange={handleChange}
                  placeholder="London"
                  required
                />
              </div>
              <div className="form-group">
                <label>Posta Kodu</label>
                <input
                  type="text"
                  name="billFrom.postCode"
                  value={formData.billFrom.postCode}
                  onChange={handleChange}
                  placeholder="E1 3EZ"
                  required
                />
              </div>
              <div className="form-group">
                <label>Ülke</label>
                <input
                  type="text"
                  name="billFrom.country"
                  value={formData.billFrom.country}
                  onChange={handleChange}
                  placeholder="United Kingdom"
                  required
                />
              </div>
            </div>
          </div>

          {/* Bill To Section */}
          <div className="billTo">
            <h3>Bill To</h3>
            <div className="form-group">
              <label>Müşterinin Adı</label>
              <input
                type="text"
                name="billTo.name"
                value={formData.billTo.name}
                onChange={handleChange}
                placeholder="Alex Grim"
                required
              />
            </div>

            <div className="form-group">
              <label>Müşterinin E-postası</label>
              <input
                type="email"
                name="billTo.email"
                value={formData.billTo.email}
                onChange={handleChange}
                placeholder="alexgrim@mail.com"
                required
              />
            </div>

            <div className="form-group">
              <label>Açık Adres</label>
              <input
                type="text"
                name="billTo.address"
                value={formData.billTo.address}
                onChange={handleChange}
                placeholder="84 Church Way"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Şehir</label>
                <input
                  type="text"
                  name="billTo.city"
                  value={formData.billTo.city}
                  onChange={handleChange}
                  placeholder="Bradford"
                  required
                />
              </div>
              <div className="form-group">
                <label>Posta Kodu</label>
                <input
                  type="text"
                  name="billTo.postCode"
                  value={formData.billTo.postCode}
                  onChange={handleChange}
                  placeholder="BD1 9PB"
                  required
                />
              </div>
              <div className="form-group">
                <label>Ülke</label>
                <input
                  type="text"
                  name="billTo.country"
                  value={formData.billTo.country}
                  onChange={handleChange}
                  placeholder="United Kingdom"
                  required
                />
              </div>
            </div>
          </div>

          {/* Invoice Date Section */}
          <div className="invoiceDateSection">
            <div className="form-row">
              <div className="form-group">
                <label>Fatura Tarihi</label>
                <input
                  type="date"
                  name="invoiceDate"
                  value={formData.invoiceDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Ödeme Koşulları</label>
                <div className="custom-select" onClick={() => setShowPaymentOptions(!showPaymentOptions)}>
                  <div className="selected-option">
                    {getPaymentTermText(formData.paymentTerm)}
                    <span className="arrow">⌄</span>
                  </div>
                  {showPaymentOptions && (
                    <ul className="options">
                      <li onClick={() => { setFormData({ ...formData, paymentTerm: 1 }); setShowPaymentOptions(false); }}>
                        Net 1 Gün
                      </li>
                      <li onClick={() => { setFormData({ ...formData, paymentTerm: 7 }); setShowPaymentOptions(false); }}>
                        Net 7 Gün
                      </li>
                      <li onClick={() => { setFormData({ ...formData, paymentTerm: 14 }); setShowPaymentOptions(false); }}>
                        Net 14 Gün
                      </li>
                      <li onClick={() => { setFormData({ ...formData, paymentTerm: 30 }); setShowPaymentOptions(false); }}>
                        Net 30 Gün
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Proje Tanımı</label>
              <input
                type="text"
                name="projectDescription"
                value={formData.projectDescription}
                onChange={handleChange}
                placeholder="Graphic Design"
                required
              />
            </div>
          </div>

          {/* Item List Section */}
          <div className="itemListSection">
            <h3>Ürün Listesi</h3>
            {formData.items.map((item, index) => (
              <div key={index} className="item">
                <input
                  type="text"
                  name={`items.${index}.name`}
                  value={item.name}
                  placeholder="Item Name"
                  onChange={(e) => handleItemChangeInternal(index, 'name', e.target.value)}
                  required
                />
                <input
                  type="number"
                  name={`items.${index}.quantity`}
                  value={item.quantity}
                  placeholder="Quantity"
                  onChange={(e) => handleItemChangeInternal(index, 'quantity', parseInt(e.target.value))}
                  min="1"
                  required
                />
                <input
                  type="number"
                  name={`items.${index}.price`}
                  value={item.price}
                  placeholder="Price"
                  onChange={(e) => handleItemChangeInternal(index, 'price', parseFloat(e.target.value))}
                  min="0.01"
                  step="0.01"
                  required
                />
                <span>{(item.quantity * item.price).toFixed(2)}</span>
                <button className="trash" type="button" onClick={() => handleDeleteItem(index)}>
                  <Trash />
                </button>
              </div>
              
            ))}
            
            {/* Yeni öğe ekleme formu */}
            {showNewItemForm && (
              <div className="itemEditOge">
                <div className="item">

                <input
                  type="text"
                  name="itemName"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  placeholder="Öğe Adı"
                  required
                  />
                <input
                  type="number"
                  name="quantity"
                  value={newItem.quantity}
                  onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) })}
                  placeholder="Adet"
                  min="1"
                  required
                  />
                <input
                  type="number"
                  name="price"
                  value={newItem.price}
                  onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
                  placeholder="Fiyat"
                  min="0.01"
                  step="0.01"
                  required
                  />
                  </div>
                <div className="itemBtn">
                 <button className="addInput" type="button" onClick={onAddNewItem}>
                   + Add New Item
                </button>
                </div>
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
              İptal
            </button>
            <button type="submit" className="save-btn">
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default EditModal;
