export default function ModalWithForm({
  title,
  onSubmit,
  children,
  onClose,
  buttonText,
  isValid,
  isModalOpen,
}) {
  return (
    <div
      className={`modal__overlay ${isModalOpen ? "modal__overlay--open" : ""}`}
      onClick={(e) =>
        e.target.classList.contains("modal__overlay--open") && onClose()
      }
    >
      <div className="modal modal__container">
        <button className="modal__close-button" onClick={onClose}></button>
        <p className="modal__heading">{title}</p>
        <form className={`modal`} onSubmit={onSubmit}>
          {children}

          <button
            className="modal__form-bbtn"
            type="submit"
            disabled={!isValid}
            style={{ opacity: !isValid ? 0.5 : 1 }}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
