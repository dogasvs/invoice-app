import '../modal.css';

const EditModal = ({ isOpen, closeModal, paymentTerms, handlePaymentChange }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Edit #XM9141</h2>

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
                <div className="selected-option">{paymentTerms}
                <span className="arrow">⌄</span>

                </div>
                <ul className="options">
                  <li onClick={() => handlePaymentChange('Net 1 Day')}>Net 1 Day</li>
                  <li onClick={() => handlePaymentChange('Net 7 Days')}>Net 7 Days</li>
                  <li onClick={() => handlePaymentChange('Net 14 Days')}>Net 14 Days</li>
                  <li onClick={() => handlePaymentChange('Net 30 Days')}>Net 30 Days</li>
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
          <button className="add-item-btn">+ Add New Item</button>
        </div>

        <div className="modal-buttons">
          <button type="button" className="cancel-btn" onClick={closeModal}>Cancel</button>
          <button type="submit" className="save-btn">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

  
export default EditModal;
