import InputGlobal from "../ui/input";
import { useFormik } from "formik";
import { useState } from "react";
import OrderItemBoardForm from "../orderitem/forms";
import { Button } from "antd";
import { validationMaterialOrderSchema } from "../../validations";

const initialOrderItemValues = {
	name: "",
	uom: "",
	quantity: "",
};

function FormSave() {
	const [orderItems, setOrderItems] = useState([initialOrderItemValues]);

	const handleCancel = () => {};
	const handleSave = (values) => {
		console.log("values:", values);
	};

	const initialMaterialOrderValues = {
		name: "",
		orderDate: "",
		expectedDate: "",
		actualDate: "",
		orderItems: orderItems,
	};

	const formik = useFormik({
		initialValues: initialMaterialOrderValues,
		validationSchema: validationMaterialOrderSchema,
		onSubmit: handleSave,
	});

	return (
		<div className="form-wrapper">
			<form onSubmit={formik.handleSubmit} className="form">
				<InputGlobal
					label="Name"
					key="name"
					id="name"
					name="name"
					placeholder="Warehouse name"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.name}
					error={formik.touched.name && formik.errors.name}
				/>
				<OrderItemBoardForm
					formik={formik}
					orderItems={orderItems}
					setOrderItems={setOrderItems}
					initialItemValues={initialOrderItemValues}
					orderItemsValues={formik.values.orderItems}
				/>

				<div className="action-wrapper">
					<Button type="dash" htmlType="cancel" onClick={handleCancel}>
						Cancel
					</Button>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</div>
			</form>
		</div>
	);
}

export { FormSave };
