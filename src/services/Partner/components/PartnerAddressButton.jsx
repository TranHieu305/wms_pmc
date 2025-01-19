import { useModal } from "../../../shared/components/ModalProvider";
import { SharedBtn } from "../../../shared/components/common";
import { notificationHelper } from "../../../shared/utils/notificationHelper";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import partnerAddressApi from "../api/partnerAddressApi";
import FormSavePartnerAddress from "./PartnerAddressForm";


function PartnerAddressBtnCreate({partner,...props}) {
    const { showModal } = useModal(); 
    const navigate = useNavigate();

    const handleSave = (data) => {
        partnerAddressApi.saveAddress(data)
            .then((response) => {
                notificationHelper.showSuccessNotification({ description: "Successfully created address" });
                setTimeout(() => navigate(0), 1000);
            })
            .catch((err) => {
                notificationHelper.showErrorNotification({ description: "Cannot created address" });
            });
    }

    const handleClick = () => {
        showModal({
            title: "Create new address",
            body: (<FormSavePartnerAddress partner={partner} />),
            onSave: handleSave,
            widthModal: "medium"
        })
    }

    return <SharedBtn.BtnSave onClick={handleClick} {...props}/>
}

function PartnerAddressBtnEdit({partner, partnerAddress,...props}) {
    const { showModal } = useModal(); 
    const navigate = useNavigate();

    const handleSave = (data) => {
        partnerAddressApi.editAddress(data)
            .then((response) => {
                notificationHelper.showSuccessNotification({ description: "Successfully update address" });
                setTimeout(() => navigate(0), 1000);
            })
            .catch((err) => {
                notificationHelper.showErrorNotification({ description: "Cannot update address" });
            });
    }

    const handleClick = () => {
        showModal({
            title: <div>Edit address: {partnerAddress.name}</div>,
            body: (<FormSavePartnerAddress partner={partner} partnerAddress={partnerAddress} />),
            onSave: handleSave,
            widthModal: "medium"
        })
    }

    return <SharedBtn.BtnEdit onClick={handleClick} {...props}/>
}

function PartnerAddressBtnDelete({partnerAddress}) {
    const navigate = useNavigate();

    const onDelete = (partnerAddress) => {
        partnerAddressApi.deleteAddress(partnerAddress)
            .then((response) => {
                notificationHelper.showSuccessNotification({ description: "Successfully delete address" });
                setTimeout(() => navigate(0), 1000);
            })
            .catch((err) => {
                notificationHelper.showErrorNotification({ description: "Cannot delete address" });
            });
    }

    const openConfirmModal = () => {
        Modal.confirm({
			title: "Confirm delete",
			content: <div>Do you really want to delete address: <b>{partnerAddress.name}</b> ?</div>,
			onOk: () => onDelete(partnerAddress),
		});
    }

    return <SharedBtn.BtnDelete onClick={openConfirmModal}/>
}

export {PartnerAddressBtnCreate, PartnerAddressBtnEdit, PartnerAddressBtnDelete}