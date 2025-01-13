import { useEffect, useState } from "react";
import { useModal } from "../../../shared/components/ModalProvider";
import partnerApi from "../../Partner/api/partnerApi";
import { notificationHelper } from "../../../shared/utils/notificationHelper";
import inputHelper from "../../../shared/utils/inputHelper";
import productApi from "../../Product/api/productApi";
import Enum from "../../../shared/utils/enum";
import { useFormik } from "formik";
import orderValidationShema, { orderItemAddValidationSchema, orderUpdateValidationSchema } from "../utils/validation";
import { SharedBtn, SharedForm, SharedInput } from "../../../shared/components/common";
import { Button, Col, Divider, Row } from "antd";
import moment from "moment-timezone";
import { DeleteOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const initialOrderItemValues = {
	id: 0,
	key: 0,
	productId: null,
    category: null,
    uom: null,
	quantity: 0,
};

function FormSaveOrder({setBeforeSave, order}) {
    const {setModalData} = useModal();
    const [partners, setPartners] = useState([]);
    const [products, setProducts] = useState([]);
    const users = useSelector((state) => state.users.userList);
    const loadingUsers = useSelector((state) => state.users.status === 'loading');
    const [approversText, setApproversText] = useState(inputHelper.covertIdsToUserMentions(order?.approverIds, users));
    const [participantsText, setParticipantsText] = useState(inputHelper.covertIdsToUserMentions(order?.participantIds, users));

    // Get categories for options
    useEffect(() => {
        const fetchPartners = async () => {
            try {
                const response = await partnerApi.getAllPartners();
                setPartners(response.data.data); 
            } catch (err) {
                notificationHelper.showErrorNotification({description : err.response.data.message})
            };
        }
        fetchPartners();
    }, []);

    // Get products for options
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await productApi.getAllProducts();
                setProducts(response.data.data); 
            } catch (err) {
                notificationHelper.showErrorNotification({description : err.response.data.message})
            };
        }
        fetchProducts();
    }, []);

    const initialValues = {
		id: order?.id || 0,
		name: order?.name || null,
		partnerId: order?.partnerId || null,
		inventoryAction: order?.inventoryAction || Enum.InventoryAction.IMPORT,
		orderDate: order?.orderDate ? moment(order?.orderDate) : null,
        expectedDeliveryDate: order?.expectedDeliveryDate
        ? moment(order?.expectedDeliveryDate)
        : null,
		orderItems: order?.orderItems || [initialOrderItemValues],
        approverIds: order?.approverIds || [],
        participantIds: order?.participantIds || []
	};

    
    const formik = useFormik({
		initialValues: initialValues,
		validationSchema: orderValidationShema,
		onSubmit: (values) => {
            // Not submit yet, submit function call at button
        },
	});

    // Sync form data with ModalProvider
    useEffect(() => {
        setModalData(formik.values);
    }, [formik.values, setModalData]);

    // BeforSave: validate
    useEffect(() => {
        if (setBeforeSave) {
            setBeforeSave(() => formik.submitForm());
        }
    }, [setBeforeSave, formik]);

    const [orderItems, setOrderItems] = useState(formik.values.orderItems);

    const partnerOptions = inputHelper.convertArrToSelectOption(partners);
    const productOptions = inputHelper.convertArrToSelectOption(products);
    const actionOptions = inputHelper.convertEnumToSelectOption(Enum.InventoryAction);

    // Handle add new order_item
    const handleAddItem = () => {
		const newItem = {
			...initialOrderItemValues,
			key: orderItems.length,
		};
		setOrderItems([...orderItems, newItem]);
		formik.setFieldValue("orderItems", [...orderItems, newItem]);
	};

    // Handle delete order_item
	const handleDeleteItem = (key) => {
		const newItems = orderItems.filter((item) => item.key !== key);
		setOrderItems(newItems.length === 0 ? [initialOrderItemValues] : newItems);
		formik.setFieldValue("orderItems", newItems);
	};

    // Handle select product at order item
    const handleSelectProduct = (key, productId) => {
        const itemSelect = orderItems.find((item) => item.key === key);
        const product = products.find(p => p.id === productId);
        if (product) {
            itemSelect.productName = product.name;
            itemSelect.uom = product.uom;
            itemSelect.category = product.productCategory?.name;
            itemSelect.productId = product.id;
        }

        // Update
        updateOrderItemsWithNewItem(itemSelect);
    }

    // Handle change quantity order item
    const handleChangeQuantity = (key, quantity) => {
		// find Order Item
		const itemSelect = orderItems.find((item) => item.key === key);

		// Update quantity
		itemSelect.quantity = quantity;

		// Update
		updateOrderItemsWithNewItem(itemSelect);
	};

    // Handle update orderItems when an order_item change
    const updateOrderItemsWithNewItem = (newItem) => {
        const newItems = orderItems.map((item) => {
			if (item.key === newItem.key) {
				return { ...newItem };
			}
			return item;
		});
		setOrderItems(newItems);
		formik.setFieldValue("orderItems", newItems);
    }

    return (
        <SharedForm.FormBody>
            {/* Name */}
            <SharedForm.FormBodyItem>
                <SharedInput.Label forName="name">Order name*</SharedInput.Label>
                <SharedInput.Text
                        name="name"
                        placeholder="Order name*"
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
                        <SharedInput.Label forName="partnerId">Order partner</SharedInput.Label>
                        <SharedInput.SelectInput
                            name="partnerId"
                            showSearch
                            options={partnerOptions}
                            style={{
                                width: '100%',
                            }}
                            placeholder="Please choose a partner"
                            onChange={(value) => formik.setFieldValue("partnerId", value)}
                            onBlur={formik.handleBlur}
                            value={formik.values.partnerId}
                            error={formik.touched.partnerId && formik.errors.partnerId}
                        />
                    </SharedForm.FormBodyItem>	
                </Col>
                <Col span={12}>
                    <SharedForm.FormBodyItem>
                        <SharedInput.Label forName="inventoryAction">Order type</SharedInput.Label>
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

            <Row gutter={24}>
                <Col span={12}>
                    <SharedForm.FormBodyItem>
                        <SharedInput.Label forName="approverIds">Approvers</SharedInput.Label>
                        <SharedInput.UserMention
                            name="approverIds"
                            placeholder="Please choose approvers"
                            loading={loadingUsers}
                            value={approversText}
                            onChange={(value) => {
                                formik.setFieldValue("approverIds", inputHelper.convertUserMentionsToIds(value, users))
                                setApproversText(value);
                            }}
                            onBlur={formik.handleBlur}
                            error={formik.touched.approverIds && formik.errors.approverIds}
                        />
                    </SharedForm.FormBodyItem>	
                </Col>
                <Col span={12}>
                    <SharedForm.FormBodyItem>
                        <SharedInput.Label forName="participantIds">Participants</SharedInput.Label>
                        <SharedInput.UserMention
                            name="participantIds"
                            placeholder="Please choose participants"
                            loading={loadingUsers}
                            value={participantsText}
                            onChange={(value) => {
                                formik.setFieldValue("participantIds", inputHelper.convertUserMentionsToIds(value, users))
                                setParticipantsText(value);
                            }}
                            onBlur={formik.handleBlur}
                            error={formik.touched.participantIds && formik.errors.participantIds}
                        />
                    </SharedForm.FormBodyItem>			
                </Col>
            </Row>
            
            {/* orderDate & expectedDeliveryDate */}
            <Row gutter={24}>
                <Col span={12}>
                    <SharedForm.FormBodyItem>
                        <SharedInput.Label forName="expectedDate">Order date</SharedInput.Label>
                        <SharedInput.DatePickerCustom 
                            format="DD/MM/YYYY"
                            value={formik.values.orderDate}
                            onChange={(date) => formik.setFieldValue("orderDate", date)}
                            style={{
                                width: '100%',
                            }}
                        />
                    </SharedForm.FormBodyItem>
                </Col>
                <Col span={12}>
                    <SharedForm.FormBodyItem>
                        <SharedInput.Label forName="expectedDeliveryDate">Expected delivery date</SharedInput.Label>
                        <SharedInput.DatePickerCustom 
                            format="DD/MM/YYYY"
                            value={formik.values.expectedDeliveryDate}
                            onChange={(date) => formik.setFieldValue("expectedDeliveryDate", date)}
                            style={{
                                width: '100%',
                            }}
                        />
                    </SharedForm.FormBodyItem>
                </Col>
            </Row>
            <Divider orientation="left" orientationMargin={0}>Order Items</Divider>
          
            {/* Order Item */}
            <Row gutter={24}>
                <Col span={8}>
                    <SharedInput.Label>Product</SharedInput.Label>
                </Col>
                {/* Category */}
                <Col span={4}>
                    <SharedInput.Label>Category</SharedInput.Label>
                </Col>
                {/* Unit */}
                <Col span={4}>
                    <SharedInput.Label>Unit</SharedInput.Label>
                </Col>
                {/* Quantity */}
                <Col span={4}>
                    <SharedInput.Label>Quantity</SharedInput.Label>
                </Col>
                {/* Delete button */}
                <Col span={4}>
                </Col>
            </Row>
            {
            orderItems.map((item) => (
                <Row gutter={24} key={item.key }>
                    {/* Product */}
                    <Col span={8}>
                        <SharedInput.SelectInput
                            name="productName"
                            showSearch
                            options={productOptions}
                            style={{
                                width: '100%',
                            }}
                            placeholder="Please choose a product"
                            onChange={(value) => handleSelectProduct(item.key, value)}
                            value={item.productId}
                        />
                    </Col>
                    {/* Category */}
                    <Col span={4}>
                        <SharedInput.Text 
                            name="category"
                            value={item.category}
                            disabled
                        />
                    </Col>
                    {/* Unit */}
                    <Col span={4}>
                        <SharedInput.Text 
                            name="uom"
                            disabled
                            value={item.uom}
                        />
                    </Col>
                    {/* Quantity */}
                    <Col span={4}>
                        <SharedInput.Text 
                            type="number"
                            name="quantity"
                            value={item.quantity}
                            onChange={(e) => handleChangeQuantity(item.key, e.target.value)}
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
            <SharedBtn.BtnSave 
                type="link"
                label="Add more item"
                onClick={handleAddItem}
            />
        </SharedForm.FormBody>
    )

}

function FormUpdateOrder({order}) {
    const {setModalData} = useModal();

    const initialValues = {
		id: order?.id || 0,
		name: order?.name || null,
		orderDate: order?.orderDate ? moment(order?.orderDate) : null,
        expectedDeliveryDate: order?.expectedDeliveryDate
        ? moment(order?.expectedDeliveryDate)
        : null,
	};

    const formik = useFormik({
		initialValues: initialValues,
		validationSchema: orderUpdateValidationSchema,
		onSubmit: (values) => {},
	});

    // Sync form data with ModalProvider
    useEffect(() => {
        setModalData(formik.values);
    }, [formik.values, setModalData]);

    return (
        <SharedForm.FormBody>
            {/* Name */}
            <SharedForm.FormBodyItem>
                <SharedInput.Label forName="name">Order name*</SharedInput.Label>
                <SharedInput.Text
                        name="name"
                        placeholder="Order name*"
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
                        <SharedInput.Label forName="partnerId">Order partner</SharedInput.Label>
                        <SharedInput.Text
                            value={order.partner?.name || "---"}
                            disabled
                        />
                    </SharedForm.FormBodyItem>	
                </Col>
                <Col span={12}>
                    <SharedForm.FormBodyItem>
                        <SharedInput.Label forName="inventoryAction">Order type</SharedInput.Label>
                        <SharedInput.Text
                            value={order.inventoryAction || "---"}
                            disabled
                        />
                    </SharedForm.FormBodyItem>			
                </Col>
            </Row>

            {/* orderDate & expectedDeliveryDate */}
            <Row gutter={24}>
                <Col span={12}>
                    <SharedForm.FormBodyItem>
                        <SharedInput.Label forName="expectedDate">Order date</SharedInput.Label>
                        <SharedInput.DatePickerCustom 
                            format="DD/MM/YYYY"
                            value={formik.values.orderDate}
                            onChange={(date) => formik.setFieldValue("orderDate", date)}
                            style={{
                                width: '100%',
                            }}
                        />
                    </SharedForm.FormBodyItem>
                </Col>
                <Col span={12}>
                    <SharedForm.FormBodyItem>
                        <SharedInput.Label forName="expectedDeliveryDate">Expected delivery date</SharedInput.Label>
                        <SharedInput.DatePickerCustom 
                            format="DD/MM/YYYY"
                            value={formik.values.expectedDeliveryDate}
                            onChange={(date) => formik.setFieldValue("expectedDeliveryDate", date)}
                            style={{
                                width: '100%',
                            }}
                        />
                    </SharedForm.FormBodyItem>
                </Col>
            </Row>
        </SharedForm.FormBody>
    )
}

function FormAddOrderItem({order}) {
    const {setModalData} = useModal();
    const [products, setProducts] = useState([]);

     // Get products for options
     useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await productApi.getAllProducts();
                setProducts(response.data.data); 
            } catch (err) {
                notificationHelper.showErrorNotification({description : err.response.data.message})
            };
        }
        fetchProducts();
    }, []);

    const initialValues = {
		id: 0,
        productId: null,
        category: null,
        uom: null,
        quantity: null,
        productName: null
	};

    const formik = useFormik({
		initialValues: initialValues,
		validationSchema: orderItemAddValidationSchema,
		onSubmit: (values) => {},
	});

    // Sync form data with ModalProvider
    useEffect(() => {
        setModalData(formik.values);
    }, [formik.values, setModalData]);

    const productOptions = inputHelper.convertArrToSelectOption(products);

    // Handle select product at order item
    const handleSelectProduct = (productId) => {
        const product = products.find(p => p.id === productId);
        if (product) {
            formik.setFieldValue("productId", product.id);
            formik.setFieldValue("productName", product.name);
            formik.setFieldValue("uom", product.uom);
            formik.setFieldValue("category", product.productCategory?.name);
        }
    }

    return  (
        <SharedForm.FormBody>
            <SharedForm.FormBodyItem>
                <SharedInput.Label forName="name">Order name*</SharedInput.Label>
                <SharedInput.Text
                        value={order.name}
                        disabled
                    />
            </SharedForm.FormBodyItem>

            <Row gutter={24}>
                <Col span={12}>
                    <SharedForm.FormBodyItem>
                        <SharedInput.Label forName="productId">Product</SharedInput.Label>
                        <SharedInput.SelectInput
                            name="productId"
                            showSearch
                            options={productOptions}
                            style={{
                                width: '100%',
                            }}
                            placeholder="Please choose a product"
                            onChange={(value) => handleSelectProduct(value)}
                            value={formik.values.productId}
                        />
                 </SharedForm.FormBodyItem>
                </Col>
                <Col span={12}>
                    <SharedInput.Label forName="productId">Category</SharedInput.Label>
                    <SharedInput.Text
                        value={formik.values.category}
                        disabled
                    />
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={12}>
                    <SharedForm.FormBodyItem>
                        <SharedInput.Label forName="quantity">Quantity*</SharedInput.Label>
                        <SharedInput.Text
                            name="quantity"
                            type="number"
                            placeholder="Quangtity*"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.quantity}
                            error={formik.touched.quantity && formik.errors.quantity}
                        />
                </SharedForm.FormBodyItem>
                </Col>
                <Col span={12}>
                    <SharedInput.Label forName="productId">Unit</SharedInput.Label>
                    <SharedInput.Text
                        value={formik.values.uom}
                        disabled
                    />
                </Col>
            </Row>
        </SharedForm.FormBody>
    )
}

export {
    FormSaveOrder, 
    FormUpdateOrder,
    FormAddOrderItem
}