/**
 * ModalProvider: Provides a reusable modal management system using React Context.
 * 
 * Features:
 * - `showModal`: Opens the modal with custom content and actions.
 *    - Parameters:
 *      - `title`: Modal header text.
 *      - `body`: React component or content to display inside the modal.
 *      - `onSave`: Callback for the "Save" button.
 *      - `onCancel`: Callback for the "Cancel" button.
 *      - `onSaveText`: Custom text for the "Save" button.
 *      - `onCancelText`: Custom text for the "Cancel" button.
 * - `hideModal`: Closes the modal and clears its configuration.
 * - `modalData`: Shared state for passing data between the modal and its parent.
 * 
 * Usage:
 * Use `useModal()` to access `showModal` and `hideModal`.
 * 
 * Example:
 * const { showModal } = useModal();
 * 
 * showModal({
 *   title: "Example Modal",
 *   body: <YourComponent />,
 *   onSave: (data) => console.log("Saved:", data),
 *   onCancel: () => console.log("Cancelled"),
 * });
 * 
 * The modal dynamically renders its content (`body`) and handles actions via `onSave` and `onCancel`.
 */


import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import "../styles/ModalProvider.css";

export const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
    const [modalConfig, setModalConfig] = useState(null);
    const [modalData, setModalData] = useState(null); // Shared state for form data

    const showModal = ({ title, body, onSave, onCancel, onSaveText, onCancelText }) => {
      setModalConfig({ title, body, onSave, onCancel, onSaveText, onCancelText });
    };
  
    const hideModal = () => {   
        setModalConfig(null);
        setModalData(null); // Clear modal data
    };

    const handleSave = () => {
        if (modalConfig?.onSave) {
          modalConfig.onSave(modalData); // Trigger the passed onSave callback
        }
    };

    return (
        <ModalContext.Provider value={{ showModal, hideModal, setModalData }}>
        {children}
        {modalConfig &&
            createPortal(
                <div className="modal">
                <div className="modal-overlay"></div>
                <div className="modal-content">
                    <div className="modal-header">
                    <h3>{modalConfig.title}</h3>
                    </div>
                    <div className="modal-body">{modalConfig.body}</div>
                    <div className="modal-footer">
                    <button onClick={modalConfig.onCancel || hideModal}>
                        {modalConfig.onCancelText || "Cancel"}
                    </button>
                    <button onClick={handleSave}>
                        {modalConfig.onSaveText || "Save"}</button>
                    </div>
                </div>
                </div>,
                document.body
            )}
        </ModalContext.Provider>
    );
};