import { Button } from "antd";
import { useFormik } from "formik";
import InputGlobal from "../ui/input";
import { notificationError, notificationSuccess } from "../../utils/notification";
import axios from "axios";
import { WAREHOUSE_API_ENDPOINT } from "../../apis/config";
import { validationWarehouseSchema } from "../../validations/warehouse";
import { useLoaderData, useNavigate } from "react-router-dom";

export default function FormCreate() {
	const navigate = useNavigate();
	const data = useLoaderData();
	const warehouse = data?.data;

	const initialValues = {
		id: warehouse?.id || 0,
		name: warehouse?.name || "",
		description: warehouse?.description || "",
		address: warehouse?.address || "",
		supervisor: warehouse?.supervisor || "",
		longitude: warehouse?.longitude || 0,
		latitude: warehouse?.latitude || 0,
		status: warehouse?.status || "active",
	};

	const axiosMethod = warehouse ? axios.put : axios.post;
	const api_endpoint = warehouse
		? WAREHOUSE_API_ENDPOINT + `/${warehouse.id}`
		: WAREHOUSE_API_ENDPOINT;

	function handleCreate(values) {
		axiosMethod(api_endpoint, values)
			.then((response) => {
				notificationSuccess({ description: "Successfully created warehouse" });
				setTimeout(() => navigate("/warehouses"), 1000);
			})
			.catch((err) => {
				notificationError({ description: "Cannot created warehouse" });
			});
	}

	function handleCancel() {
		navigate("/warehouses");
	}

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: validationWarehouseSchema,
		onSubmit: handleCreate,
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
				<InputGlobal
					label="Description"
					key="description"
					id="description"
					name="description"
					placeholder="Warehouse description"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.description}
					error={formik.touched.description && formik.errors.description}
				/>

				<InputGlobal
					label="Address"
					key="address"
					id="address"
					name="address"
					placeholder="Warehouse address"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.address}
					error={formik.touched.address && formik.errors.address}
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
