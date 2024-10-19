"use client";

import { useState } from "react";
import "./modalAdd.css";

export default function ModalAdd({ isModalOpen }) {
  const [addNewInput, setAddNewInput] = useState([]);

  const handleNewAddItem = () => {
    setAddNewInput([
      ...addNewInput,
      {
        itemName: { inputType: "text", placeholder: "Add new Item" },
        quantity: { inputType: "number", placeholder: "0" },
        price: { inputType: "text", placeholder: "0.00" },
      },
    ]);
  };

  return (
    <div class="modal-overlay">
      <dialog open className={`modalAddContainer `}>
        <h1>New Invoice</h1>
        <form action="">
          <div className="billform">
            <h3 className="formName">Bill From</h3>
            <label htmlFor="StreetAddress">
              <p>Street Address</p>
              <input
                className="streetAddress"
                name="StreetAddress"
                type="text"
                placeholder=""
              />
            </label>
            <div className="billFormAddressDetail">
              <label htmlFor="city">
                <p> City</p>
                <input type="text" name="city" id="" />
              </label>
              <label htmlFor="postCode">
                <p> Post Code</p>
                <input type="text" name="postCode" />
              </label>
              <label htmlFor="country">
                <p> Country</p>
                <input type="text" name="country" id="" />
              </label>
            </div>
          </div>
          <div className="billToform">
            <h3 className="formName">Bill To</h3>
            <label htmlFor="clientName">
              <p>Client’s Name</p>
              <input name="clientName" type="text" placeholder="" />
            </label>
            <label htmlFor="clientEmail">
              <p>Client’s Email</p>
              <input type="email" name="clientEmail" id="" />
            </label>
            <label htmlFor="adres">
              <p>Street Address</p>
              <input type="text" name="adres" />
            </label>
            <div className="billToFormAddressDetail">
              <label htmlFor="city">
                <p> City</p>
                <input type="text" name="city" id="" />
              </label>
              <label htmlFor="postCode">
                <p> Post Code</p>
                <input type="text" name="postCode" />
              </label>
              <label htmlFor="country">
                <p> Country</p>
                <input type="text" name="country" id="" />
              </label>
              <div className="date">
                <label htmlFor="ınvoiceDate">
                  <p>Invoice Date</p>
                  <input type="date" name="ınvoiceDate" />
                </label>
                <div className="paymentTerms">
                  <p>Payment Terms</p>
                  <select htmlFor="paymentTerms">
                    <option value="30">Net 30 Days</option>
                    <option value="60">Net 60 Days</option>
                    <option value="90">Net 90 Days</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="itemList">
            <label htmlFor="itemName">
              <p>Item Name</p>
              <input type="text" name="itemName" />
            </label>
            <label htmlFor="itemName">
              <p>Item Name</p>
              <input type="text" name="itemName" />
            </label>
          </div>
          <button type="button" onClick={handleNewAddItem}>
            + Add New Item
          </button>
          <div>
            {addNewInput.map((input) => (
              <>
                <input
                  type={input.itemName.inputType}
                  placeholder={input.itemName.placeholder}
                />
                <input
                  type={input.quantity.inputType}
                  placeholder={input.quantity.placeholder}
                />
              </>
            ))}
          </div>
          <button type="submit">Submit</button>
        </form>
      </dialog>
    </div>
  );
}
