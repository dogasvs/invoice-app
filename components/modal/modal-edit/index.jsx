"use client";

import { useState, useEffect } from "react";
import { updateInvoiceData } from "@/app/actions/serverActions";
import Trash from "@/svgs/trash";
import "../modal.css";

const EditModal = ({
  isOpen,
  closeModal,
  invoiceId,
  invoiceData,
}) => {
  const [formData, setFormData] = useState({
    projectDescription: "",
    createdTime: "", // Oluşturma zamanı, invoiceData ile dolacak
    paymentStatus: 0,
    paymentTerm: 30,
    clientId: 0,
    billTo: {
      name: "",
      email: "",
      address: "",
      city: "",
      postCode: "",
      country: "",
    },
    items: [],
  });

  const [newItem, setNewItem] = useState({
    name: "",
    quantity: 1,
    price: 0,
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const [showNewItemForm, setShowNewItemForm] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  
  // Sabit billFrom bilgileri
  const billFrom = {
    streetAddress: "19 Union Terrace",
    city: "London",
    postCode: "E1 3EZ",
    country: "United Kingdom",
  };
  
  // Backend'den gelen verileri formData'ya yerleştiriyoruz
  useEffect(() => {
    if (invoiceData) {
      setFormData({
        projectDescription: invoiceData.projectDescription || "",
        createdTime: invoiceData.createdTime || new Date().toISOString(),
        paymentStatus: invoiceData.paymentStatus || 0,
        paymentTerm: invoiceData.paymentTerm || 30,
        clientId: invoiceData.clientId || 0,
        billTo: {
          name: invoiceData.client?.name || "",
          email: invoiceData.client?.email || "",
          address: invoiceData.client?.address || "",
          city: invoiceData.client?.city || "",
          postCode: invoiceData.client?.postCode || "",
          country: invoiceData.client?.country || "",
        },
        items: invoiceData.items || [],
      });
    }
  }, [invoiceData]);

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    try {
      await updateInvoiceData(invoiceId, formData);
      closeModal();
    } catch (error) {
      setErrorMessage("Fatura güncellenirken hata oluştu.");
      console.error("API Hatası:", error);
    }
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

  const handleAddNewItem = () => {
    if (!newItem.name || newItem.quantity <= 0 || newItem.price <= 0) {
      setErrorMessage("Geçerli bir öğe ekleyin.");
      return;
    }

    const total = newItem.quantity * newItem.price;
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        {
          name: newItem.name,
          quantity: newItem.quantity,
          price: newItem.price,
          totalPrice: total,
        },
      ],
    });

    setNewItem({ name: "", quantity: 1, price: 0 });
    setErrorMessage(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "paymentTerm") {
      setFormData({
        ...formData,
        paymentTerm: Number(value),
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

  return isOpen ? (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>#{invoiceId}</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <form onSubmit={handleSaveChanges}>
          {/* Bill From Section */}
          <div className="billFrom">
            <h3>Gelen Fatura</h3>
            <div className="form-group">
              <label>Adres</label>
              <input
                type="text"
                name="billFrom.streetAddress"
                value={billFrom.streetAddress}
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
                  value={billFrom.city}
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
                  value={billFrom.postCode}
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
                  value={billFrom.country}
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
                value={formData.billTo?.name}
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
                value={formData.billTo?.email}
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
                value={formData.billTo?.address}
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
                  value={formData.billTo?.city}
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
                  value={formData.billTo?.postCode}
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
                  value={formData.billTo?.country}
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
                  value={formData.createdTime?.split("T")[0] || ""}                  onChange={handleChange}
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
                 <button className="addInput" type="button" onClick={handleAddNewItem}>
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
