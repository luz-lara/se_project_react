
function DeleteConfirmationModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal__content">
        <button className="modal__close" onClick={onClose}>X</button>
        <p>Are you sure you want to delete this item? <br>This action is irreversible.</br></p>
        <button onClick={onConfirm}>Yes, delete</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;