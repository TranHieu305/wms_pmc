import { useEffect, useState } from "react";
import { useModal } from "../../../shared/components/ModalProvider";
import { notificationHelper } from "../../../shared/utils/notificationHelper";
import Enum from "../../../shared/utils/enum";
import { useFormik } from "formik";
import { Button, Col, Divider, Row } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import warehouseApi from "../../Warehouse/api/warehouseApi";
import batchValidationSchema, { batchUpdateValidationSchema } from "../untils/validation";
import inputHelper from "../../../shared/utils/inputHelper";
import { SharedForm, SharedInput } from "../../../shared/components/common";
import moment from "moment-timezone";


function FormCreateFromOrder({order}) {
    const {setModalData} = useModal();
    const [warehouses, setWarehouses] = useState([]);

    // Get warehouses for options
    useEffect(() => {
        const fetchWarehouses = async () => {
            try {
                const response = await warehouseApi.getAllWarehouses();
                setWarehouses(response.data.data); 
            } catch (err) {
                notificationHelper.showErrorNotification({description : err.response.data.message})
            };
        }
        fetchWarehouses();
    }, []);

    console.log(order);

    // Map orderitems to batchitems
    const initialBatchItems = order.orderItems.map(item => {
        const batchItem = {
            id: 0,
            key: item.id,
            orderItemId: item.id,
            productName: item.product.name,
            uom: item.product.uom,
            quantity: item.quantity,
            weight: 0,
        }
       return batchItem;
    })

    const initialValues = {
		id: 0,
		name: "",
        warehouseId: null,
        orderId : order.id,
		inventoryAction: Enum.InventoryAction.IMPORT,
		batchDate: null,
		batchItems: initialBatchItems,
	};

    const formik = useFormik({
		initialValues: initialValues,
		validationSchema: batchValidationSchema,
		onSubmit: (values) => {},
	});
    
    const [batchItems, setBatchItenms] = useState(formik.values.batchItems);

    // Sync form data with ModalProvider
    useEffect(() => {
        setModalData(formik.values);
    }, [formik.values, setModalData]);

    const actionOptions = inputHelper.convertEnumToSelectOption(Enum.InventoryAction);

    // Handle delete order_item
	const handleDeleteItem = (key) => {
		const newItems = batchItems.filter((item) => item.key !== key);
		setBatchItenms(newItems.length === 0 ? [] : newItems);
		formik.setFieldValue("batchItems", newItems);
	};

    // Handle change quantity order item
    const handleChangeQuantity = (key, quantity) => {
		// find Order Item
		const itemSelect = batchItems.find((item) => item.key === key);

		// Update quantity
		itemSelect.quantity = quantity;

		// Update
		updateItemsWithNewItem(itemSelect);
	};

    // Handle change quantity order item
    const handleChangeWeight = (key, weight) => {
		// find Order Item
		const itemSelect = batchItems.find((item) => item.key === key);

		// Update quantity
		itemSelect.weight = weight;

		// Update
		updateItemsWithNewItem(itemSelect);
	};

    // Handle update batchItems when an order_item change
    const updateItemsWithNewItem = (newItem) => {
        const newItems = batchItems.map((item) => {
			if (item.key === newItem.key) {
				return { ...newItem };
			}
			return item;
		});
		setBatchItenms(newItems);
		formik.setFieldValue("batchItems", newItems);
    }

    const warehouseOptions = inputHelper.convertArrToSelectOption(warehouses);

    return (
        <SharedForm.FormBody>
            {/* Name */}
            <SharedForm.FormBodyItem>
                <SharedInput.Label forName="name">Batch name*</SharedInput.Label>
                <SharedInput.Text
                        name="name"
                        placeholder="Batch name*"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                        error={formik.touched.name && formik.errors.name}
                    />
            </SharedForm.FormBodyItem>

            {/* Partner and action */}
            <Row gutter={24}>
                <Col span={12}>
                    <SharedForm.FormBodyItem>
                        <SharedInput.Label forName="partnerId">Batch partner</SharedInput.Label>
                        <SharedInput.Text
                            value={order.partner.name}
                            disabled
                        />
                    </SharedForm.FormBodyItem>	
                </Col>
                <Col span={12}>
                    <SharedForm.FormBodyItem>
                        <SharedInput.Label forName="inventoryAction">Batch type</SharedInput.Label>
                        <SharedInput.SelectInput
                            name="inventoryAction"
                            onChange={(value) => formik.setFieldValue("inventoryAction", value)}
                            onBlur={formik.handleBlur}
                            value={formik.values.inventoryAction}
                            options={actionOptions}
                            style={{
                                width: '100%',
                            }}
                        />
                    </SharedForm.FormBodyItem>			
                </Col>
            </Row>
            {/* Warehouse and batchDate */}
            <Row gutter={24}>
                <Col span={12}>
                    <SharedForm.FormBodyItem>
                        <SharedInput.Label forName="warehouseId">Batch warehouse</SharedInput.Label>
                        <SharedInput.SelectInput
                            name="warehouseId"
                            showSearch
                            options={warehouseOptions}
                            style={{
                                width: '100%',
                            }}
                            placeholder="Please choose a warehouse"
                            onChange={(value) => formik.setFieldValue("warehouseId", value)}
                            onBlur={formik.handleBlur}
                            value={formik.values.partnerId}
                            error={formik.touched.partnerId && formik.errors.partnerId}
                        />
                    </SharedForm.FormBodyItem>	
                </Col>
                <Col span={12}>
                    <SharedForm.FormBodyItem>
                        <SharedInput.Label forName="batchDate">Batch date*</SharedInput.Label>
                        <SharedInput.DatePickerCustom
                             format="DD/MM/YYYY"
                             value={formik.values.batchDate}
                             onChange={(date) => formik.setFieldValue("batchDate", date)}
                             style={{
                                 width: '100%',
                             }}
                        />
                    </SharedForm.FormBodyItem>			
                </Col>
            </Row>

            {/* Batch item */}
            <Divider orientation="left" orientationMargin={0}>Batch Items</Divider>
            <Row gutter={24}>
                <Col span={8}>
                    <SharedInput.Label>Product</SharedInput.Label>
                </Col>
                {/* Category */}
                <Col span={4}>
                    <SharedInput.Label>Unit</SharedInput.Label>
                </Col>
                {/* Unit */}
                <Col span={4}>
                    <SharedInput.Label>Quantity</SharedInput.Label>
                </Col>
                {/* Quantity */}
                <Col span={4}>
                    <SharedInput.Label>Weight(Kg)</SharedInput.Label>
                </Col>
                {/* Delete button */}
                <Col span={4}>
                </Col>
            </Row>
            {
                batchItems.map((item) => (
                    <Row gutter={24} key={item.key }>
                    {/* Product */}
                    <Col span={8}>
                        <SharedInput.Text
                            value={item.productName}
                            disabled
                        />
                    </Col>
                    {/* Category */}
                    <Col span={4}>
                        <SharedInput.Text 
                            name="uom"
                            value={item.uom}
                            disabled
                        />
                    </Col>
                    {/* Unit */}
                    <Col span={4}>
                        <SharedInput.Text 
                            type="number"
                            name="quantity"
                            value={item.quantity}
                            onChange={(e) => handleChangeQuantity(item.key, e.target.value)}
                        />
                    </Col>
                    {/* Quantity */}
                    <Col span={4}>
                        <SharedInput.Text 
                            type="number"
                            name="weight"
                            value={item.weight}
                            onChange={(e) => handleChangeWeight(item.key, e.target.value)}
                        />
                    </Col>
                    {/* Delete button */}
                        <Col span={4}>
                            <Button danger onClick={() => handleDeleteItem(item.key)}>
                                <DeleteOutlined />
                            </Button>
                        </Col>
                    </Row>
                ))
            }
        </SharedForm.FormBody>
    )
}

