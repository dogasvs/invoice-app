import './delete-modal.css';

const DeleteModal = ({ isOpen, closeModal, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="delete-modal-overlay">
      <div className="delete-modal-container">
        <h2>Confirm Deletion</h2>
        <p>
          Are you sure you want to delete invoice <strong>#XM9141</strong>? This action cannot be undone.
        </p>
        <div className="delete-modal-buttons">
          <button className="cancel-btn" onClick={closeModal}>Cancel</button>
          <button className="delete-btn" onClick={onDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;