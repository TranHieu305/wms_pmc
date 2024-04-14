import { Button } from "antd";
import { useFormik } from "formik";
import InputGlobal from "../ui/input";
import { notificationError, notificationSuccess } from "../../utils/notification";
import axios from "axios";
import { CUSTOMER_API_ENDPOINT } from "../../apis/config";
import { validationCustomerSchema } from "../../validations";
import { useLoaderData, useNavigate } from "react-router-dom";

export default function FormCreate() {
	const navigate = useNavigate();
	const data = useLoaderData();
	const customer = data?.data;

	const initialValues = {
		id: customer?.id || 0,
		name: customer?.name || "",
		description: customer?.description || "",
		address: customer?.address || "",
		email: customer?.email || "",
		phone: customer?.phone || "",
		longitude: customer?.longitude || 0,
		latitude: customer?.latitude || 0,
	};

	const axiosMethod = customer ? axios.put : axios.post;

	function handleCreate(values) {
		axiosMethod(CUSTOMER_API_ENDPOINT, values)
			.then((response) => {
				notificationSuccess({ description: "Successfully created customer" });
				setTimeout(() => navigate("/customers"), 1000);
			})
			.catch((err) => {
				notificationError({ description: "Cannot create customer" });
			});
	}

	function handleCancel() {
		navigate("/customers");
	}

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: validationCustomerSchema,
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
					placeholder="Sustomer name"
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
					placeholder="Customer description"
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
					placeholder="Customer address"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.address}
					error={formik.touched.address && formik.errors.address}
				/>
				<InputGlobal
					label="Email"
					key="email"
					id="email"
					name="email"
					placeholder="Customer email"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.email}
					error={formik.touched.email && formik.errors.email}
				/>
				<InputGlobal
					label="Phone number"
					key="phone"
					id="phone"
					name="phone"
					placeholder="Customer phone"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.phone}
					error={formik.touched.phone && formik.errors.phone}
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
