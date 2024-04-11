import { Input } from "antd";
import "./index.css";

function InputGlobal({ label, id, ...props }) {
	return (
		<div className="input-global-wrapper">
			<label htmlFor={id}>
				<strong>{label}</strong>
			</label>
			<Input {...props} />
			{props.error && (
				<small>
					<strong className="red">{props.error}</strong>
				</small>
			)}
		</div>
	);
}

export default InputGlobal;
