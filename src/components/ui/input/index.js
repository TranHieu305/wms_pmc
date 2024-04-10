import { Input } from "antd";
import "./index.css";

function InputGlobal({ label, id, ...props }) {
	return (
		<div className="input-global-wrapper">
			<label htmlFor={id}>{label}</label>
			<Input {...props} />
		</div>
	);
}

export default InputGlobal;