function FormUpdateBatch({batch}) {
    const {setModalData} = useModal();

    const initialValues = {
		id: batch.id,
		name: batch.name,
		batchDate: batch.batchDate ? moment(batch.batchDate) : null,
	};

    const formik = useFormik({
		initialValues: initialValues,
		validationSchema: batchUpdateValidationSchema,
		onSubmit: (values) => {},
	});

    // Sync form data with ModalProvider
    useEffect(() => {
        setModalData(formik.values);
    }, [formik.values, setModalData]);

    return (
        <SharedForm.FormBodyItem>
            <SharedForm.FormBodyItem>
            <SharedInput.Label forName="name">Batch name*</SharedInput.Label>
                <SharedInput.Text
                        name="name"
                        placeholder="Batch name*"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                        error={formik.touched.name && formik.errors.name}
                    />
            </SharedForm.FormBodyItem>

            <SharedForm.FormBodyItem>
                        <SharedInput.Label forName="batchDate">Batch date*</SharedInput.Label>
                        <SharedInput.DatePickerCustom
                             format="DD/MM/YYYY"
                             value={formik.values.batchDate}
                             onChange={(date) => formik.setFieldValue("batchDate", date)}
                             style={{
                                 width: '100%',
                             }}
                        />
                    </SharedForm.FormBodyItem>	
        </SharedForm.FormBodyItem>
    )
}

export {FormCreateFromOrder, FormUpdateBatch}