import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import InputGlobal from "../ui/input";

function OrderItemBoardForm({ formik, initialItemValues, orderItemsValues }) {
	const handleAddItem = (formik) => {
		formik.setValues((prevValues) => ({
			...prevValues,
			orderItems: [...prevValues.orderItems, initialItemValues],
		}));
	};

	const handleRemoveItem = (formik, index) => {
		formik.setValues((prevValues) => {
			const prevOrderItems = prevValues.orderItems;
			let afterOrderItems;
			if (prevOrderItems.length === 1) {
				afterOrderItems = [initialItemValues];
			} else {
				afterOrderItems = prevOrderItems
					.slice(0, index)
					.concat(prevOrderItems.slice(index + 1));
			}
			return {
				...prevValues,
				orderItems: afterOrderItems,
			};
		});
	};

	const orderItems = formik.values.orderItems;
	console.log(formik.touched);

	return (
		<div className="orderitem-form">
			{orderItems.map((item, index) => (
				<div key={index} className="orderitem-rows">
					<div className="row">
						<label htmlFor={`name${index}`}>Product name*</label>
						<InputGlobal
							placeholder="Item name*"
							name={`orderItems[${index}].name`}
							id={`name${index}`}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={orderItems[index].name}
							error={
								formik.touched.orderItems?.[index]?.name &&
								formik.errors.orderItems?.[index]?.name
							}
						/>
					</div>

					<div className="row">
						<label htmlFor={`uom${index}`}>Uom*</label>
						<InputGlobal
							placeholder="Uom*"
							id={`uom${index}`}
							name={`orderItems[${index}].uom`}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={orderItems[index].uom}
							error={
								formik.touched.orderItems?.[index]?.uom &&
								formik.errors.orderItems?.[index]?.uom
							}
						/>
					</div>
					<div className="row">
						<label htmlFor={`quantity${index}`}>Quantity*</label>
						<InputGlobal
							placeholder="Quantity*"
							id={`quantity${index}`}
							name={`orderItems[${index}].quantity`}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={orderItems[index].quantity}
							error={
								formik.touched.orderItems?.[index]?.quantity &&
								formik.errors.orderItems?.[index]?.quantity
							}
						/>
					</div>

					<Button
						type="primary"
						icon={<DeleteOutlined />}
						size={24}
						danger
						onClick={() => handleRemoveItem(formik, index)}
						className="drop-item-button"
					></Button>
				</div>
			))}

			<Button type="link" icon={<PlusOutlined />} onClick={() => handleAddItem(formik)}>
				Add More Item
			</Button>
		</div>
	);
}

export default OrderItemBoardForm;
