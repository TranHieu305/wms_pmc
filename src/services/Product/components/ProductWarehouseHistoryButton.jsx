import { useModal } from "../../../shared/components/ModalProvider";
import { useFormik } from "formik";
import { SharedForm, SharedInput } from "../../../shared/components/common";
import { useEffect, useState } from "react";
import { notificationHelper } from "../../../shared/utils/notificationHelper";
import { useNavigate } from "react-router-dom";
import productWarehouseHistoryApi from "../api/productWarehouseHistoryApi";
import { Button } from "antd";
import { pwhValidationSchema } from "../untils/validation";
import productApi from "../api/productApi";
import inputHelper from "../../../shared/utils/inputHelper";
import Enum from "../../../shared/utils/enum";

function PWHBtnImport({warehouse, ...props}) {
    const { showModal } = useModal(); 
    const navigate = useNavigate();

    const handleSave = (data) => {
        productWarehouseHistoryApi.save(data)
            .then((response) => {
                notificationHelper.showSuccessNotification({ description: "Successfully import product" });
                navigate(0);
            })
            .catch((err) => {
                notificationHelper.showErrorNotification({ description: "Cannot import product" });
            });
    }

    const handleClick = () => {
        showModal({
            title: "Import product to warehouse",
            body: (
            <FormBodyManageProductForWarehouse 
                warehouse={warehouse} 
                inventoryAction={Enum.InventoryAction.IMPORT} 
                />
            ),
            onSave: handleSave
        })
    }

    return <Button onClick={handleClick} type="dash" {...props}>Import</Button>
}

function PWHBtnExport({warehouse, ...props}) {
    const { showModal } = useModal(); 
    const navigate = useNavigate();

    const handleSave = (data) => {
        productWarehouseHistoryApi.save(data)
            .then((response) => {
                notificationHelper.showSuccessNotification({ description: "Successfully export product" });
                navigate(0);
            })
            .catch((err) => {
                notificationHelper.showErrorNotification({ description: "Cannot export product" });
            });
    }

    const handleClick = () => {
        showModal({
            title: "Export product from warehouse",
            body: (
            <FormBodyManageProductForWarehouse 
                warehouse={warehouse}
                inventoryAction={Enum.InventoryAction.EXPORT}
                />
            ),
            onSave: handleSave
        })
    }

    return <Button onClick={handleClick} type="dash" {...props}>Export</Button>
}

function FormBodyManageProductForWarehouse({warehouse, inventoryAction}) {
    const {setModalData} = useModal();
    const [products, setProducts] = useState([]);

    const initialValues = {
		id: 0,
        productId: null,
        warehouseId: warehouse.id,
        inventoryAction: inventoryAction,
        quantity: 0,
		description: "",
	};

    const formik = useFormik({
		initialValues: initialValues,
		validationSchema: pwhValidationSchema,
		onSubmit: (values) => {},
	});

     // Sync form data with ModalProvider
    useEffect(() => {
        setModalData(formik.values);
    }, [formik.values, setModalData]);

    // Get products for options
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await productApi.getAllProducts();
                setProducts(response.data.data); 
            } catch (err) {
                notificationHelper.showErrorNotification({description : err.response.data.message})
            };
        }
        fetchCategories();
    }, []);

    const productOptions = inputHelper.convertArrToSelectOption(products);

    return (
        <SharedForm.FormBody>
            <SharedForm.FormBodyItem>
                <SharedInput.Label forName="warehouse">Warehouse</SharedInput.Label>
                <SharedInput.Text
                        name="warehouseId"
                        value={formik.values.warehouseId}
                        disabled
                    />
            </SharedForm.FormBodyItem>

            <SharedForm.FormBodyItem>
                <SharedInput.Label forName="action">Action</SharedInput.Label>
                <SharedInput.Text
                        name="inventoryAction"
                        value={formik.values.inventoryAction}
                        disabled
                    />
            </SharedForm.FormBodyItem>

            <SharedForm.FormBodyItem>
                <SharedInput.Label forName="productId">Product*</SharedInput.Label>
                <SharedInput.SelectInput
					name="productId"
                    placeholder="Please choose a product"
					showSearch
                    options={productOptions}
                    style={{
                        width: '100%',
                    }}
                    onChange={(value) => formik.setFieldValue("productId", value)}
					onBlur={formik.handleBlur}
					value={formik.values.productId}
                    error={formik.touched.productId && formik.errors.productId}
				/>
            </SharedForm.FormBodyItem>		

            <SharedForm.FormBodyItem>
                <SharedInput.Label forName="quantity">Quantity*</SharedInput.Label>
                <SharedInput.Text
                        name="quantity"
                        placeholder="Quantity*"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.quantity}
                        error={formik.touched.quantity && formik.errors.quantity}
                    />
            </SharedForm.FormBodyItem>
          
            <SharedForm.FormBodyItem>
                <SharedInput.Label forName="description">Description*</SharedInput.Label>
                <SharedInput.TextAreaCustom
					name="description"
					placeholder="Description*"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.description}
					error={formik.touched.description && formik.errors.description}
				/>
            </SharedForm.FormBodyItem>		
        </SharedForm.FormBody>
    )
}

export {PWHBtnExport, PWHBtnImport}