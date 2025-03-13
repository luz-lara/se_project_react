
function ItemModal({ item, onClose }) {

  return (
    <div className="modal" id="preview-image-modal" onClick={(e) => e.target.classList.contains('modal') && onClose()}>
      <div className="itemModal__preview-container">
        <button className="itemModal__close-button" onClick={onClose}></button>
        <img src={item.link} className="itemModal__preview-image" alt={item.name} />
        <p className="modal__preview-title">{item.name}</p>
        <p className="modal__preview-weather">Weather: {item.weather}</p>
      </div>
    </div>
  )
}
export default ItemModal