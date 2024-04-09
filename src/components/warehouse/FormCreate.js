import { Input, Typography } from "antd";
import { useFormik } from "formik";

export default function FormCreate({ warehouse }) {
	function handleCreate(values) {
		console.log(values);
	}

	const formik = useFormik({
		initialValues: {
			email: "",
			longitude: 0,
		},
		onSubmit: handleCreate,
	});
	return (
		<form onSubmit={formik.handleSubmit}>
			<label htmlFor="email">Email Address</label>
			<Input
				id="email"
				name="email"
				onChange={formik.handleChange}
				value={formik.values.email}
			/>
			<label htmlFor="email">Email Address</label>
			<Input
				id="description"
				name="description"
				onChange={formik.handleChange}
				value={formik.values.description}
			/>
			<label htmlFor="email">Email Address</label>
			<Input
				id="address"
				name="address"
				onChange={formik.handleChange}
				value={formik.values.address}
			/>

			<button type="submit">Submit</button>
		</form>
	);
}
