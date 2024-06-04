function findObjNameFromArrById(arr, id) {
	if (!Array.isArray(arr)) {
		return null;
	}
	const obj = arr.find((item) => item.id === id);
	return obj ? obj.name : null;
}

export { findObjNameFromArrById };
