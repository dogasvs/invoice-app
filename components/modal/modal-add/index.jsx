"use client";

import { useState } from "react";
import { addInvoiceData } from "@/app/actions/serverActions";
import "../modal.css";
<<<<<<< HEAD
import Trash from "@/svgs/trash";

export default function ModalAdd({ isModalOpen, closeModal }) {
  // Kullanıcının dolduracağı client bilgileri
=======

export default function ModalAdd({ isModalOpen, closeModal, invoiceData }) {
>>>>>>> sema
  const [formData, setFormData] = useState({
    projectDescription: "",
    paymentTerm: 30, // Örnek olarak Net 30 gün
    clientId: 0, // Müşteri ID, kullanıcı tarafından girilecek
    items: [],
  });

<<<<<<< HEAD
  // Sabit billFrom bilgileri, backend'e gönderilmeyecek
  const billFrom = {
    streetAddress: "19 Union Terrace",
    city: "London",
    postCode: "E1 3EZ",
    country: "United Kingdom",
  };

=======
>>>>>>> sema
  const [newItem, setNewItem] = useState({
    name: "",
    quantity: 1,
    price: 0,
  });


  const [errorMessage, setErrorMessage] = useState(null);


  const handleAddNewItem = () => {
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
          totalPrice: total,
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
      // Sabit bilgiler, örneğin paymentStatus ve createdTime ekleniyor
      const invoiceData = {
        ...formData,
        id: 0,  // Yeni bir fatura olduğundan id 0
        createdTime: new Date().toISOString(),  // Sabit tarih
        paymentStatus: 0,  // Sabit ödeme durumu
      };
  
      // API'ye form verilerini gönder
      await addInvoiceData(invoiceData);
      closeModal();
    } catch (error) {
      setErrorMessage("Fatura kaydedilirken hata oluştu.");
      console.error("API Hatası:", error);
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

<<<<<<< HEAD
=======
  //---------- datalist

  const [selectedUser, setSelectedUser] = useState(null);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [query, setQuery] = useState(""); // arama sorgusu icin

  const handleInput = async (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);
    if (searchQuery.length > 3) {
      const response = await searchedUsers(searchQuery);
      if (Array.isArray(response)) {
        console.log("test");

        setSearchedUsers(response);
      }
    }
  };

  const handleFocusOut = (e) => {
    const user = searchedUsers.find((user) => user.name === e.target.value);
    setSelectedUser(user);
  };

>>>>>>> sema
  return (
    <div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h2>Yeni Fatura</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <form onSubmit={handleSaveInvoice}>
              {/*SABİT Fatura Kaynağı */}
              <div className="billFrom">
                <h3>Fatura Kaynağı</h3>
                <div className="form-group">
                  <label>Açık Adres</label>
                  <input
                    type="text"
                    name="billFrom.streetAddress"
                    value={billFrom.streetAddress}
                    onChange={handleChange}
                    placeholder="19 Union Terrace"
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
<<<<<<< HEAD
                    type="text"
                    name="billTo.name"
                    value={formData.billTo?.name}
                    onChange={handleChange}
                    placeholder="Alex Grim"
=======
                    onKeyDown={handleInput}
                    onBlur={handleFocusOut}
                    defaultValue={invoiceData.name}
                    list="clients"
                    name="clients"
                    id="clients"
>>>>>>> sema
                  />
                  <datalist id="users">
                    {searchedUsers.map((user, index) => (
                      <option key={index} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </datalist>
                </div>

                <div className="form-group">
                  <label>Müşterinin E-postası</label>
                  <input
                    type="email"
                    name="billTo.email"
                    value={formData.billTo?.email}
                    onChange={handleChange}
                    defaultValue={selectedUser?.email}
                    placeholder="alexgrim@mail.com"
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
                      value={formData.createdTime?.split("T")[0] || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Ödeme Koşulları</label>
                    <select
                      name="paymentTerm"
                      value={formData.paymentTerm}
                      onChange={handleChange}
                    >
                      <option value={1}>Net 1 Gün</option>
                      <option value={7}>Net 7 Gün</option>
                      <option value={14}>Net 14 Gün</option>
                      <option value={30}>Net 30 Gün</option>
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
                <div className="itemAdd">
                  <div className="itemAddOge">
                    <label htmlFor="itemName">
                      <p>Öğe Adı</p>

                      <input
                        type="text"
                        name="itemName"
                        value={newItem.itemName}
                        onChange={(e) =>
                          setNewItem({ ...newItem, itemName: e.target.value })
                        }
                        placeholder="Öğe Adı"
                      />
                    </label>
                    <label htmlFor="quantity">
                      <p>Adet.</p>
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
                    </label>
                    <label htmlFor="price">
                      <p>Fiyat</p>
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
                    </label>
                    <div className="toplam">
                      <p>Toplamı gelicek</p>
                    </div>
                  </div>
                  <div className="itemBtn">
                    <button type="button" onClick={handleAddNewItem}>
                      + Yeni Ekle
                    </button>
<<<<<<< HEAD

=======
>>>>>>> sema
                  </div>
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
                  Kaydet & Gönder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
