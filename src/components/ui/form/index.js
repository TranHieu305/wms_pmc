function FormGlobal({ children, ...props }) {
	return (
		<div className="form-wrapper">
			<form className="form" {...props}>
				{children}
			</form>
		</div>
	);
}

function FormAction({ children }) {
	return <div className="action-wrapper">{children}</div>;
}

export { FormAction, FormGlobal };
