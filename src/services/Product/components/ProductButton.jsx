import { useModal } from "../../../shared/components/ModalProvider";
import { useFormik } from "formik";
import { SharedBtn, SharedForm, SharedInput } from "../../../shared/components/common";
import { useEffect, useState } from "react";
import { notificationHelper } from "../../../shared/utils/notificationHelper";
import { useNavigate } from "react-router-dom";
import productApi from "../api/productApi";
import productCategoryApi from "../api/productCategoryApi";
import { Modal } from "antd";
import { productValidationSchema } from "../untils/validation";
import inputHelper from "../../../shared/utils/inputHelper";

function ProductBtnSave({product, ...props}) {
    const { showModal } = useModal(); 
    const navigate = useNavigate();

    const handleSave = (data) => {
        productApi.saveProduct(data)
            .then((response) => {
                notificationHelper.showSuccessNotification({ description: "Successfully created product" });
                navigate(0);
                window.open("/products/" + response.data.data.id, "_blank", "noopener,noreferrer");
            })
            .catch((err) => {
                notificationHelper.showErrorNotification({ description: "Cannot create product" });
            });
    }

    const handleClick = () => {
        showModal({
            title: "Create new Product",
            body: (<FormBodySaveProduct />),
            onSave: handleSave
        })
    }

    return <SharedBtn.BtnSave label="Add new" onClick={handleClick} {...props}/>
}

function ProductBtnEdit({product, ...props}) {
    const { showModal } = useModal(); 
    const navigate = useNavigate();

    const handleSave = (data) => {
        productApi.editProduct(data)
            .then((response) => {
                notificationHelper.showSuccessNotification({ description: "Successfully updated product" });
                setTimeout(() => navigate(0), 1000);
            })
            .catch((err) => {
                notificationHelper.showErrorNotification({ description: "Cannot update product" });
            });
    }

    const handleClick = () => {
        showModal({
            title: <div>Edit product: {product.name}</div>,
            body: (<FormBodySaveProduct product={product}/>),
            onSave: handleSave
        })
    }

    return <SharedBtn.BtnEdit label="Edit" onClick={handleClick} {...props}/>
}


function FormBodySaveProduct({product}) {
    const {setModalData} = useModal();
    const [categories, setCategories] = useState([]);

    const initialValues = {
		id: product?.id || 0,
		name: product?.name || "",
		description: product?.description || "",
        code: product?.code || "",
        uom: product?.uom || "",
        categoryId: product?.productCategory.id || 0
	};

    const formik = useFormik({
		initialValues: initialValues,
		validationSchema: productValidationSchema,
		onSubmit: (values) => {},
	});

     // Sync form data with ModalProvider
    useEffect(() => {
        setModalData(formik.values);
    }, [formik.values, setModalData]);

    // Get categories for options
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await productCategoryApi.getAllProductCategory();
                setCategories(response.data.data); 
            } catch (err) {
                notificationHelper.showErrorNotification({description : err.response.data.message})
            };
        }
        fetchCategories();
    }, []);

    const categoryOption = inputHelper.convertArrToSelectOption(categories);

    return (
        <SharedForm.FormBody>
            <SharedForm.FormBodyItem>
                <SharedInput.Label forName="name">Product name*</SharedInput.Label>
                <SharedInput.Text
                        name="name"
                        placeholder="Product name*"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                        error={formik.touched.name && formik.errors.name}
                    />
            </SharedForm.FormBodyItem>

            <SharedForm.FormBodyItem>
                <SharedInput.Label forName="code">Code*</SharedInput.Label>
                <SharedInput.Text
                        name="code"
                        placeholder="Product code*"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.code}
                        error={formik.touched.code && formik.errors.code}
                    />
            </SharedForm.FormBodyItem>

            <SharedForm.FormBodyItem>
                <SharedInput.Label forName="categoryId">Category</SharedInput.Label>
                <SharedInput.SelectInput
					name="categoryId"
					showSearch
                    options={categoryOption}
                    style={{
                        width: '100%',
                    }}
                    onChange={(value) => formik.setFieldValue("categoryId", value)}
					onBlur={formik.handleBlur}
					value={formik.values.categoryId}
                    error={formik.touched.categoryId && formik.errors.categoryId}
				/>
            </SharedForm.FormBodyItem>		

            <SharedForm.FormBodyItem>
                <SharedInput.Label forName="uom">Unit*</SharedInput.Label>
                <SharedInput.Text
                        name="uom"
                        placeholder="Product unit*"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.uom}
                        error={formik.touched.uom && formik.errors.uom}
                    />
            </SharedForm.FormBodyItem>
          
            <SharedForm.FormBodyItem>
                <SharedInput.Label forName="description">Description</SharedInput.Label>
                <SharedInput.TextAreaCustom
					name="description"
					placeholder="Description"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.description}
					error={formik.touched.description && formik.errors.description}
				/>
            </SharedForm.FormBodyItem>		
        </SharedForm.FormBody>
    )
}

function ProductBtnDelete({product}) {
    const navigate = useNavigate();

    const onDelete = (product) => {
        productApi.deleteProduct(product)
            .then((response) => {
                notificationHelper.showSuccessNotification({ description: "Successfully delete product" });
                setTimeout(() => navigate(0), 1000);
            })
            .catch((err) => {
                notificationHelper.showErrorNotification({ description: "Cannot delete product" });
            });
    }

    const openConfirmModal = () => {
        Modal.confirm({
			title: "Confirm delete",
			content: <div>Do you really want to delete product: <b>{product.name}</b> ?</div>,
			onOk: () => onDelete(product),
		});
    }

    return <SharedBtn.BtnDelete onClick={openConfirmModal}/>
}

export {
    ProductBtnSave, 
    ProductBtnEdit,
    ProductBtnDelete
};