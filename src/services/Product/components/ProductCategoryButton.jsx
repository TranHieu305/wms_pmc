import { useModal } from "../../../shared/components/ModalProvider";
import { useFormik } from "formik";
import { SharedBtn, SharedForm, SharedInput } from "../../../shared/components/common";
import { useEffect } from "react";
import { notificationHelper } from "../../../shared/utils/notificationHelper";
import { useNavigate } from "react-router-dom";
import productCategoryApi from "../api/productCategoryApi";
import { productCategoryValidationSchema } from "../utils/validation";
import inputHelper from "../../../shared/utils/inputHelper";
import { Modal } from "antd";
import Enum from "../../../shared/utils/enum";

function ProductCategoryBtnSave({category, ...props}) {
    const { showModal } = useModal(); 
    const navigate = useNavigate();

    const handleSave = (data) => {
        productCategoryApi.saveProductCategory(data)
            .then((response) => {
                notificationHelper.showSuccessNotification({ description: "Successfully created category" });
                setTimeout(() => navigate(0), 1000);
            })
            .catch((err) => {
                notificationHelper.showErrorNotification({ description: "Cannot create category" });
            });
    }

    const handleClick = () => {
        showModal({
            title: "Create new Product category",
            body: (<FormBodySaveProductCategory />),
            onSave: handleSave
        })
    }

    return <SharedBtn.BtnSave label="Add new" onClick={handleClick} {...props}/>
}

function ProductCategoryBtnEdit({category, ...props}) {
    const { showModal } = useModal(); 
    const navigate = useNavigate();

    const handleSave = (data) => {
        productCategoryApi.editProductCategory(data)
            .then((response) => {
                notificationHelper.showSuccessNotification({ description: "Successfully updated category" });
                setTimeout(() => navigate(0), 1000);
            })
            .catch((err) => {
                notificationHelper.showErrorNotification({ description: "Cannot update category" });
            });
    }

    const handleClick = () => {
        showModal({
            title: <div>Edit category: {category.name}</div>,
            body: (<FormBodySaveProductCategory category={category}/>),
            onSave: handleSave
        })
    }

    return <SharedBtn.BtnEdit label="Edit" onClick={handleClick} {...props}/>
}


function FormBodySaveProductCategory({category}) {
    const {setModalData} = useModal();

    const initialValues = {
		id: category?.id || 0,
		name: category?.name || "",
		description: category?.description || "",
		categoryType: category?.categoryType || Enum.CategoryType.MATERIAL
	};

    const formik = useFormik({
		initialValues: initialValues,
		validationSchema: productCategoryValidationSchema,
		onSubmit: (values) => {},
	});

     // Sync form data with ModalProvider
    useEffect(() => {
        setModalData(formik.values);
    }, [formik.values, setModalData]);

    const typeOptions = inputHelper.convertEnumToSelectOption(Enum.CategoryType);

    return (
        <SharedForm.FormBody>
            <SharedForm.FormBodyItem>
                <SharedInput.Label forName="name">Name*</SharedInput.Label>
                <SharedInput.Text
                        name="name"
                        placeholder="Category name*"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                        error={formik.touched.name && formik.errors.name}
                    />
            </SharedForm.FormBodyItem>
            
            <SharedForm.FormBodyItem>
                <SharedInput.Label forName="description">Description</SharedInput.Label>
                <SharedInput.Text
					name="description"
					placeholder="Category description"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.description}
					error={formik.touched.description && formik.errors.description}
				/>
            </SharedForm.FormBodyItem>
				
            <SharedForm.FormBodyItem>
                <SharedInput.Label forName="type">Category type*</SharedInput.Label>
                <SharedInput.SelectInput
					name="categoryType"
					onChange={(value) => formik.setFieldValue("categoryType", value)}
					onBlur={formik.handleBlur}
					value={formik.values.categoryType}
                    options={typeOptions}
                    style={{
                        width: '100%',
                    }}
				/>
            </SharedForm.FormBodyItem>				
        </SharedForm.FormBody>
    )
}


function ProductCategoryBtnDelete({category}) {
    const navigate = useNavigate();

    const onDelete = (category) => {
        productCategoryApi.deleteProductCategory(category)
            .then((response) => {
                notificationHelper.showSuccessNotification({ description: "Successfully delete category" });
                setTimeout(() => navigate(0), 1000);
            })
            .catch((err) => {
                notificationHelper.showErrorNotification({ description: "Cannot delete category" });
            });
    }

    const openConfirmModal = () => {
        Modal.confirm({
			title: "Confirm delete",
			content: <div>Do you really want to delete category: <b>{category.name}</b> ?</div>,
			onOk: () => onDelete(category),
		});
    }

    return <SharedBtn.BtnDelete onClick={openConfirmModal}/>
}

export {
    ProductCategoryBtnSave, 
    ProductCategoryBtnDelete,
    ProductCategoryBtnEdit
};