"use client";

import { useState } from "react";
import "../modal.css";

export default function ModalAdd({ isModalOpen, closeModal }) {
  const [addNewInput, setAddNewInput] = useState([]);
  const [paymentTerms, setPaymentTerms] = useState("Net 30 Days");

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

  const handlePaymentChange = (newTerm) => {
    setPaymentTerms(newTerm);
  };

  return (
    <div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h2>Yeni Fatura</h2>
            <form>
              <div className="billFrom">
                <h3>Fatura Kaynağı</h3>
                <div className="form-group">
                  <label>Açık adres</label>
                  <input type="text" defaultValue="19 Union Terrace" />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Şehir</label>
                    <input type="text" defaultValue="London" />
                  </div>
                  <div className="form-group">
                    <label>Posta Kodu</label>
                    <input type="text" defaultValue="E1 3EZ" />
                  </div>
                  <div className="form-group">
                    <label>Ülke</label>
                    <input type="text" defaultValue="United Kingdom" />
                  </div>
                </div>
              </div>

              {/* Bill To Section */}
              <div className="billTo">
                <h3>fatura edilecek</h3>
                <div className="form-group">
                  <label>Müşterinin Adı</label>
                  <input type="text" defaultValue="Alex Grim" />
                </div>

                <div className="form-group">
                  <label>Müşterinin E-postası</label>
                  <input type="email" defaultValue="alexgrim@mail.com" />
                </div>

                <div className="form-group">
                  <label>Açık adres</label>
                  <input type="text" defaultValue="84 Church Way" />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Şehir</label>
                    <input type="text" defaultValue="Bradford" />
                  </div>
                  <div className="form-group">
                    <label>Posta Kodu</label>
                    <input type="text" defaultValue="BD1 9PB" />
                  </div>
                  <div className="form-group">
                    <label>Ülke</label>
                    <input type="text" defaultValue="United Kingdom" />
                  </div>
                </div>
              </div>

              {/* Invoice Date Section */}
              <div className="invoiceDateSection">
                <div className="form-row">
                  <div className="form-group">
                    <label>Fatura Tarihi</label>
                    <input type="date" defaultValue="2021-08-21" />
                  </div>
                  <div className="form-group">
                    <label>Ödeme Koşulları</label>
                    <div className="custom-select">
                      <div className="selected-option">
                        {paymentTerms}
                        <span className="arrow">⌄</span>
                      </div>
                      <ul className="options">
                        <li onClick={() => handlePaymentChange("Net 1 Gün")}>
                          Net 1 Gün
                        </li>
                        <li onClick={() => handlePaymentChange("Net 7 Gün")}>
                          Net 7 Gün
                        </li>
                        <li onClick={() => handlePaymentChange("Net 14 Gün")}>
                          Net 14 Gün
                        </li>
                        <li onClick={() => handlePaymentChange("Net 30 Gün")}>
                          Net 30 Gün
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label>Proje Açıklaması</label>
                  <input type="text" defaultValue="Graphic Design" />
                </div>
              </div>

              {/* Item List Section */}
              <div className="itemListSection">
                <h3>Öğe Listesi</h3>
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

              <button
                className="addInput"
                type="button"
                onClick={handleNewAddItem}
              >
                + Yeni Ekle
              </button>

              <div className="modal-buttons">
                <button
                  onClick={closeModal}
                  type="button"
                  className="cancel-btn"
                >
                  İptal et
                </button>
                <button type="submit" className="save-btn">
                  Değişiklikleri Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
