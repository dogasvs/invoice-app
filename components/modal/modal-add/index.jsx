"use client";

import { useState } from "react";
import "../modal.css";

export default function ModalAdd() {
  const [addNewInput, setAddNewInput] = useState([]);
  const [paymentTerms, setPaymentTerms] = useState("Net 30 Days");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNewAddItem = () => {
    setAddNewInput([
      ...addNewInput,
      {
        itemName: { inputType: "text", placeholder: "Add new Item" },
        quantity: { inputType: "number", placeholder: "0" },
        price: { inputType: "text", placeholder: "0.00" },
        total: { inputType: "text", placeholder: "400.00" },
      },
    ]);
  };

  const handlePaymentChange = (newTerm) => {
    setPaymentTerms(newTerm);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <button onClick={openModal} className="open-modal-btn">
        Add New Invoice
      </button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h2>New Invoice</h2>
            <form>
              <div className="billFrom">
                <h3>Bill From</h3>
                <div className="form-group">
                  <label>Street Address</label>
                  <input type="text" defaultValue="19 Union Terrace" />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>City</label>
                    <input type="text" defaultValue="London" />
                  </div>
                  <div className="form-group">
                    <label>Post Code</label>
                    <input type="text" defaultValue="E1 3EZ" />
                  </div>
                  <div className="form-group">
                    <label>Country</label>
                    <input type="text" defaultValue="United Kingdom" />
                  </div>
                </div>
              </div>

              {/* Bill To Section */}
              <div className="billTo">
                <h3>Bill To</h3>
                <div className="form-group">
                  <label>Client's Name</label>
                  <input type="text" defaultValue="Alex Grim" />
                </div>

                <div className="form-group">
                  <label>Client's Email</label>
                  <input type="email" defaultValue="alexgrim@mail.com" />
                </div>

                <div className="form-group">
                  <label>Street Address</label>
                  <input type="text" defaultValue="84 Church Way" />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>City</label>
                    <input type="text" defaultValue="Bradford" />
                  </div>
                  <div className="form-group">
                    <label>Post Code</label>
                    <input type="text" defaultValue="BD1 9PB" />
                  </div>
                  <div className="form-group">
                    <label>Country</label>
                    <input type="text" defaultValue="United Kingdom" />
                  </div>
                </div>
              </div>

              {/* Invoice Date Section */}
              <div className="invoiceDateSection">
                <div className="form-row">
                  <div className="form-group">
                    <label>Invoice Date</label>
                    <input type="date" defaultValue="2021-08-21" />
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
                        <li onClick={() => handlePaymentChange("Net 7 Days")}>
                          Net 7 Days
                        </li>
                        <li onClick={() => handlePaymentChange("Net 14 Days")}>
                          Net 14 Days
                        </li>
                        <li onClick={() => handlePaymentChange("Net 30 Days")}>
                          Net 30 Days
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label>Project Description</label>
                  <input type="text" defaultValue="Graphic Design" />
                </div>
              </div>

              {/* Item List Section */}
              <div className="itemListSection">
                <h3>Item List</h3>
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
                <button type="button" onClick={handleNewAddItem}>
                  + Add New Item
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
                  </div>
                ))}
              </div>

              <div className="modal-buttons">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
