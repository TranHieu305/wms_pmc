import { Button } from "antd";
import { useFormik } from "formik";
import InputGlobal from "../ui/input";
import { useFetch } from "../../custom_hooks";
import { WAREHOUSE_BASE_URL } from "../../apis/config";
import { REQUEST_POST_CONFIG } from "../../configs";

export default function FormCreate({ warehouse }) {
	const {
		data,
		loading: isSending,
		error,
		sendRequest,
	} = useFetch(WAREHOUSE_BASE_URL, REQUEST_POST_CONFIG);

	function handleCreate(values) {
		sendRequest(JSON.stringify(values));
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
