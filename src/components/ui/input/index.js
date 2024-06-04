import { Input, Select } from "antd";
import "./index.css";
import TextArea from "antd/es/input/TextArea";

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

export function SelectGlobal({ label, id, value, onChange, options, ...props }) {
	return (
		<div className="input-global-wrapper">
			<label htmlFor={id}>
				<strong>{label}</strong>
			</label>
			<Select key={id} value={value} onChange={(value) => onChange(value)} {...props}>
				{options.map((option) => (
					<Select.Option key={option.value} value={option.value}>
						{option.label}
					</Select.Option>
				))}
			</Select>
			{props.error && (
				<small>
					<strong className="red">{props.error}</strong>
				</small>
			)}
		</div>
	);
}

export function TextAreaGlobal({ label, rows = 4, id, ...props }) {
	return (
		<div className="input-global-wrapper">
			<label htmlFor={id}>
				<strong>{label}</strong>
			</label>
			<TextArea rows={rows} {...props} />
			{props.error && (
				<small>
					<strong className="red">{props.error}</strong>
				</small>
			)}
		</div>
	);
}
