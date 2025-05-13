function ItemModal({ item, onClose, onOpenConfirm}) {
  return (
    <div
      className={`modal__overlay ${item ? "modal__overlay--open" : ""}`}
      id="preview-image-modal"
      onClick={(e) =>
        e.target.classList.contains("modal__overlay--open") && onClose()
      }
    >
      <div className="itemModal__preview-container">
        <button className="itemModal__close-button" onClick={onClose}></button>
        <img
          src={item.link}
          className="itemModal__preview-image"
          alt={item.name}
        />
        <div className="itemModal__name-delete-container">
        <p className="modal__preview-title">{item.name}</p>
        <button className="itemModal__delete-button"onClick={() => onOpenConfirm(item)}>Delete item</button>
        </div>
        <p className="modal__preview-weather">Weather: {item.weather}</p>
      </div>
    </div>
  );
}
export default ItemModal;
