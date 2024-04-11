import { Button } from "antd";
import { useFormik } from "formik";
import InputGlobal from "../ui/input";
import { notificationSuccess } from "../../utils/notification";
import axios from "axios";
import { WAREHOUSE_BASE_URL } from "../../apis/config";

export default function FormCreate() {
	function handleCreate(values) {
		axios
			.post(WAREHOUSE_BASE_URL, values)
			.then((response) => {
				console.log(response);
				notificationSuccess({ description: "Successfully created warehouse" });
			})
			.catch((err) => console.log(err));
	}

	const formik = useFormik({
		initialValues: {
			name: "",
			description: "",
			address: "",
			supervisor: "",
			longitude: 0,
			latitude: 0,
			status: "active",
		},
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
					value={formik.values.name}
				/>
				<InputGlobal
					label="Description"
					key="description"
					id="description"
					name="description"
					placeholder="Warehouse description"
					onChange={formik.handleChange}
					value={formik.values.description}
				/>
				<InputGlobal
					label="Address"
					key="address"
					id="address"
					name="address"
					placeholder="Warehouse address"
					onChange={formik.handleChange}
					value={formik.values.address}
				/>

				<div className="action-wrapper">
					<Button type="dash" htmlType="cancel">
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
