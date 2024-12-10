function convertEnumToSelectOption(emum) {
	if (!emum) {
		return;
	}
	return Object.entries(emum).map(([key, value]) => ({
		value: value,
		label: value,
	}));
}

const inputHelper = {
	convertEnumToSelectOption,
};

export default inputHelper;
