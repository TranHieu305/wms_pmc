import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import "../styles/ModalProvider.css";

export const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
    const [modalConfig, setModalConfig] = useState(null);

    const showModal = ({ title, content, onSave, onCancel }) => {
      setModalConfig({ title, content, onSave, onCancel });
    };
  
    const hideModal = () => setModalConfig(null);

    return (
        <ModalContext.Provider value={{ showModal, hideModal }}>
        {children}
        {modalConfig &&
            createPortal(
                <div className="modal">
                <div className="modal-overlay"></div>
                <div className="modal-content">
                    <div className="modal-header">
                    <h3>{modalConfig.title}</h3>
                    </div>
                    <div className="modal-body">{modalConfig.content}</div>
                    <div className="modal-footer">
                    <button onClick={modalConfig.onCancel || hideModal}>
                        Cancel
                    </button>
                    <button onClick={modalConfig.onSave}>Save</button>
                    </div>
                </div>
                </div>,
                document.body
            )}
        </ModalContext.Provider>
    );
};