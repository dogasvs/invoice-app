"use client";

import { useState } from "react";
import "../modal.css";
import Trash from "@/svgs/trash";
import { addInvoiceData } from "@/app/actions/serverActions";

export default function ModalAdd({ isModalOpen, closeModal }) {
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

  const [errorMessage, setErrorMessage] = useState(null);

  const handleAddNewItem = () => {
    // Eklenmek istenen öğeyi kontrol et
    if (!newItem.itemName || newItem.quantity <= 0 || newItem.price <= 0) {
      setErrorMessage("Geçerli bir öğe ekleyin.");
      return;
    }

    // Yeni öğeyi öğe listesine ekle
    const total = newItem.quantity * newItem.price;
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        {
          name: newItem.itemName,
          quantity: newItem.quantity,
          price: newItem.price,
          total,
        },
      ],
    });

    // Yeni öğeyi sıfırla
    setNewItem({ itemName: "", quantity: 1, price: 0 });
    setErrorMessage(null);
  };

  const handleDeleteItem = (index) => {
    // Öğeyi listeden kaldır
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: updatedItems });
  };

  const handleSaveInvoice = async (e) => {
    e.preventDefault();

    try {
      // API'ye form verilerini gönder
      await addInvoiceData(formData);
      closeModal();
    } catch (error) {
      setErrorMessage("Fatura kaydedilirken hata oluştu.");
      console.error("API Hatası:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h2>Yeni Fatura</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <form onSubmit={handleSaveInvoice}>
              {/* Fatura Kaynağı */}
              <div className="billFrom">
                <h3>Fatura Kaynağı</h3>
                <div className="form-group">
                  <label>Açık Adres</label>
                  <input
                    type="text"
                    name="streetAddress"
                    defaultValue="istanbul"
                    // value={formData.streetAddress}
                    onChange={handleChange}
                    placeholder="19 Union Terrace"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Şehir</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="London"
                    />
                  </div>
                  <div className="form-group">
                    <label>Posta Kodu</label>
                    <input
                      type="text"
                      name="postCode"
                      value={formData.postCode}
                      onChange={handleChange}
                      placeholder="E1 3EZ"
                    />
                  </div>
                  <div className="form-group">
                    <label>Ülke</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="United Kingdom"
                    />
                  </div>
                </div>
              </div>

              {/* Fatura Edilecek */}
              <div className="billTo">
                <h3>Fatura Edilecek</h3>
                <div className="form-group">
                  <label>Müşterinin Adı</label>
                  <input
                    type="text"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleChange}
                    placeholder="Alex Grim"
                  />
                </div>

                <div className="form-group">
                  <label>Müşterinin E-postası</label>
                  <input
                    type="email"
                    name="clientEmail"
                    value={formData.clientEmail}
                    onChange={handleChange}
                    placeholder="alexgrim@mail.com"
                  />
                </div>

                <div className="form-group">
                  <label>Açık Adres</label>
                  <input
                    type="text"
                    name="clientStreetAddress"
                    value={formData.clientStreetAddress}
                    onChange={handleChange}
                    placeholder="84 Church Way"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Şehir</label>
                    <input
                      type="text"
                      name="clientCity"
                      value={formData.clientCity}
                      onChange={handleChange}
                      placeholder="Bradford"
                    />
                  </div>
                  <div className="form-group">
                    <label>Posta Kodu</label>
                    <input
                      type="text"
                      name="clientPostCode"
                      value={formData.clientPostCode}
                      onChange={handleChange}
                      placeholder="BD1 9PB"
                    />
                  </div>
                  <div className="form-group">
                    <label>Ülke</label>
                    <input
                      type="text"
                      name="clientCountry"
                      value={formData.clientCountry}
                      onChange={handleChange}
                      placeholder="United Kingdom"
                    />
                  </div>
                </div>
              </div>

              {/* Fatura Tarihi ve Ödeme Koşulları */}
              <div className="invoiceDateSection">
                <div className="form-row">
                  <div className="form-group">
                    <label>Fatura Tarihi</label>
                    <input
                      type="date"
                      name="invoiceDate"
                      value={formData.invoiceDate}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Ödeme Koşulları</label>
                    <select
                      name="paymentTerms"
                      value={formData.paymentTerms}
                      onChange={handleChange}
                    >
                      <option value="Net 1 Gün">Net 1 Gün</option>
                      <option value="Net 7 Gün">Net 7 Gün</option>
                      <option value="Net 14 Gün">Net 14 Gün</option>
                      <option value="Net 30 Gün">Net 30 Gün</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Proje Açıklaması</label>
                  <input
                    type="text"
                    name="projectDescription"
                    value={formData.projectDescription}
                    onChange={handleChange}
                    placeholder="Graphic Design"
                  />
                </div>
              </div>

              {/* Öğe Listesi */}
              <div className="itemListSection">
                <h3>Öğe Listesi</h3>
                {formData.items.map((item, index) => (
                  <div key={index} className="item">
                    <input
                      type="text"
                      value={item.name}
                      placeholder="Item Name"
                      onChange={(e) =>
                        handleItemChange(index, "name", e.target.value)
                      }
                    />
                    <input
                      type="number"
                      value={item.quantity}
                      placeholder="Quantity"
                      onChange={(e) =>
                        handleItemChange(
                          index,
                          "quantity",
                          parseInt(e.target.value)
                        )
                      }
                    />
                    <input
                      type="number"
                      value={item.price}
                      placeholder="Price"
                      onChange={(e) =>
                        handleItemChange(
                          index,
                          "price",
                          parseFloat(e.target.value)
                        )
                      }
                    />
                    <span>{(item.quantity * item.price).toFixed(2)}</span>

                    <button
                      className="trash"
                      type="button"
                      onClick={() => handleDeleteItem(index)}
                    >
                      <Trash />
                    </button>
                  </div>
                ))}

                {/* Yeni öğe ekleme formu */}
                <div className="item">
                  <input
                    type="text"
                    name="itemName"
                    value={newItem.itemName}
                    onChange={(e) =>
                      setNewItem({ ...newItem, itemName: e.target.value })
                    }
                    placeholder="Öğe Adı"
                  />
                  <input
                    type="number"
                    name="quantity"
                    value={newItem.quantity}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        quantity: parseInt(e.target.value),
                      })
                    }
                    placeholder="Adet"
                  />
                  <input
                    type="number"
                    name="price"
                    value={newItem.price}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        price: parseFloat(e.target.value),
                      })
                    }
                    placeholder="Fiyat"
                  />
                  <button type="button" onClick={handleAddNewItem}>
                    + Yeni Ekle
                  </button>
                </div>
              </div>

              <div className="modal-buttons">
                <button
                  onClick={closeModal}
                  type="button"
                  className="cancel-btn"
                >
                  İptal
                </button>
                <button type="submit" className="save-btn">
                  Faturayı Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
