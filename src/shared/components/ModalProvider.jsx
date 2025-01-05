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
 * - `submitForm`: (Optional) Function to trigger form logic before executing `onSave`.
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
import { Button } from "antd";

export const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
    const [modalConfig, setModalConfig] = useState(null);
    const [modalData, setModalData] = useState(null); // Shared state for form data
    const [handleBeforeSave, setHandleBeforeSave] = useState(null); // State to store the handleBeforeSave function

    const showModal = ({ 
        title, 
        body, 
        onSave, 
        onCancel, 
        onSaveText, 
        onCancelText,
        widthModal = "small", 
        beforeSaveCallback,
    }) => {
        setModalConfig({ 
            title, 
            body, 
            onSave, 
            onCancel, 
            onSaveText, 
            onCancelText, 
            widthModal,
        });

        // Dynamically set handleBeforeSave when showing the modal
        setHandleBeforeSave(() => beforeSaveCallback || null);
    };
  
    const hideModal = () => {   
        setModalConfig(null);
        setModalData(null); // Clear modal data
        setHandleBeforeSave(null); // Clear the handleBeforeSave function
    };

    const handleSave = async () => {
        if (handleBeforeSave) {
            // Trigger handleBeforeSave before executing onSave
            await handleBeforeSave();
        }
        if (modalConfig?.onSave) {
            // After Formik's logic is handled, pass modalData to the onSave callback.
            modalConfig.onSave(modalData); 
        }
    };

    return (
        <ModalContext.Provider value={{ showModal, hideModal, setModalData }}>
        {children}
        {modalConfig &&
            createPortal(
                <div className="modal">
                <div className="modal-overlay"></div>
                <div  className={`modal-content ${
                        modalConfig.widthModal === "small"
                        ? "w-1/4"
                        : modalConfig.widthModal === "large"
                        ? "w-3/4"
                        : "w-1/2"
                }`}>
                    <div className="modal-header">
                    <h3>{modalConfig.title}</h3>
                    </div>
                    <div className="modal-body">{modalConfig.body}</div>
                    <div className="modal-footer">
                        <Button onClick={modalConfig.onCancel || hideModal}>
                            {modalConfig.onCancelText || "Cancel"}
                        </Button>
                        <Button onClick={handleSave} type="primary">
                            {modalConfig.onSaveText || "Save"}
                        </Button>
                    </div>
                </div>
                </div>,
                document.body
            )}
        </ModalContext.Provider>
    );
};