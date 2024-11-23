import React, { useState } from "react";
import { useFormik } from "formik";
import { Button, Col, DatePicker, Divider, Flex, Input, Row, Table, Typography } from "antd";
import {
	ArrowLeftOutlined,
	DeleteOutlined,
	EditOutlined,
	PlusCircleOutlined,
} from "@ant-design/icons";
import InputGlobal, { SelectGlobal } from "../../components/ui/input";
import moment from "moment-timezone";
import { useSelector } from "react-redux";
import FormatHelper from "../../utils/FormatHelper";
import DataHelper from "../../utils/DataHelper";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { DetailRow } from "../../components/ui/detail";
import axios from "axios";
import { MATERIAL_ORDER_API_ENDPOINT } from "../../utils/constants/apiEndpoint";
import { notificationError, notificationSuccess } from "../../utils/notification";

const { Title } = Typography;

const initialOrderItemValues = {
	id: 0,
	productName: "",
	productUom: "",
	productId: 0,
	quantity: 0,
	productPrice: 0,
	key: 0,
};

function LotMaterialSavePage() {
	const { order, warehouse, lot } = useLoaderData();
	console.log(warehouse);

	const isUpdate = lot ? true : false;

	const warehouseOptions = DataHelper.getOptionsFromArr(warehouse, "---Please select warehouse---");


	const initialValues = {
		id: detailOrder?.id || 0,
		name: detailOrder?.name || "",
		supplierId: detailOrder?.supplierId || 0,
		orderDate: detailOrder?.orderDate ? detailOrder?.orderDate : null,
		expectedDate: detailOrder?.expectedDate ? detailOrder?.expectedDate : null,
		orderItems: detailOrder?.orderItems || [initialOrderItemValues],
	};

	const axiosMethod = isUpdate ? axios.put : axios.post;

	async function handleCreate(values) {
		try {
			const response = await axiosMethod(MATERIAL_ORDER_API_ENDPOINT, values); // call api
			const { data: responseCategory } = response.data;

			navigate("/material-orders/" + responseCategory.id);
			notificationSuccess({
				message: "Save sucessfully",
			});
		} catch (error) {
			notificationError({
				message: "Create failed",
				description: error.response.data.message,
			});
		}
	}

	const formik = useFormik({
		initialValues: initialValues,
		// validationSchema: validationCustomerSchema,
		onSubmit: handleCreate,
	});

	const [orderItems, setOrderItems] = useState(formik.values.orderItems);

	const handleAddItem = () => {
		const newItem = {
			...initialOrderItemValues,
			key: orderItems.length,
		};
		setOrderItems([...orderItems, newItem]);
		formik.setFieldValue("orderItems", [...orderItems, newItem]);
	};
	const handleDeleteItem = (key) => {
		const newItems = orderItems.filter((item) => item.key !== key);
		setOrderItems(newItems.length === 0 ? [initialOrderItemValues] : newItems);
		formik.setFieldValue("orderItems", newItems);
	};

	const handleSelectProduct = (key, productId) => {
		if (formik.values.supplierId === 0) {
			return notificationError({
				message: "Supplier Required",
				description: "Please select supplier",
			});
		}
		let itemSelect = orderItems.find((item) => item.key === key);

		if (productId !== 0) {
			// Get product selected
			const product = DataHelper.findObjFromArrById(allProducts, productId);

			// Get product price
			const price = currentPrices.find(
				(price) =>
					price.productId === product.id && price.partnerId === formik.values.supplierId
			);

			if (!price) {
				return notificationError({
					message: "Price Required",
					description: "Please add a price for the selected product before proceeding",
				});
			}

			// Set field
			itemSelect.productName = product.name;
			itemSelect.productId = productId;
			itemSelect.productUom = product.uom;
			itemSelect.productPrice = price?.price ? price.price : 0;
		} else {
			itemSelect = { ...initialOrderItemValues };
		}

		// Update
		const newItems = orderItems.map((item) => {
			if (item.key === key) {
				return { ...itemSelect };
			}
			return item;
		});
		setOrderItems(newItems);
		formik.setFieldValue("orderItems", newItems);
	};

	const handleChangeQuantity = (key, quantity) => {
		// find Order Item
		const itemSelect = orderItems.find((item) => item.key === key);

		// Update quantity
		itemSelect.quantity = quantity;

		// Update
		const newItems = orderItems.map((item) => {
			if (item.key === key) {
				return { ...itemSelect };
			}
			return item;
		});
		setOrderItems(newItems);
		formik.setFieldValue("orderItems", newItems);
	};

	const subTotal = orderItems.reduce(
		(accumulator, item) => accumulator + item.quantity * item.productPrice,
		0
	);

	const tax = 0.08;
	const total = subTotal + subTotal * tax;

	const columns = [
		{
			title: "Product",
			dataIndex: "productName",
			key: "productName",
			width: "30%",
			render: (text, record) => (
				<SelectGlobal
					allowSearch={true}
					key={`productName-${record.key}`}
					value={record.product ? record.product.id : record.productId}
					onChange={(value) => handleSelectProduct(record.key, value)}
					options={productOptions}
				/>
			),
		},
		{
			title: "Quantity",
			dataIndex: "quantity",
			key: "quantity",
			width: "15%",
			render: (text, record) => (
				<Input
					type="number"
					value={record.quantity}
					onChange={(e) => handleChangeQuantity(record.key, e.target.value)}
				/>
			),
		},

		{
			title: "Uom",
			dataIndex: "productUom",
			key: "productUom",
			render: (text, record) => <Input disabled={true} value={record.productUom} />,
			width: "10%",
		},
		{
			title: "Unit Price",
			dataIndex: "productPrice",
			key: "productPrice",
			render: (text, record) => (
				<Input disabled={true} value={FormatHelper.formatCurrency(record.productPrice)} />
			),
		},
		{
			title: "Amount",
			dataIndex: "productPrice",
			key: "productPrice",
			render: (text, record) => (
				<Input
					disabled={true}
					value={FormatHelper.formatCurrency(record.productPrice * record.quantity)}
				/>
			),
		},
		{
			title: "",
			render: (text, record) => (
				<Button danger onClick={() => handleDeleteItem(record.key)}>
					<DeleteOutlined />
				</Button>
			),
			width: "10%",
		},
	];

	return (
		<div className="material-order-add-edit-page">
			<div style={{ marginBottom: 20 }}>
				{isUpdate ? (
					<Link to={"/material-orders/" + detailOrder.id}>
						<Button
							type="link"
							icon={<ArrowLeftOutlined />}
							style={{ paddingLeft: "0px" }}
						>
							Order detail
						</Button>
					</Link>
				) : (
					<Link to="/material-orders">
						<Button
							type="link"
							icon={<ArrowLeftOutlined />}
							style={{ paddingLeft: "0px" }}
						>
							Material Orders
						</Button>
					</Link>
				)}
				<Flex gap="small" wrap justify="space-between" align="center">
					<h1 style={{ margin: 0 }}>
						{isUpdate ? `Edit order: ${detailOrder.name}` : "Create new order"}
					</h1>

					<Flex gap="small">
						<Button>Cancel</Button>
						<Button type="primary" htmlType="submit" onClick={formik.handleSubmit}>
							{isUpdate ? (
								<>
									<EditOutlined /> Save change
								</>
							) : (
								<>
									<PlusCircleOutlined /> Create
								</>
							)}
						</Button>
					</Flex>
				</Flex>
			</div>
			<div className="wrapper">
				<Title level={3} strong={true} style={{ margin: 0, marginBottom: 20 }}>
					Basic Information
				</Title>
				<form className="form">
					<Row gutter={18} style={{ alignItems: "flex-end" }}>
						<Col span={12}>
							<SelectGlobal
								label="Supplier"
								key="supplierId"
								disabled={isUpdate ? true : undefined}
								value={formik.values.supplierId}
								onChange={(value) => formik.setFieldValue("supplierId", value)}
								options={supplierOptions}
							/>
						</Col>
						<Col span={6}>
							{/* <Button type="primary">
								<PlusOutlined /> Add new supplier
							</Button> */}
						</Col>
					</Row>
					<Row gutter={24} style={{ alignItems: "flex-end", marginTop: "15px" }}>
						<Col span={12}>
							<InputGlobal
								label="Order Name"
								key="name"
								id="name"
								name="name"
								placeholder="Material Order Name"
								value={formik.values.name}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							></InputGlobal>
						</Col>
						<Col span={6}>
							<label
								style={{ display: "block", marginBottom: 9 }}
								htmlFor="orderDate"
							>
								<strong>Order Date</strong>
							</label>
							<DatePicker
								key="orderDate"
								id="orderDate"
								format="DD/MM/YYYY"
								value={
									formik.values.orderDate
										? moment(formik.values.orderDate, "DD/MM/YYYY")
										: null
								}
								style={{ width: "100%" }}
								onChange={(date, dateString) =>
									formik.setFieldValue(
										"orderDate",
										date ? date.format("DD/MM/YYYY") : null
									)
								}
							/>
						</Col>
						<Col span={6}>
							<label
								style={{ display: "block", marginBottom: 9 }}
								htmlFor="orderDate"
							>
								<strong>Expected Date</strong>
							</label>
							<DatePicker
								key="expectedDate"
								id="expectedDate"
								format="DD/MM/YYYY"
								value={
									formik.values.expectedDate
										? moment(formik.values.expectedDate, "DD/MM/YYYY")
										: null
								}
								style={{ width: "100%" }}
								onChange={(date, dateString) =>
									formik.setFieldValue(
										"expectedDate",
										date ? date.format("DD/MM/YYYY") : null
									)
								}
							/>
						</Col>
					</Row>
					<Divider />

					{/* -------- Order items list -------- */}
					<Flex gap="small" wrap justify="space-between" align="center">
						<Title level={3} strong={true}>
							Order Details
						</Title>
					</Flex>
					<Table
						pagination={false}
						dataSource={orderItems}
						columns={columns}
						rowKey="key"
					/>
					<Button
						style={{ marginTop: 10, color: "#1677ff" }}
						onClick={handleAddItem}
						type="text"
					>
						<PlusCircleOutlined /> Add More Item
					</Button>
					<Divider />

					<Row gutter={16} style={{ flexDirection: "row-reverse", marginRight: "100px" }}>
						<Col span={8}>
							<div className="wrapper">
								<div className="order-information-table">
									<DetailRow
										title="SubTotal"
										data={FormatHelper.formatCurrency(subTotal)}
									/>
									<DetailRow
										title="Tax(8%)"
										data={FormatHelper.formatTaxRate(tax)}
									/>
									<Divider />
									<DetailRow
										title="Total"
										data={FormatHelper.formatCurrency(total)}
										main
									/>
								</div>
							</div>
						</Col>
					</Row>
				</form>
			</div>
		</div>
	);
}

export { LotMaterialSavePage };
