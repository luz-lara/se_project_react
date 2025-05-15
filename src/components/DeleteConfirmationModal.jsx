function DeleteConfirmationModal({ isOpen, onClose, onConfirm, item }) {
  if (!isOpen) return null;

  return (
    <div className="delete__modal-overlay ">
      <div className="delete__modal">
        <button className="modal__close" onClick={onClose}></button>
        <div className="delete__modal-paragraph-container">
          <p className="delete__modal-paragraph">
            Are you sure you want to delete this item?
          </p>
          <p className="delete__modal-paragraph">This action is irreversible</p>
        </div>
        <div className="delete__button-container">
          <button
            className="delete__button delete__button-confirm"
            onClick={() => onConfirm(item)}
          >
            Yes, delete
          </button>
          <button
            className="delete__button delete__button-cancel"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
