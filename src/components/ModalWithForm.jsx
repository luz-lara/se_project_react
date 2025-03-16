export default function ModalWithForm({ title, submitButton, children, onClose, buttonName, isValid }) {


    return (
        <div className="modal modal__overlay" onClick={(e) => e.target.classList.contains('modal') && onClose()}>
            <div className="modal modal__container">
                <button className="modal__close-button" onClick={onClose}></button>
                <p className="modal__heading">{title}</p>
                <form className={`modal`}>
                    {children}

                    <button className="modal__form-bbtn"
                        type="submit" onClick={submitButton} disabled={!isValid} style={{ opacity: !isValid ? 0.5 : 1 }}>{buttonName}</button>
                </form>
            </div>
        </div>
    )
}