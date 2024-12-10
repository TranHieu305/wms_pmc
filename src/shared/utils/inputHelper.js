function convertEnumToSelectOption(emum) {
	if (!emum) {
		return;
	}
	return Object.entries(emum).map(([key, value]) => ({
		value: value,
		label: value,
	}));
}

function convertArrToSelectOption(arr) {
	if (!Array.isArray(arr)) {
		return null;
	}
	const optionsArr = arr.map((item) => {
		return {
			value: item.id,
			label: item.name,
		};
	});

	return optionsArr;
}

const inputHelper = {
	convertEnumToSelectOption,
	convertArrToSelectOption,
};

export default inputHelper;
