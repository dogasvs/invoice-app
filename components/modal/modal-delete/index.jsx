import "./delete-modal.css"

const DeleteModal = ({ isOpen, closeModal, onDelete, invoiceNumber }) => {
  if (!isOpen) return null;

  return (
    <div className="delete-modal-overlay">
      <div className="delete-modal-container">
        <h2>Silmeyi Onayla</h2>
        <p>
          Faturayı silmek istediğinizden emin misiniz?<strong>{invoiceNumber}</strong>?
          Bu işlem geri alınamaz.
        </p>
        <div className="delete-modal-buttons">
          <button className="cancel-btn" onClick={closeModal}>
            İptal et
          </button>
          <button className="delete-btn" onClick={onDelete}>
            sil
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
