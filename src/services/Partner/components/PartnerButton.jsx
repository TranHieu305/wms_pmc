import { useModal } from "../../../shared/components/ModalProvider";
import { SharedBtn } from "../../../shared/components/common";
import { useNavigate } from "react-router-dom";
import partnerApi from "../api/partnerApi";
import { notificationHelper } from "../../../shared/utils/notificationHelper";
import { FormBodyCreatePartner, FormBodyUpdatePartner } from "./PartnerForm";
import { Modal } from "antd";

function BtnCreatePartner({...props}) {
    const { showModal } = useModal();

    const navigate = useNavigate();

    const handleSave = (data) => {
        partnerApi.savePartner(data)
            .then((response) => {
                notificationHelper.showSuccessNotification({ description: "Successfully updated partner" });
                setTimeout(() => navigate(0), 1000);
            })
            .catch((err) => {
                notificationHelper.showErrorNotification({ description: "Cannot update partner" });
            });
    }
    
    const handleClick = () => {
        showModal({
            title: "Create new partner",
            body: (<FormBodyCreatePartner />),
            onSave: handleSave,
            widthModal: "medium"
        })
    }

    return <SharedBtn.BtnSave onClick={handleClick} {...props} />
}

function BtnUpdatePartner({partner, ...props}) {
    const { showModal } = useModal();

    const navigate = useNavigate();

    const handleSave = (data) => {
        partnerApi.editPartner(data)
            .then((response) => {
                notificationHelper.showSuccessNotification({ description: "Successfully updated partner" });
                setTimeout(() => navigate(0), 1000);
            })
            .catch((err) => {
                notificationHelper.showErrorNotification({ description: "Cannot update partner" });
            });
    }
    
    const handleClick = () => {
        showModal({
            title: <div>Edit partner: {partner.name}</div>,
            body: (<FormBodyUpdatePartner partner={partner} />),
            onSave: handleSave,
            widthModal: "medium"
        })
    }

    return <SharedBtn.BtnEdit onClick={handleClick} {...props} />
}

function BtnDeletePartner({partner}) {
    const navigate = useNavigate();

    const onDelete = (partner) => {
        partnerApi.deletePartner(partner)
            .then((response) => {
                notificationHelper.showSuccessNotification({ description: "Successfully delete partner" });
                setTimeout(() => navigate(0), 1000);
            })
            .catch((err) => {
                notificationHelper.showErrorNotification({ description: "Cannot delete partner" });
            });
    }

    const openConfirmModal = () => {
        Modal.confirm({
			title: "Confirm delete",
			content: <div>Do you really want to delete partner: <b>{partner.name}</b> ?</div>,
			onOk: () => onDelete(partner),
		});
    }

    return <SharedBtn.BtnDelete onClick={openConfirmModal}/>
}


export {BtnCreatePartner, BtnUpdatePartner, BtnDeletePartner};