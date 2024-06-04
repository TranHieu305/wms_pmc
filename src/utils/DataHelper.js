export default class DataHelper {
	static getOptionsFromArr(arr, defaultLabel = "---") {
		if (!Array.isArray(arr)) {
			return null;
		}
		const optionsArr = arr.map((item) => {
			return {
				value: item.id,
				label: item.name,
			};
		});
		optionsArr.push({
			value: 0,
			label: defaultLabel,
		});
		return optionsArr;
	}
	static findObjNameFromArrById(arr, id) {
		if (!Array.isArray(arr)) {
			return null;
		}
		const obj = arr.find((item) => item.id === id);
		return obj ? obj.name : null;
	}

	static findObjFromArrById(arr, id) {
		if (!Array.isArray(arr)) {
			return null;
		}
		const obj = arr.find((item) => item.id === id);
		return obj ? obj : null;
	}
	static getCurrentPrice(productArr, productId) {
		const price = productArr.find((item) => item.productId === productId);
		return price;
	}
}
